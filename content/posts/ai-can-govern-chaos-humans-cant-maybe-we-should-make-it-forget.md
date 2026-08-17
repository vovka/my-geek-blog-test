---
title: "AI Can Govern Chaos. Humans Can't. Maybe We Should Make It Forget."
date: "2026-08-17"
author: "Volodymyr Shcherbyna"
category: "AI"
excerpt: "What if enormous context windows are one reason AI-generated software is so hard for humans to understand?"
coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85"
tags:
  - LLMs
  - context windows
  - software architecture
  - AI-assisted development
  - working memory
  - cognitive science
---

*What if enormous context windows are one reason AI-generated software is so hard for humans to understand?*

> **TL;DR:** Humans have tiny working memory, so we learned to deal with complexity by chunking, naming, hiding details, building hierarchies, and creating abstractions. LLMs have a very different limitation. They can keep enormous amounts of information in context, so perhaps they do not feel the same pressure to organize a system for comprehension. My hypothesis is that if we deliberately restrict an LLM's effective context and make it aware of that restriction, it may start producing more structured, hierarchical, human-comprehensible solutions. Existing research on working memory, information bottlenecks, context degradation, and context-aware agents does not prove this, but several results point in this direction. I want to test it.

Humanity has been waiting for artificial intelligence for a very long time.

We imagined machines that could think faster than us, remember more than us, and solve problems that would overwhelm a human brain. During the last few years, a good part of that dream became real. We now have machines with cognitive capabilities that would have looked ridiculous not long ago.

And I think we have also run into a problem that we did not talk about enough.

Humans can barely comprehend what these machines produce.

I see this regularly in software development. I give an AI coding agent a task. Ten minutes later it may come back with an implementation, tests, documentation, configuration changes, error handling, comments, and a pile of other things I did not explicitly ask for.

Then I spend hours understanding what happened.

The funny part is that the solution often works. The AI did the job faster than I could have done it myself. But I am still sitting there trying to build a mental model of the result.

The bottleneck moved. Producing the software became cheap. Understanding the software did not.

I have been wondering whether this has something to do with a basic difference between the way humans and LLMs deal with information.

## Humans cannot keep much in their heads

There is an old and famous idea in psychology called the <a href="https://doi.org/10.1037/h0043158" target="_blank" rel="noopener noreferrer">"magical number seven, plus or minus two"</a>. George Miller discussed it in 1956 while studying limits in human information processing. Later research questioned whether seven is really the right number. <a href="https://doi.org/10.1017/S0140525X01003922" target="_blank" rel="noopener noreferrer">Nelson Cowan, for example, argued that under stricter conditions the central capacity is closer to four chunks</a>.

For what I am thinking about here, the exact number does not matter very much. Seven, four, maybe something else depending on the task. The important part is that it is small.

I cannot hold 500 classes, 2,000 methods, database schemas, queues, APIs, and thousands of dependencies in my active attention at the same time.

So I don't.

I reduce the problem.

Instead of thinking about thousands of details, I think about a system like this:

```text
System
├── Authentication
├── Billing
├── Catalog
├── Orders
└── Notifications
```

If I am working on Billing, most of the other system can disappear from my head for a while:

```text
Billing
├── Plans
├── Subscriptions
├── Invoices
└── Payments
```

Then I can open Payments and repeat the same trick.

This is such a normal part of software engineering that I rarely thought about why we do it. We call it architecture, decomposition, modularity, separation of concerns, encapsulation. But all of these ideas have something in common: they let us hide most of the system while thinking about a small part of it.

Herbert Simon wrote about hierarchical and nearly decomposable systems in <a href="https://www.jstor.org/stable/985254" target="_blank" rel="noopener noreferrer">The Architecture of Complexity</a> back in 1962. <a href="https://doi.org/10.1145/361598.361623" target="_blank" rel="noopener noreferrer">David Parnas later made a similar point specifically about software</a>: good modularization improves flexibility and comprehensibility.

This made me look at software architecture from another angle.

We usually describe architecture as a property of a well-designed system. Maybe part of it is simply an adaptation to the limitations of the human brain.

We build hierarchies because we have to.

We divide until the pieces become small enough to think about.

## An LLM has a very different problem

An LLM context window is not literally the same thing as human working memory. The mechanisms are completely different. Still, both determine how much information is available to a reasoning process at a given moment, so the comparison is useful.

And from a human perspective, LLM context is enormous.

A coding agent can read a large amount of a repository, inspect tests, documentation, logs, specifications, APIs, and previous conversations, then continue working with all of that material available in its context.

This made me suspect something uncomfortable:

Maybe architecture does not mean the same thing to an LLM that it means to me.

If I have to understand a huge codebase, I need structure before I can do much useful work. I need boundaries. I need names. I need to know where one responsibility ends and another starts.

A sufficiently capable LLM can often operate much closer to the raw information.

As long as the relevant world fits inside its effective context, it can search through it, correlate pieces, trace dependencies, and manipulate details directly.

It has less reason to build a map because it can keep looking at the territory.

Or, to put it another way:

Humans cannot govern chaos. An LLM increasingly can.

That may be a problem when the machine produces something that a human must maintain.

## I see this problem in AI-generated software

I have struggled with this for months.

AI-generated solutions can be surprisingly good and surprisingly difficult to understand at the same time. The code works. Tests pass. Edge cases are covered. There may even be documentation everywhere.

Yet when I need to answer a basic question such as "where does this responsibility actually live?", I sometimes have to investigate the solution almost as if it had been written by another team.

There is now some empirical work showing a related effect. A 2026 study called <a href="https://arxiv.org/abs/2605.02741" target="_blank" rel="noopener noreferrer">AI-Generated Smells: An Analysis of Code and Architecture in LLM and Agent-Driven Development</a> examined technical debt in AI-generated software. The authors found that more capable models often generated larger and more coupled implementations, and they argue that architectural complexity management is becoming an important problem for AI-driven software engineering.

That paper does not prove my hypothesis about context windows. There are many other possible causes. Models may simply be optimized for functional success rather than human comprehension. Training data matters. Prompts matter. Agent scaffolding matters. The lack of maintainability feedback matters.

Still, the result matches the practical problem I keep seeing: producing more correct code does not automatically produce software that is easier to understand.

## My workaround has been to give the AI the architecture first

I started dealing with this problem before I had a theory for it.

My current approach is to do architectural planning before implementation. I decide on the important boundaries, responsibilities, modules, and interactions. Then I give that structure to the coding agent and ask it to implement inside it.

Sometimes the agent follows the architecture closely. Sometimes it gets creative. But even partial compliance helps.

The useful thing is not that I know every line of generated code. I don't, and I no longer try to.

The useful thing is that I have a map.

If something is wrong with authentication, I roughly know where authentication should be. If I need to change persistence, I know which part of the architecture owns it. I can move through the hierarchy and eventually reach the generated code I care about.

In that setup, architecture serves a slightly different purpose from the one I learned years ago.

I am not creating architecture because the AI needs it to write the software.

I am creating architecture because I need it to understand the software the AI writes.

That distinction feels increasingly important.

## What if we make the LLM worse on purpose?

This is where my idea gets a little strange.

The whole industry is trying to give models more context. Bigger windows are presented as an obvious improvement.

What if, for some jobs, we deliberately go in the opposite direction?

Take a model that can handle a huge context window and give it only 16K.

Not because that is all the model supports. Because that is all we allow it to use.

There is another detail that I think matters even more: tell the model about the limit.

For example:

```text
Effective context budget: 16,384 tokens
Currently used: 12,941 tokens
Remaining: 3,443 tokens
```

Now the agent has a resource problem.

It cannot simply accumulate information forever. If it wants to keep working, it needs to decide what deserves to stay.

Maybe several details can become one concept.

Maybe ten observations can become a summary.

Maybe part of the system should be hidden behind an interface.

Maybe completed work should be written into an external artifact and removed from active context.

Maybe the problem itself should be split into subproblems.

That starts to sound familiar.

It is roughly what humans do because we have no choice.

My hypothesis is that artificial memory pressure could push an LLM toward the same sequence:

```text
too much information
        ↓
chunking
        ↓
compression
        ↓
abstraction
        ↓
hierarchy
        ↓
architecture
```

I do not know if this is true. That is exactly why I want to test it.

## There are some interesting hints in existing research

I have not found a study that asks my exact question: if we deliberately restrict an LLM's active context, will it produce software that humans find easier to comprehend?

But several areas of research make the idea less crazy than it first sounds.

One is the <a href="https://arxiv.org/abs/2309.06629" target="_blank" rel="noopener noreferrer">relational bottleneck</a>. Work by Taylor Webb and colleagues studies neural systems where information flow is deliberately restricted so that downstream processing focuses on relations rather than carrying every property of every input. The restriction creates an inductive bias toward abstraction and systematic generalization.

The implementation is different from what I am proposing, but I like the underlying principle: what a system is prevented from carrying forward can change the representation it learns to use.

There is an older parallel in research on the evolution of language. <a href="https://doi.org/10.1073/pnas.0707835105" target="_blank" rel="noopener noreferrer">Simon Kirby, Hannah Cornish, and Kenny Smith ran experiments where artificial languages were repeatedly learned and transmitted by human participants</a>. Through this transmission process, initially unstructured languages developed more systematic structure. Their work is part of a larger line of research connecting transmission bottlenecks and compression pressure with the emergence of learnable structure.

Again, this is not about LLM context windows. I am interested in the recurring shape of the mechanism: when arbitrary complexity is expensive to preserve, structure becomes useful.

## LLM research is getting closer to this idea

Recent agent research is much closer to the experiment I have in mind.

<a href="https://aclanthology.org/2025.acl-long.1575/" target="_blank" rel="noopener noreferrer">HiAgent</a> treats working memory hierarchically. Instead of keeping a long flat history of every action and observation, the agent works through subgoals. Completed parts can be summarized while detailed information for the active subgoal remains available. In experiments across five long-horizon tasks, the authors reported a twofold increase in success rate and 3.8 fewer steps on average.

The resulting memory looks a lot like the way I would manually structure a difficult project:

```text
Main goal
├── completed subgoal → summary
├── completed subgoal → summary
├── current subgoal → detailed state
└── future subgoal
```

There is also evidence that simply having more context is not always helpful.

The 2025 paper <a href="https://arxiv.org/abs/2510.05381" target="_blank" rel="noopener noreferrer">Context Length Alone Hurts LLM Performance Despite Perfect Retrieval</a> tested five open and closed models on math, question answering, and coding. Performance degraded by 13.9% to 85% as input length increased, even though the relevant information was still retrievable. The authors also tested variants designed to remove ordinary distraction effects, and the degradation did not disappear.

So "the model supports a huge context window" and "the model reasons equally well across that entire window" are not the same statement.

## The model probably needs to know that it is running out of memory

At first I thought I could test my idea simply by truncating the conversation. The more I think about it, the less interesting that version seems.

If old information silently disappears, the LLM is not adapting to a restriction. It is just losing information.

For my hypothesis, the model needs to experience the budget as a constraint.

This is another place where recent work is useful.

<a href="https://arxiv.org/abs/2604.01664" target="_blank" rel="noopener noreferrer">ContextBudget</a>, published as a 2026 preprint, treats context management as a decision problem with an explicit budget. The agent can assess how much context remains and decide when and how aggressively to compress its history. The learned strategies performed better than comparison methods as context pressure increased.

VISTA takes a related approach without retraining the underlying model. It gives an agent a dashboard describing the state of its own context, including token usage, recency, archive state, and budget. The agent can archive information and recover it later. The authors found that exposing this information improved context management and that the benefit became larger under greater context pressure. They also tested whether models could estimate their own context state without the dashboard and found large errors.

LOCA-bench contains an observation that is particularly relevant to my idea. When GPT-5.2-Medium was explicitly made aware of its remaining context budget, its behavior changed. It became more urgency-driven and tended to interact with the environment sooner.

That is important to me because it shows that context awareness is not just metadata for an external orchestrator. The model can react to it.

What nobody has shown, as far as I can find, is whether this pressure also changes the structure of what the model builds.

That is the experiment I want to run.

## The experiment can be cheap

I don't need to train a model.

I can put a small proxy between an ordinary coding agent and a commercial LLM provider. Most agent tools let you configure a provider endpoint, so from the agent's point of view my proxy is simply the LLM API.

The proxy forwards requests normally, but it controls the effective context.

Then I can run the same model, the same coding agent, and the same software task under different conditions:

### A. Full context

Large context available.

No information about context usage.

### B. Restricted context

16K effective context.

Old information is removed as necessary.

### C. Restricted and aware

16K effective context.

The model continuously sees something like:

```text
12,400 / 16,384 tokens used
```

### D. Restricted, aware, with external memory

16K active context.

The model can summarize or archive information into files and retrieve it when necessary.

Condition B tells me what happens when information is simply removed.

Condition C is more interesting. It tells me whether awareness of scarcity changes behavior.

Condition D is probably the closest analogue to how humans actually work. Our active memory is tiny, but we use notebooks, diagrams, documents, source code, naming conventions, and other external storage all the time.

Then I give all four agents the same tasks and compare what they build.

Of course I can measure whether the software works. Tests passed, task completion, regressions, and so on.

But those are not the measurements I care about most.

I want to know whether the restricted agent creates clearer boundaries. Whether modules become more focused. Whether responsibilities are easier to locate. Whether it creates useful intermediate abstractions instead of keeping thousands of details alive. Whether it starts summarizing completed work. Whether it naturally produces architectural artifacts. Whether coupling changes. Whether the hierarchy changes.

And finally I want to measure the thing that started this whole train of thought:

How difficult is the result for another human to understand?

Give an engineer a generated project and ask a few practical questions:

«Where would you change this behavior?»

«Which component owns this responsibility?»

«What depends on this subsystem?»

«If this interface changes, what else is affected?»

Then measure the time and accuracy.

If an unrestricted agent produces a technically excellent solution that takes three hours to understand, while a restricted agent produces an equally functional solution that takes twenty minutes, I would consider that a very interesting result.

## Maybe bigger context is not always the right optimization

I am not arguing that huge context windows are bad. They are obviously useful, and there are many tasks where I want as much context as I can get.

I am questioning a simpler assumption: that an AI agent should always be allowed to use the maximum cognitive capacity available to it.

Humans did not develop software architecture while having unlimited working memory. We developed it while being severely constrained.

We learned to name, compress, group, hide, divide, and build hierarchies because otherwise large systems become impossible for us to reason about.

LLMs grew up under a different constraint.

Maybe one reason their output feels alien is not that they are bad at architecture, but that they don't need architecture in quite the same way we do.

And if humans are still expected to supervise, maintain, modify, and ultimately take responsibility for the systems AI produces, then optimizing only for machine comprehension may be the wrong target.

Perhaps one way to make AI think more legibly is surprisingly simple.

Give it less room.

Tell it that the room is limited.

Then see what kind of order it creates.

Stay tuned, and if you want to see the result of my experiments, leave a comment below.
