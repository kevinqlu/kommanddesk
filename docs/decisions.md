# Design Decisions

## Monorepo structure
Chose a monorepo over separate frontend and backend repositories.
Keeps shared docs, Git history, and project context in one place.
Easier for recruiters to clone and review the full project.

## Mock extraction before real AI
Built mock task extraction before integrating a real LLM API.
Reason: understand the full application flow before hiding it
behind an API call. The mock function has the same signature
as the real one so swapping it later requires minimal changes.

## In-memory storage before PostgreSQL
Built the Task API with in-memory ArrayList storage before
connecting a real database. Reason: validate the API layer
works correctly before adding database complexity.

## TypeScript types in a shared types/ folder
Defined SuggestedTask and related types in apps/web/types/task.ts
instead of inline in components. Reason: reusability across
multiple pages and components.

## Parent owns state in React
Task approval and rejection state is managed in the parent
input page, not inside individual TaskCard components.
Reason: the parent owns the data, children report events.
This follows standard React data flow patterns.

## DTO and Entity separation
Using TaskDTO for API input/output and Task entity for
internal representation. Reason: decouples what the frontend
sends from what gets stored. Allows each to evolve independently.

## Database generates task IDs
Frontend generates temporary IDs for UI tracking only.
The database generates the authoritative ID on insert.
Reason: guarantees uniqueness across all records.

## PostgreSQL over MongoDB
Chose a relational database because tasks have a defined
structure and schema. MongoDB's flexibility is unnecessary
here and relational integrity is preferred.

## React diagnostic tooling deferred
Skipped React Doctor during early development.
Codebase is too small to need diagnostics.
Will revisit when the frontend grows larger.

## Obsidian integration deferred
Considered using Obsidian for Claude Code context management.
Deferred until codebase is large enough to need it.
Potential future integration for note sync workflow.

## Project name
Currently named KommandDesk. Considered renaming to Khaos.
Deferred to avoid disrupting active development.
Will revisit at Milestone 10 if still desired.

## AI features scoped to Milestone 11+
Core product flow built without AI first.
Real LLM extraction added only after MVP is working end to end.
Keeps the architecture clean and testable without API dependencies.

## Future Architecture - File Ingestion at Scale
Upload - files go to S3 instead of the backend server 
so the server stays stateless and does not get overloaded 
handling large file uploads
Text extraction - microservice or serverless function, because the app should still function while processing
Chunking and Token Management - breaking up the text into important/necessary text that AI can use. This reduces cost and filters before it hits the validation
validation - no bad input/handled before AI touches it