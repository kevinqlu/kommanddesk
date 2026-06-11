# Roadmap
Note: Phases 1-2 and Phase 5 map to the current 17 milestone plan.
Phases 3, 4, and 6 are post-launch features without assigned milestone numbers yet.

## MVP (Current Sprint - Milestones 1-10)
- Note input and mock extraction
- Task review and approval workflow
- PostgreSQL persistence
- Dashboard

## Phase 2 - AI (Milestone 11)
- Real LLM extraction via Claude or OpenAI API
- Zod validation on AI output
- Server-side API key management

## Phase 3 - Integrations
- Notion sync
- Obsidian note import
- Google Calendar integration
- TickTick task sync
- Settings page to manage connected integrations

## Phase 4 - File Ingestion
- PDF upload and text extraction
- Plain text file upload
- Client-side text extraction before AI call
- Chunking for large documents
- Token cost optimization

## Phase 5 - Demo and Portfolio
- Public demo mode
- Portfolio case study page
- Deployment

## Phase 6 - Visual Polish
- Blackhole animation on note submission
- Notes visually scatter on screen when dropped
- Blackhole grows and blacks out screen on completion
- Transition into dashboard
- Framer Motion or Canvas API for animations

## Future Vision
- Settings page for integration management
- Each integration has its own data stream into KommandDesk
- Integrate with Obsidian for note sync
- Claude Code integration for AI-assisted task management
- NotebookLM for study plan extraction
- Session timer tied to approved tasks
- Auto-log time spent per task

## AI-Assisted Scheduling (Phase 2)
After task editing, send tasks back to AI with a time constraint 
(1 day, 1 week). AI fits tasks into a realistic schedule, 
resolves priority conflicts, and returns an optimized plan 
for final user approval.

## 01 > 1
after editing, the time estimate in single digits make sure the box isn't saying 01

## Future App Concept — Gamified Task System
Tasks become collectible cards that users open in packs to complete work.
Completed tasks go to a trophy/codex room.
Task difficulty and priority determine XP and card rarity.
Failed tasks require recovery tasks to restore HP.
Leaderboard shows most tasks completed.
Progression system mirrors Pokemon gym structure —
complete themed task sets to unlock new challenges.
Buff cards unlock real-world rewards like music or breaks.

## Navigation Polish
After approving tasks on /input, show a "Go to Dashboard" 
button or banner so users have a clear next step instead of 
staying on the input page indefinitely.