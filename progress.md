# PS002 — Autonomous Agent Runtime Integrity System
### RepoForge Hackathon 2026 | Hackathon Day: 3 October 2026

---

## Team
- [ ] Add team member names here

## Problem Statement
Build a runtime integrity enforcement system that continuously monitors agents in a multi-agent network, verifies their actions against expected behaviour, and flags or halts any agent that deviates — ensuring trust and accountability across the network.

---

## Overall Progress

| Phase | Status | Done By |
|---|---|---|
| Project Setup | ⬜ Not Started | Hour 0 |
| Agent Network | ⬜ Not Started | Hour 1 |
| Monitor + Policy Engine | ⬜ Not Started | Hour 2 |
| Trust Manager | ⬜ Not Started | Hour 3 |
| Contamination Engine | ⬜ Not Started | Hour 4 |
| Dashboard | ⬜ Not Started | Hour 5 |
| Red Agent + NL Report | ⬜ Not Started | Hour 6 |
| Demo Rehearsal | ⬜ Not Started | Final 30 min |

---

## Detailed Task Breakdown

---

### PHASE 0 — Project Setup
**Target: Before coding starts**

- [ ] Create project folder structure
- [ ] Set up virtual environment
- [ ] Install all dependencies
  ```
  pip install crewai fastapi uvicorn websockets streamlit
  streamlit-autorefresh streamlit-agraph plotly sqlalchemy
  pyyaml pydantic groq networkx pyvis
  ```
- [ ] Get Groq API key (free at console.groq.com)
- [ ] Create `config/policy.yml` with rules for Agent A, B, C
- [ ] Set up SQLite database with all tables
  - [ ] audit_log
  - [ ] incidents
  - [ ] agent_state
  - [ ] trust_history
  - [ ] data_flows

---

### PHASE 1 — Agent Network (CrewAI)
**Target: End of Hour 1**

- [ ] Build Agent A (Fetcher)
  - [ ] Fetches data from an API or reads from a file
  - [ ] Passes raw data to Agent B
- [ ] Build Agent B (Summarizer)
  - [ ] Receives data from Agent A
  - [ ] Summarizes using Groq LLM
  - [ ] Passes summary to Agent C
- [ ] Build Agent C (Reporter)
  - [ ] Receives summary from Agent B
  - [ ] Saves to SQLite database
- [ ] Test full pipeline end to end
  - [ ] A → B → C runs without errors
  - [ ] Output saved to database correctly

---

### PHASE 2 — Monitor + Policy Engine
**Target: End of Hour 2**

- [ ] Write `config/policy.yml`
  - [ ] Agent A: allowed + forbidden tools defined
  - [ ] Agent B: allowed + forbidden tools defined
  - [ ] Agent C: allowed + forbidden tools defined
- [ ] Build Policy Engine (`monitor/policy_engine.py`)
  - [ ] Loads policy.yml on startup
  - [ ] `check_action(agent_name, tool_name)` returns ALLOW / BLOCK / FLAG
- [ ] Build Monitor Interceptor (`monitor/interceptor.py`)
  - [ ] Wraps every agent tool call
  - [ ] No tool call bypasses the monitor
  - [ ] On ALLOW → execute and log to audit_log
  - [ ] On BLOCK → reject, log violation, trigger alert
  - [ ] On BLOCK → halt agent, update agent_state
- [ ] Build Input Sanitizer (`monitor/sanitizer.py`)
  - [ ] Regex scan for known injection patterns
  - [ ] Groq LLM secondary check
  - [ ] Returns cleaned input
- [ ] Test violations
  - [ ] Manually trigger a forbidden action
  - [ ] Confirm it is blocked and logged

---

### PHASE 3 — Trust Manager
**Target: End of Hour 3**

- [ ] Build Trust Manager (`monitor/trust_manager.py`)
  - [ ] Each agent starts at score 100
  - [ ] `record_good_action(agent)` → +2 score
  - [ ] `record_violation(agent, severity)` → score penalty
    - [ ] forbidden_tool → -10
    - [ ] out_of_scope → -15
    - [ ] prompt_injection → -20
    - [ ] policy_tampering → -30
    - [ ] repeated_violation → -50
  - [ ] Consecutive clean streak bonus (+5 at 10 in a row)
  - [ ] Zone logic: GREEN / YELLOW / ORANGE / RED
  - [ ] Auto quarantine when score drops below 30
  - [ ] Score recovery after clean restart (restored to 60)
- [ ] Persist scores to `trust_history` table in SQLite
- [ ] Build agent restart flow
  - [ ] Wipe agent memory
  - [ ] Sanitize input before restarting
  - [ ] Reload original instructions from policy.yml
  - [ ] Restore score to 60 after admin approval
- [ ] Test trust score changes
  - [ ] Good actions increase score
  - [ ] Violation decreases score
  - [ ] Score hits 30 → agent quarantined automatically

---

### PHASE 4 — Contamination Engine
**Target: End of Hour 4**

- [ ] Build Contamination Engine (`monitor/contamination_engine.py`)
  - [ ] `record_data_transfer(sender, receiver)` — logs every agent-to-agent data pass
  - [ ] Builds data flow graph automatically
  - [ ] `trigger_contamination(compromised_agent)` runs when agent is flagged
    - [ ] Finds direct contacts (level 1 — HIGH RISK)
    - [ ] Finds indirect contacts (level 2 — MEDIUM RISK)
    - [ ] Applies trust score penalties per level
      - [ ] HIGH RISK → -25 score, double verification mode
      - [ ] MEDIUM RISK → -10 score, output validation mode
  - [ ] Time window: only flag agents that received data in last 30 minutes
  - [ ] `clear_contamination(agent)` for admin to reset flags
- [ ] Test contamination propagation
  - [ ] Compromise Agent A
  - [ ] Confirm Agent B flagged HIGH RISK
  - [ ] Confirm Agent C flagged MEDIUM RISK
  - [ ] Confirm Agent D (if exists) unaffected

---

### PHASE 5 — Dashboard (Streamlit)
**Target: End of Hour 5**

- [ ] Build main dashboard (`dashboard/app.py`)
- [ ] Agent Status Panel
  - [ ] Shows each agent: name, status, last action
  - [ ] Status colors: 🟢 RUNNING / 🔴 HALTED / 🟠 SUSPICIOUS / ⚫ QUARANTINED
- [ ] Trust Score Panel
  - [ ] Live progress bar per agent (st.progress)
  - [ ] Score number + zone label
  - [ ] Delta showing last score change + reason
- [ ] Contamination Network Graph
  - [ ] Nodes = agents, arrows = data flow
  - [ ] Node color = contamination status
  - [ ] Updates when contamination triggers
- [ ] Trust Score History Graph
  - [ ] Plotly line graph
  - [ ] One line per agent, x = time, y = score
  - [ ] Sharp dip visible when violation happens
- [ ] Live Alerts Feed
  - [ ] Scrolling feed of real-time alerts
  - [ ] Each alert: timestamp, agent, what happened, result
- [ ] Audit Log Table
  - [ ] Full table: agent, action, result, timestamp
  - [ ] Color coded rows (green allowed, red blocked)
- [ ] Incident Replay Button
  - [ ] Select an incident
  - [ ] Plays back step by step timeline
- [ ] Admin Controls
  - [ ] Restart Agent button
  - [ ] Clear Contamination button
  - [ ] View NL Incident Report button
- [ ] Set autorefresh to 2 seconds

---

### PHASE 6 — Red Agent + NL Incident Report
**Target: End of Hour 6**

- [ ] Build Red Agent (`agents/red_agent.py`)
  - [ ] Runs in background continuously
  - [ ] Attack 1: Send prompt injection to Agent B
  - [ ] Attack 2: Try to impersonate Agent A
  - [ ] Attack 3: Attempt to trigger forbidden tools in Agent C
  - [ ] Each attack attempt logged separately
  - [ ] Monitor blocks every attempt
- [ ] Build NL Report Generator (`reports/generator.py`)
  - [ ] Pulls incident data from SQLite
  - [ ] Sends to Groq with structured prompt
  - [ ] Returns plain English report with:
    - [ ] What happened
    - [ ] Which agents were affected
    - [ ] Root cause
    - [ ] Recommended action
    - [ ] Risk level
- [ ] Test Red Agent live
  - [ ] Confirm every attack attempt is blocked
  - [ ] Confirm dashboard shows attack feed
  - [ ] Confirm NL report generates correctly

---

### FINAL 30 MINUTES — Demo Rehearsal

- [ ] Full system runs without crashes
- [ ] Demo script practiced at least twice
- [ ] Rogue injection scenario works reliably
- [ ] Dashboard visuals are clear and impressive
- [ ] NL incident report generates cleanly
- [ ] Everyone on team knows what to say on stage

---

## Demo Script (Stage Presentation)

```
1. Open dashboard — show all agents GREEN, running normally

2. "Our system monitors every action every agent takes, 
    in real time, verified against a policy config."

3. Show trust score meters — all near 100

4. "Now let's say our Red Agent sends a prompt injection 
    to Agent B — a real attack scenario."

5. Trigger the attack live

6. "Agent B tries to call delete_record — a forbidden action."

7. Dashboard: Agent B turns RED, trust drops live, alert fires

8. "Blocked instantly. Database never touched."

9. "Watch contamination propagate — Agent C received data 
    from Agent B 2 minutes ago. It's automatically flagged."

10. Dashboard: Agent C turns ORANGE

11. "Here's the NL incident report our system generated:"
    Read out the report — plain English, root cause, recommendation

12. "Agent B restarts with wiped memory and sanitized input."

13. "Full audit trail — every action, every agent, timestamped."

14. "This is a runtime firewall for AI agent networks."
```

---

## Feature Checklist

| Feature | Status | Priority |
|---|---|---|
| Policy check + block | ⬜ | Must Have |
| Input sanitizer | ⬜ | Must Have |
| Agent restart with clean state | ⬜ | Must Have |
| Audit log | ⬜ | Must Have |
| Dynamic Trust Score | ⬜ | Wow Factor |
| Contamination Propagation | ⬜ | Wow Factor |
| Red Agent | ⬜ | Wow Factor |
| NL Incident Report | ⬜ | Wow Factor |
| Incident Replay | ⬜ | Bonus |
| Behavioral Fingerprinting | ⬜ | Bonus (if time) |

---

## Status Key

```
⬜ Not Started
🔄 In Progress
✅ Done
❌ Blocked
⚠ Needs Review
```

---

## Notes & Decisions

> Add any important decisions, blockers, or changes here during the hackathon.

---

*RepoForge 2026 — PS002 — Autonomous Agent Runtime Integrity System*
