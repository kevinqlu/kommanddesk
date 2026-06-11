# KommandDesk — Portfolio Case Study

## Problem
My problem is that I will have a ton of things to do: due dates, emails, projects, homework. But all the apps and notes are all over my devices. I want to have a singlular platform that connects all my items.

## Solution
messy tasks/notes -> ai extractions -> review task list -> approve and put on dashboard

## Tech Stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Java, Spring Boot, REST API
- Database: PostgreSQL with JPA/Hibernate
- AI: Anthropic Claude API
- DevOps: Git, GitHub, feature branch workflow

## Key Engineering Decisions
We built mock data before using real ai because we wanted to check if the workflow was working properly. If we had used AI from the start, we wouldn't know the tasks getting sent back would be properly parsed or just what the AI model read, also its a waste of tokens to make calls without knowing if the core workflow was properly aligned. 

Spring Boot over Node.js: 
Java's static typing catches errors at compile time 
rather than at runtime, which matters as the codebase grows. Spring Boot 
provides a structured enterprise-ready architecture with dependency injection 
and JPA for database management. Walmart and most large enterprises use Java 
Spring Boot for backend systems, so building with it gives me directly 
applicable experience.

## Architecture
Frontend (Next.js) — handles the user interface, note input, task review, 
and dashboard. Communicates with the backend via REST API calls.

Backend (Spring Boot) — receives HTTP requests from the frontend, applies 
business logic, validates data, and talks to the database. Keeps the 
Anthropic API key server-side only.

Database (PostgreSQL) — stores only approved tasks permanently. 
Hibernate/JPA maps Java objects to database tables automatically.

## What I Learned
1. I learned the structure of building a full-stack app
2. I learned more about the importance of documentation
3. I learned to think more about why I was adding features/or adding in code. This project is gonna be pointless if I can't understand or explain it. 

## Future Improvements
1. Third-party app integrations
2. light and dark mode
3. Either the Blackhole implementation or the pokemon-style dashboard

## Links
- GitHub: https://github.com/kevinqlu/kommanddesk
- Live Demo: https://kommanddesk.vercel.app/demo
- Live App: https://kommanddesk.vercel.app