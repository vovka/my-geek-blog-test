---
title: "Stop Prompting AI. Build the Factory."
date: "2026-10-24"
author: "Volodymyr Shcherbyna"
category: "AI"
excerpt: "Why I think manually guiding coding agents through the SDLC is already outdated—and why human engineers should focus on defining and evolving the architectural boundaries of autonomous software factories."
coverImage: "/images/software-engineering-in-2027/cover.jpg"
tags:
  - AI-assisted development
  - software factories
  - software architecture
  - coding agents
  - SDLC automation
comments: true
---

> **TL;DR:** Stop manually prompting AI agents through every step of software development. Build a software factory with clear architectural boundaries, quality gates, guardrails, and automated verification. Let it handle routine work autonomously, and reserve human engineers for evolving the architecture when a task exceeds the factory's boundaries.

AI-assisted software engineering is developing so fast that an approach that worked a month ago might already be obsolete.

I often see engineers describing their sophisticated AI workflows: dozens of skills, carefully designed prompts, and elaborate processes for guiding agents through every step of the software development life cycle. They manually invoke one skill for planning, another for implementation, another for review, and so on.

I think this approach is already outdated.

We should move beyond prompt engineering. Moreover, I think we should move beyond loop engineering as well. Engineers shouldn't spend their time figuring out how to tell AI what to do at every step.

My experiments with software factories suggest that today's AI is already capable of handling most routine software engineering tasks autonomously, without a human reviewing every result.

Of course, I'm not talking about giving an AI agent unrestricted access to a codebase and hoping for the best. I'm talking about a properly configured software factory, with quality gates, guardrails, and automated verification throughout the entire SDLC.

Once such a factory is configured, evaluated, and proven reliable enough, we should let it work. Periodically re-evaluate the system, improve its safeguards, but stop supervising every individual task.

And most importantly, stop reading AI-generated code.

## Architecture is the boundary

In my previous article, I argued that software engineers are becoming architects. Software factories take this idea a step further.

I think architecture should be the main constraint on an autonomous software factory.

AI is far more flexible and creative in how it structures software than humans are. It can generate millions of possible approaches and operate across them simultaneously within its context. It can even create and modify a codebase that it can continue to understand and operate, while the same codebase may quickly become incomprehensible to the humans responsible for maintaining it.

That is why architecture must be the primary boundary for AI.

Architecture is not only a diagram of components and dependencies. It must define the limits within which the factory is allowed to operate. We need to specify what components the application consists of, how those components may interact, and what structural constraints the code must satisfy: maximum file size, class size, and function size; limits on the number of files in a directory; limits on directory nesting; and any other rules necessary to keep the system understandable.

The purpose of these constraints is not to limit AI's creativity for its own sake. It is to preserve human comprehensibility of the code AI produces. The factory may be able to work with a highly complex structure, but humans must still be able to understand, review, evolve, and take responsibility for the system.

There is another architectural requirement that matters most when the system fails: the code must remain understandable under pressure. When the system goes down at 2 a.m., an engineer should be able to step in and, within a reasonable amount of time, determine where the failure occurred without having previously read the code. The architecture must make the system's boundaries, dependencies, and failure paths clear enough that an engineer can quickly locate the breakage and begin restoring service.

We define the architecture, establish its boundaries, and specify what AI is allowed to change. Within those boundaries, the factory should operate completely autonomously.

If a new feature fits the existing architecture, there is nothing for a human engineer to do. Let the factory implement it.

But what happens when a feature requires changing the architecture itself?

This is where the human engineer comes in.

Ideally, the software factory should recognize when a task cannot be completed within the existing architectural boundaries and automatically escalate it to a human.

The engineer then reviews the request and makes a decision.

If the feature genuinely requires architectural changes, we revise the architecture, redraw the diagrams, rewire the components, and send the task back to the factory.

If the feature actually fits the existing architecture, we explain how it should be implemented within those constraints and return it to the factory.

That's the human role I envision: maintaining and evolving the architecture rather than supervising implementation.

## Stop poking AI with a stick

Of course, this is still the direction I'm exploring through my software factory experiments. Getting the boundaries and guardrails right is essential. We need to be extremely confident that the factory cannot silently violate them.

But I think this is where software engineering is heading in the very near future.

If you're still manually prompting agents, invoking dozens of skills, and moving tasks between SDLC stages yourself, you're probably automating at the wrong level.

We should be looking at the whole system from a bird's-eye view.

Stop poking AI with a stick every time you need a new feature. Build the factory, define its boundaries, and let it do the work.
