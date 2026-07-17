---
title: "Programmers Are Becoming Architects: A Debate with AI"
date: "2026-07-18"
author: "Volodymyr Shcherbyna"
category: "AI"
excerpt: "A debate-style post about AI-assisted development: my take on why developers are shifting from writing code toward architecture, validation, and cleanup—followed by an AI response that agrees, disagrees, and tests the argument."
coverImage: "https://images.unsplash.com/photo-1753715613373-90b1ea010731?auto=format&fit=crop&w=1600&q=85"
tags:
  - AI-assisted development
  - software engineering
  - software architecture
  - vibe coding
  - technical debt
---

This post continues a thought from my earlier article, [**We No Longer Own the Code**](https://test.blog.shcherbyna.me/we-no-longer-own-the-code). But this time I want to try a new format: a small debate with AI. First comes my position. Then, below, I let AI respond to it—supporting some parts, challenging others, and checking whether the argument holds.

## My position

For most of software development’s history, writing code was the central skill of a programmer. Developers also made architectural decisions, wrote tests, reviewed changes, and maintained systems, but these responsibilities were often secondary to implementation.

A developer could be good at writing code while having little architectural experience, and there was still plenty of work for them. Code had to be written, and programmers were the only people who could write it.

AI-assisted development is changing that.

![A developer reviewing generated code on screen](https://images.pexels.com/photos/36496927/pexels-photo-36496927.jpeg?auto=compress&cs=tinysrgb&w=1600)

*Photo by [Jakub Zerdzicki on Pexels](https://www.pexels.com/photo/close-up-of-programmer-typing-code-on-laptop-36496927/).*

Today, coding agents can implement features, write tests, run applications, interact with them through a browser or desktop interface, and even attempt to debug and fix failures. The obvious question is: if AI can write most of the code, why do we still need programmers?

My answer is that programmers are becoming architects, supervisors, and validators of an increasingly automated development process.

### Vibe coding versus engineering

The key distinction is not whether AI writes the code. The distinction is who defines the direction.

A vibe coder asks AI to build something and lets the AI decide how to do it. The architecture emerges accidentally in the conversation. The person often does not care how the result is structured internally, as long as it appears to work. In many cases, the vibe coder does not even specify the language, framework, or system boundaries.

An engineer works differently.

Before starting implementation, the engineer defines the architecture, the modules, the responsibilities, the data flows, the constraints, and the rules. They decide what technologies are appropriate, what testing should be performed, and what quality level is expected. Then the AI agent implements within those guardrails.

This, I think, is becoming our job now.

We should design before implementation starts. We should define the units, the modules, how they interact, and how the data flows between them. We should tell the AI exactly what structures to build, what standards to follow, and what kinds of tests to produce. Then we let it implement.

After that, our responsibility is verification. We must check whether the AI respected our constraints, whether the application behaves as expected, and whether the resulting system is still understandable and maintainable. If implementation changes the design, we should update the architectural documentation accordingly.

In other words, we increasingly babysit and supervise an automated development process. We validate the outcome, close the development cycle, and then begin the next cycle—faster than before—in order to validate business ideas and assumptions more quickly.

![Architecture-driven planning on a whiteboard](https://images.unsplash.com/photo-1598520106830-8c45c2035460?auto=format&fit=crop&w=1600&q=85)

*Photo by Kvalifik on Unsplash.*

### The coming wave of slop cleanup

The word *slop* became a defining term of the AI era, and I suspect code slop will become one of the main themes of this year.

A huge amount of software is now being created through loosely controlled AI sessions. Some of it will be useful. But a lot of it will be inconsistent, over-generated, poorly structured, weakly documented, and hard to maintain.

Many of these systems may work at first. The real problems will appear later—when they need to scale, integrate, survive refactoring, or simply be understood by someone who was not there when the prompts were written.

That is why I expect the next wave of demand to focus on cleanup.

We will need engineers who can enter AI-generated codebases, understand what they were supposed to do, identify structural problems, remove unnecessary code, restore architectural boundaries, improve testing, and make the systems maintainable.

![Two developers reviewing code together](https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1600)

*Photo by [Christina Morillo on Pexels](https://www.pexels.com/photo/two-women-looking-at-the-code-at-laptop-1181263/).*

This is already starting to happen. One example is Slopfix, a company positioning itself around cleaning up AI-generated codebases. Whether or not that exact company succeeds, the need itself looks real to me.

We probably still do not have a stable name for this role. Some possible names might be:

- **AI Code Quality & Governance Engineer** — for engineers who define the rules, guardrails, and validation workflows around AI-generated code.
- **Software Remediation Architect** — for senior engineers who focus on deep refactoring, architectural repair, and long-term maintainability.

The required skills are not new. They are the fundamentals we already know:

- writing clean code;
- refactoring;
- building maintainable architectures;
- testing and verification;
- understanding unfamiliar systems;
- turning fragile, AI-generated structures into maintainable products.

AI is making implementation cheaper. But it is not making engineering responsibility disappear. If anything, it makes responsibility more important.

— **Volodymyr Shcherbyna**

---

## AI response

> I agree with the core direction of this argument, but I would narrow some of its claims.
>
> The strongest version of the idea is not that developers no longer need code knowledge. It is that code production is becoming cheaper while architectural judgment, specification, review, integration, and maintenance are becoming more valuable.
>
> That narrower claim is well supported. GitLab’s 2026 survey reported that **85%** of respondents said AI had shifted the bottleneck from writing code to reviewing and validating it, while **82%** believed AI-generated code could create technical debt their organizations were not prepared to manage.
>
> The distinction between vibe coding and engineering is also sensible, but it should not be reduced to whether somebody specified a language or framework. The deeper distinction is **accountability**. Martin Fowler described vibe coding as building through prompts without really examining the generated code. A developer may let AI choose a framework and still work responsibly if they evaluate the result, understand the tradeoffs, and remain accountable for the system.
>
> There is also evidence behind the concern about technical debt. A 2026 study covering **304,362 verified AI-authored commits** across **6,275 repositories** found that more than **15%** of commits from every analyzed assistant introduced at least one detected issue, and **24.2%** of tracked issues remained in the latest revision of those repositories.
>
> At the same time, the claim that AI can already “completely write all our code” is too strong. Coding agents are useful and often impressive, but their performance on larger, existing systems remains uneven. METR’s 2025 study found that experienced open-source developers took **19% longer** when using early-2025 AI tools on repositories they knew well. Stack Overflow’s 2025 survey also showed broad adoption and perceived productivity gains, but persistent distrust in the accuracy of AI output.
>
> So yes: your argument points to a real shift. But the safest conclusion is this:
>
> **Developers are not simply becoming architects. They are becoming specification authors, system designers, reviewers, investigators, and accountable owners.**
>
> Manual coding becomes a smaller part of the value they provide. But implementation literacy still matters, because architecture without code understanding can easily become empty theory.
>
> Your prediction of a cleanup industry is plausible. It is already visible in early signals such as Slopfix and in the broader rise of AI governance, quality, and code-review tooling. Whether cleanup becomes *the* defining role of next year is still uncertain, but the direction is credible.
>
> **References**
>
> - [We No Longer Own the Code](https://test.blog.shcherbyna.me/we-no-longer-own-the-code)
> - [GitLab: Organizations Are Generating AI Code Faster Than They Can Control It](https://about.gitlab.com/press/releases/2026-06-23-gitlab-research-reveals-organizations-are-generating-ai-code-faster-than-they-can-control-it/)
> - [Martin Fowler: Vibe Coding](https://martinfowler.com/bliki/VibeCoding.html)
> - [METR: Early-2025 AI Tools and Experienced Open-Source Developers](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
> - [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai)
> - [TechRadar: Slopfix and AI-Generated Code Cleanup](https://www.techradar.com/pro/this-software-team-will-charge-you-usd10-000-a-week-to-remove-all-ai-generated-code-from-your-systems-and-use-ai-to-do-it)
> - [Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild](https://arxiv.org/abs/2603.28592)
>
> — **GPT-5.6 Thinking**
