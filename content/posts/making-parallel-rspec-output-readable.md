---
title: "Making Parallel RSpec Output Readable — With Matrix Rain"
date: "2026-10-03"
author: "Volodymyr Shcherbyna"
category: "Software Development"
excerpt: "parallel_matrix_formatter turns the output of parallel RSpec processes into one live Matrix-rain display and one consolidated failure report. How it works: UNIX sockets, crash handling and a race condition."
coverImage: "/images/parallel-matrix-formatter/cover.jpg"
tags:
  - Ruby
  - RSpec
  - testing
  - open source
  - parallel_tests
comments: true
---

I created a small Ruby gem called [`parallel_matrix_formatter`](https://github.com/vovka/parallel_matrix_formatter). It is an RSpec formatter for test suites running through [`parallel_split_test`](https://github.com/grosser/parallel_split_test) or [`parallel_tests`](https://github.com/grosser/parallel_tests).

The visible part is intentionally ridiculous: instead of the usual test output, it renders the run as Matrix-style digital rain.

![Four parallel RSpec processes running as Matrix rain](https://raw.githubusercontent.com/vovka/parallel_matrix_formatter/main/docs/images/demo.gif)

But there is a practical problem behind it.

When an RSpec suite is split between several processes, each process has its own formatter and produces its own output. Once they all write into the same terminal, the result can become difficult to read. Progress, failures, warnings, application output, and summaries from different workers can all appear together.

I wanted the whole parallel run to behave more like one test run.

So `parallel_matrix_formatter` collects events from all RSpec processes, renders one shared progress display, and prints one consolidated report when everything finishes.

## One formatter, several Ruby processes

The tricky part is that there isn't actually one formatter.

Every worker started by `parallel_split_test` or `parallel_tests` runs in a separate process, and every process creates its own instance of the RSpec formatter. They don't share Ruby objects or memory.

I ended up with a small client/server architecture.

Process 1 becomes the orchestrator and opens a UNIX socket in the temporary directory. The remaining test processes connect to it.

There is no election. Both runners number their processes through `TEST_ENV_NUMBER`, so the process that gets number 1 hosts the server. The socket is named after something every process of the run can compute on its own: the parent pid under `parallel_split_test`, which forks all workers from one runner, and the name of the pid file that `parallel_tests` keeps for each run.

As examples finish, each process sends their results to the orchestrator:

```text
                     UNIX socket
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Process 1        Process 2        Process 3
      RSpec             RSpec             RSpec
        │                │                │
        └───────────────►│◄───────────────┘
                         │
                    Orchestrator
                         │
                         ▼
                    One terminal
```

The orchestrator now has enough information to treat several independent RSpec runs as one logical run.

It knows the progress of every process. It receives example results as they happen. When all workers send their summaries, or disconnect, it can produce the final combined report.

The Matrix display is basically a renderer on top of that mechanism.

## What the Matrix actually represents

The characters aren't just random decoration.

Each progress row contains one column per test process. Inside every column is the percentage completed by that process, padded with random half-width katakana.

As the suite progresses, something like this appears:

```text
17:04:13 ｷｺｼ89%ﾚﾐｴ､ｷｦｻ92%ｸｪｨｹ ｱｲｳ
```

Every completed example adds another character.

A passing example produces a green katakana character. A failure produces a red one. Pending examples produce a spoon.

Yes, a spoon.

There is no spoon.

The update frequency is configurable. For a long-running suite I don't want a new line after every example, so by default progress is printed at most once per minute. It can instead update after a percentage change or after every example.

There is also an option to replace the digits themselves with katakana:

![Matrix formatter using katakana digits](https://raw.githubusercontent.com/vovka/parallel_matrix_formatter/main/docs/images/katakana_digits.png)

Completely unnecessary. I kept it.

## The final report is the useful part

Once the workers finish, the formatter stops raining and prints a normal RSpec-style report.

![Consolidated RSpec report](https://raw.githubusercontent.com/vovka/parallel_matrix_formatter/main/docs/images/full_run.png)

Failures from all processes appear together, including messages, backtraces, and commands for rerunning the failed examples.

The timing also shows both values:

```text
Finished in 12.3 seconds (22.8 seconds across processes)
8 examples, 2 failures, 2 pending
```

The first number is wall-clock time. The second is the sum of the execution time reported by the individual workers.

This distinction becomes quite useful with parallel tests. A suite may consume 20 minutes of CPU time while making you wait only five minutes.

## Keeping other output out of the Matrix

Another problem appears once you try to maintain one controlled terminal display: tests don't necessarily stay quiet.

Application code can print to stdout. Libraries emit warnings. Native extensions can write directly to file descriptors. Child processes can do the same.

Redirecting Ruby's `$stdout` isn't enough for all of these cases.

With output suppression enabled, the formatter reopens the process's STDOUT and STDERR file descriptors to `/dev/null`. Before doing that, it keeps its own copy of the original stdout. The application becomes silent while the formatter can continue drawing to the terminal.

There are some consequences.

RSpec creates formatters only after required files such as `rails_helper` have loaded, so output produced during application boot happens too early to be intercepted. The gem includes a small silence file that can be loaded through `RUBYOPT` when this is needed.

Suppression can also hide useful information when a worker crashes. The first version sent stderr to `/dev/null` too, so a crashing process took its error message with it. Now each process writes its stderr to its own log file in the temporary directory, and the final report lists those logs whenever something went wrong.

## When a worker dies

A crashed process never sends its summary. But the kernel closes its socket, the server sees the connection end, and that becomes a `disconnected` event in the same queue as everything else. The report then shows a warning naming the missing process.

Two cases needed extra care.

A process could connect and die before finishing a single example, for example in a `before(:suite)` hook. The server learned process numbers from the first message, so this connection had no number and process 1 waited forever. Now every process says `hello` as soon as it connects.

A process could also die before it ever connects, because `spec_helper` failed to load. Under `parallel_tests` the pid file reveals it. Under `parallel_split_test`, process 1 stops waiting after a configurable `connect_timeout_seconds`.

## The bug that taught me the most

After adding `parallel_tests` support, one integration spec started failing now and then. The final report silently left out one process. No warning, no hang. Just wrong totals.

A fast process could connect, send all its results, close the socket and exit, and `parallel_tests` would remove it from its pid file. All of that could happen before process 1's server thread had even read the connection. At that moment the orchestrator saw nobody left to wait for, and printed the report. The missing results were still sitting in a kernel buffer.

It reproduced in 15 of 40 runs on Ruby 4.0. The fix was to stop trusting the outside world and ask the server itself: the run is finished only when every accepted connection has been read to the end and no new connection is waiting. After that, 0 failures in 50 runs.

A process leaving is not the same as its messages arriving.

## Configuration

The Matrix theme is the default, but most of its pieces are configurable.

For example, the status characters can be replaced with ordinary emoji, and the progress line can be printed on progress instead of on a timer. Put this into `config/parallel_matrix_formatter.yml`:

```yaml
progress_update:
  interval_seconds: 0
  percent_threshold: 10

example_status:
  symbols:
    passed: "🟢"
    failed: "🔴"
    pending: "🟡"
```

The same four processes now look like this:

![The formatter reconfigured with emoji symbols and a 10% progress threshold](/images/parallel-matrix-formatter/config-emoji.gif)

Passed examples are green circles, failures red, pending yellow. `interval_seconds: 0` turns off the once-a-minute timer, so a new progress line starts whenever any process moves another 10%. With four processes that happens often, which is why many rows hold only a few symbols. The final report is unchanged.

Colors, symbols, column width, update policy, progress-line format, digit substitution, and output suppression can all be changed through YAML. Only the keys you change need to be listed; everything else keeps its default.

The formatter also works with ordinary single-process RSpec:

```bash
bundle exec rspec --format ParallelMatrixFormatter::Formatter
```

For parallel execution:

```bash
bundle exec parallel_split_test \
  --format ParallelMatrixFormatter::Formatter \
  spec

# or
bundle exec parallel_rspec \
  -o "--format ParallelMatrixFormatter::Formatter" \
  spec
```

Installation is the usual:

```ruby
gem "parallel_matrix_formatter", group: :test
```

At the moment it requires Ruby 3.2+, RSpec 3.x, and a system with UNIX sockets, so Linux and macOS are supported. Windows isn't.

## Testing a test formatter

There is a slightly strange problem with testing formatter code.

Suppose the specs are running using the same formatter that the specs are currently testing. A bug in the new formatter can break the output of its own test suite. Now the reporting mechanism and the code under test fail together.

The project avoids that by dogfooding the last released version instead.

`rake` and CI run the specs in parallel using a released `parallel_matrix_formatter` version installed separately under `tmp/`. The version being developed is what the specs exercise, while the previous released version is responsible for reporting the result.

So the project does use its own formatter to test itself, just with one version of distance between the test subject and the reporter.

I like this detail more than I probably should.

## Where it is now

This is still a small gem. Version 0.2.0 works with both `parallel_split_test` and `parallel_tests`.

The architecture ended up being more interesting than I expected from something that started as an RSpec formatter: several Ruby processes, UNIX socket IPC, event aggregation, terminal rendering, file-descriptor manipulation, crash handling, a real race condition, and finally reconstructing several independent RSpec runs into one report.

And there is Matrix rain on top of it.

The source is on [GitHub](https://github.com/vovka/parallel_matrix_formatter), and the gem is available as [`parallel_matrix_formatter`](https://rubygems.org/gems/parallel_matrix_formatter).

Bug reports, strange terminal configurations, ideas, and pull requests are welcome.
