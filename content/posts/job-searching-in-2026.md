---
title: "Job Searching in 2026"
date: "2026-09-22"
author: "Volodymyr Shcherbyna"
category: "AI"
excerpt: "My 2026 job search became an automated funnel: agents find and filter jobs, prepare tailored applications, and leave me with a few human decisions."
coverImage: "https://cdn.pixabay.com/photo/2024/04/19/16/51/ai-generated-8706715_1280.jpg"
tags:
  - AI agents
  - job search
  - automation
  - software engineering
  - JobPilot
comments: true
---

## TL;DR

Job searching in 2026 looks strange.

Candidates use AI agents to find tons of jobs, adapt CVs, write cover letters, and prepare applications. Companies use their own automation and AI-assisted screening to process tons of applications and reduce them to a manageable list.

It increasingly looks like a battle between AI agents. Somewhere between the two funnels are two humans trying to find each other.

![My job-search funnel on the left and the employer's filtering funnel on the right.](/images/job-searching-2026/1f2eb2f7-90bd-4848-95ec-5a57edf49ba4.png)

## The market

I've been searching for a new job for several months. It has been stressful and, at times, depressing.

What shocked me most was the amount of competition. In the software jobs I see, 30–50 applications for a position is normal. Less than 30 is relatively rare. Some positions get several hundred applications.

After months of searching and many rejections, I decided to automate the process almost completely.

What shocks me now is that the automation actually works.

## My job search now

I built **JobPilot**.

Scheduled processes continuously search job boards and the web for new positions. Every job enters a database and passes through a pipeline. Agents extract requirements, technologies, location restrictions, and other facts, compare them with my skills and experience, and filter out obvious mismatches.

The remaining jobs appear in Telegram.

The first mode is `/hinder` — Hiring Tinder. It shows one job at a time with **No**, **Maybe**, and **Yes** buttons. This is my triage.

![The Hinder view: one job card and three decisions.](/images/job-searching-2026/84d7319e-ed5e-44ef-8bb5-cacebbef4292.png)

When I press **Yes**, the job moves to the shortlist. Agents prepare the application package: a cover letter, answers to application questions, and a CV assembled for that specific position. The CV is rendered to PDF and reviewed before it reaches me.

I review everything in Telegram. If something is wrong, I ask the agent to improve it. When I'm satisfied, I press **Apply**. The system submits the application. If it cannot reliably handle a form, it leaves that one for me.

So most of my part has become two decisions: *Is this job interesting?* and *Is this application good enough to send?*

Meanwhile the search keeps running. I can spend that time with my son, cook, or work on another software toy instead of repeatedly refreshing job boards.

![What I do while the job-search pipeline keeps running.](/images/job-searching-2026/f4f337f8-0f91-4371-847c-8a4429063fa5.png)

## My career as a Markdown file

One thing made this much easier for me.

I still have most of the software projects I've worked on during my career on my filesystem, including their Git histories.

Instead of manually reconstructing everything I've done, I asked agents to inspect those projects and extract facts: technologies I used, systems I built, problems I solved, and features I implemented.

I did this once and compressed the useful result into one Markdown file.

Now JobPilot uses that file when constructing a CV or cover letter for a vacancy. It doesn't need to invent experience or rely only on my memory. Most of my professional history is already documented in code and Git.

That's one useful property of software work: a large part of the career already exists as machine-readable evidence.

I started this automation because searching for work had become exhausting.

Now an increasingly automated hiring process is being met by my increasingly automated job search.

I'm still not sure how I feel about that.
