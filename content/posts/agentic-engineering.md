---
title: "Agentic Engineering"
date: 2026-02-22
author: "Massimo"
description: "What changes when your tools can reason, notes from the practice of building with AI agents."
lang: "en"
draft: false
---

The word "agentic" has entered the vocabulary of software development with the speed and imprecision that typically accompany hype cycles. It appears in product announcements, conference talks, and fundraising decks, usually without a clear definition. Everyone agrees that agents are important. Almost nobody agrees on what they are.

This is worth sorting out, because something genuinely new is happening. Not the chatbot revolution, that was the previous wave, and its limitations are already well understood. Not autocomplete for code, either, that turned out to be useful but fundamentally incremental. What is new is a class of systems that can reason about a task, decide what to do next, take actions in the world, evaluate the results, and iterate. Systems that operate in loops rather than responding to single prompts. Systems that use tools rather than merely generating text.

This is what we mean when we say a system is **agentic**. And building these systems well, reliably, safely, at scale, is what I am calling agentic engineering. It is not a marketing term. It is a discipline that is forming in real time, with its own patterns, failure modes, and hard-won lessons. What follows are notes from the practice.

## What makes a system agentic

The distinction matters because it changes everything about how you build, test, and reason about the software.

A conventional language model interaction is a single exchange: a prompt goes in, a completion comes out. The user decides what to ask, interprets the result, and determines the next step. The model is passive. It generates text and nothing else.

An agentic system inverts this. The system itself decides what to do next. It reads a task description, formulates a plan, selects a tool, executes it, observes the outcome, and decides whether to continue, adjust, or stop. The human provides the goal. The system provides the strategy.

Three properties define this behavior. The first is **autonomy**, the system makes decisions about its own next action rather than waiting for explicit instructions at every step. The second is **tool use**, the system can take actions in the real world, whether that means reading files, calling APIs, running code, querying databases, or sending messages. The third is **iteration**, the system evaluates its own results and loops back to try again when something fails or falls short.

The mental model that captures this most cleanly is the **ReAct pattern**: Reason, Act, Observe. The agent reasons about the current state, takes an action, observes the result, and then reasons again. This cycle repeats until the task is complete or the agent determines it cannot proceed. It is a loop, not a pipeline.

The difference from a prompt-response pair is not merely quantitative, it is not just "more steps." It is qualitative. An agentic system maintains state across steps. It adapts its behavior based on intermediate results. It can recover from failures. It can discover information it was not explicitly given. These are properties we associate with human problem-solving, not with software tools, and that is precisely what makes them both powerful and dangerous.

## The engineering part

The word "engineering" is deliberate. Building agentic systems is not prompt engineering, or rather, prompt engineering is a small and often overemphasized part of it. The hard problems are architectural.

Consider **context management**. An agent's behavior is determined less by its instructions than by what it can see. The information you surface to the agent, the files it reads, the documentation it accesses, the history it retains, shapes every decision it makes. Too little context and the agent operates blind, making confident but uninformed choices. Too much context and it drowns, losing focus on what matters amid a sea of irrelevant detail. Designing the context window is an architecture problem. It requires understanding what the agent needs to know at each stage of its task, and engineering the system to provide exactly that, no more, no less.

Then there is **error handling**. In conventional software, errors are deterministic: a function either succeeds or throws a known exception. In agentic systems, failures are probabilistic and often subtle. A tool call might return technically valid but semantically wrong results. The agent might misinterpret an observation and proceed confidently down the wrong path. It might enter an infinite loop, retrying an approach that will never work. Designing for these failure modes requires defensive patterns that most developers have never needed before: output validation, loop detection, escalation protocols, and graceful degradation.

**Orchestration** adds another layer of complexity. Real-world tasks often benefit from multiple agents working together, one that researches, one that implements, one that reviews. Coordinating these agents means solving classic distributed systems problems: shared state, sequencing, conflict resolution, and communication protocols. Except now the "processes" are stochastic, and their outputs are natural language rather than structured data.

Finally, there is the **permission model**, the question of how much autonomy is safe. An agent that can read files is useful. An agent that can write files is powerful. An agent that can execute arbitrary shell commands, push to production, or send messages to external services is a liability if not carefully constrained. The design of permission boundaries, what the agent can do without asking, what requires approval, and what is forbidden entirely, is perhaps the most consequential architectural decision in agentic systems. Get it wrong and you have either a useless system that cannot act or a dangerous one that acts without judgment.

These are software engineering problems. They require the same rigor, the same testing discipline, and the same architectural thinking that any complex system demands. The fact that an AI model sits at the center does not make them less technical. If anything, it makes them more so, because the core component is nondeterministic.

## Patterns that work

After building and observing these systems over the past year, certain patterns have proven themselves consistently.

**Specialized agents outperform general-purpose ones.** The instinct is to build a single agent that can do everything, research, plan, implement, test, review. In practice, this produces mediocre results across the board. A better approach is decomposition: one agent that excels at research and information gathering, another that specializes in implementation, a third that focuses on review and verification. Each agent has a narrower scope, a more focused context, and fewer opportunities to go wrong. Specialization works in human organizations for the same reason it works in agent systems, depth of focus produces better outcomes than breadth of responsibility.

**Plan-then-execute with review checkpoints.** The most reliable pattern for complex tasks is to separate planning from execution. First, the agent produces a plan, a structured description of what it intends to do, in what order, and why. A human reviews the plan. Only after approval does the agent begin execution. This sounds slow, but it prevents the most expensive category of errors: agents that confidently execute a flawed strategy at speed. The cost of a planning phase is minutes. The cost of undoing a misguided implementation is hours or days. Intermediate checkpoints during execution serve the same function: they interrupt the autonomous loop at moments where human judgment matters most.

**Human-in-the-loop for irreversible actions.** Not all actions carry equal risk. Reading a file is safe. Deleting a file is not. The pattern that works is to calibrate autonomy to reversibility: let the agent act freely on operations that can be undone, and require explicit approval for operations that cannot. This is not a limitation of the technology, it is a recognition that judgment about consequences is something humans still do better than machines. The agent proposes; the human disposes. The friction this introduces is not waste. It is the cost of reliability.

**Context as architecture.** This point deserves emphasis because it is consistently underappreciated. The single most effective way to improve an agent's performance is not to write a better prompt. It is to give it better context. A well-structured project file, a clear set of conventions, a curated set of examples, these do more than any clever instruction. The reason is straightforward: agents, like humans, make better decisions when they have better information. The difference is that humans can seek out context on their own. Agents use whatever context they are given. This makes the design of context a first-class engineering concern, not an afterthought.

## What does not work

Honesty about failure modes is more useful than enthusiasm about capabilities.

**Autonomy without guardrails** produces creative catastrophes. An agent with broad permissions and no oversight will eventually do something you did not anticipate and cannot easily reverse. It will delete a file it should not have. It will push to a branch it should not have touched. It will "fix" a problem by introducing a worse one. The failure is not in the model's intelligence but in the system's design. Unrestricted autonomy is not a feature, it is an unhandled edge case.

**Too much context is as harmful as too little.** There is a widespread assumption that more information is always better, that if the agent could just see *everything*, it would make the right choice. In practice, flooding an agent with context degrades performance. It loses focus. It attends to irrelevant details. It contradicts itself because different parts of the context suggest different approaches. The analogy to human cognition is direct: a person given a thousand pages of documentation before a task will perform worse than one given the ten pages that actually matter. Curation is not optional. It is load-bearing.

**"Just let the AI do it" fails for anything requiring judgment.** The fantasy of full automation, hand the agent a vague goal and walk away, collapses the moment the task involves trade-offs, ambiguity, or stakeholder preferences. These are domains where the correct answer depends on values, not just facts, and no amount of training data can substitute for a human decision about what matters most. The agents that work well are the ones embedded in workflows where human judgment is available at the moments it is needed. The ones that fail are the ones that try to replace it entirely.

**The illusion of reliability** is the subtlest and most dangerous failure mode. Agentic systems are articulate. They explain their reasoning. They sound confident. And they are sometimes wrong in ways that are difficult to detect without careful review. An agent that produces a plausible-sounding but incorrect implementation is more dangerous than one that produces an obvious error, because the former might ship. This is why **verification matters more than generation**. The ability to produce code is now cheap. The ability to verify that code is correct, secure, and aligned with intent is still expensive and still essential. Any workflow that emphasizes generation without equally emphasizing verification is building on sand.

## The shift in practice

The daily experience of software development has changed in ways that are difficult to convey to someone who has not lived through them.

The most obvious shift is mechanical: less typing, more reviewing. The developer's hands spend less time on the keyboard producing code and more time reading, evaluating, and directing code that was produced by something else. This sounds like a minor ergonomic change. It is not. It fundamentally alters the cognitive posture of the work. You move from the mindset of a writer, constructing sentences word by word, to the mindset of an editor, evaluating whether each paragraph serves the whole.

The role shifts accordingly. The developer becomes less of a coder and more of an **architect and reviewer**. The valuable skill is no longer the ability to implement a solution from scratch. It is the ability to decompose a problem into pieces that an agent can handle, to evaluate the agent's output against requirements, and to intervene precisely when the agent goes wrong. The skill of *doing* the work matters less than the skill of *specifying* and *verifying* the work.

This has downstream effects on what it means to be good at the job. The ability to decompose work, to break a large task into well-defined, independent subtasks with clear interfaces between them, becomes more important than it has ever been. Not because decomposition is new, but because the executor is no longer a human colleague who can compensate for vague specifications with experience and intuition. The executor is a system that will do exactly what it is told, for better and for worse.

New design skills emerge as well. Designing systems for agents is not the same as designing systems for humans. Agents do not read documentation the way people do. They do not navigate codebases the way people do. They benefit from different kinds of structure, explicit conventions, machine-readable specifications, consistent patterns, and struggle with the kinds of implicit knowledge that experienced developers carry effortlessly. Building for agents means making the implicit explicit, and that turns out to be good engineering practice regardless.

## Where this goes

Agentic engineering is not a buzzword. It is a real discipline in the early stages of formation, with its own principles, its own failure modes, and its own accumulating body of practice.

The systems we build today are crude by the standards of what is coming. The orchestration is primitive. The error handling is ad hoc. The permission models are coarse. But the direction is clear: software development is becoming a collaborative process between humans and autonomous systems, and the quality of that collaboration depends on engineering, on the deliberate design of how these systems perceive, decide, act, and learn.

The practitioners who thrive in this landscape will not be the ones who treat agents as magic. They will be the ones who treat agents as what they are: powerful, unreliable, and stochastic components that require the same disciplined engineering as any other complex system. The difference is that these components can reason. And that changes the nature of the engineering, even if it does not change its necessity.

> The tools can think now. The question is whether we can design systems worthy of that capability.

The answer, as always in engineering, will be determined not by what is possible but by what is built carefully enough to work.
