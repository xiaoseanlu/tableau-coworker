# Faros AI — internal context notes (not shipped)

These notes inform design choices throughout the prototype. Not visible
in the final deliverable, but kept for reference and to defend choices
during the on-site walkthrough.

## What Faros does
- Engineering intelligence platform; founded 2019 by ex-Salesforce Einstein team (Vitaly Gordon).
- Stitches together GitHub, GitLab, Jira, Jenkins, CircleCI, PagerDuty, etc. into a unified data model.
- Templated dashboards: DORA metrics, productivity, AI Copilot impact, software quality,
  team health & onboarding, initiative tracking, investment strategy, software cap.
- Embeds Metabase; uses Sankey charts, sankey-style flow viz.
- AI brand = "Lighthouse AI": root-cause analysis, recommendations.
- Latest platform release: "Asimov" (AI workforce era).
- Has a Copilot Chat extension that pulls eng data into developer flow.
- Just raised Series A ($20M, 2023, Lobby Capital), currently raising Series B.
- Customers: Box, Coursera, Autodesk, Vimeo, SmartBear, Firstbase.
- Recent stats from their 2026 AI Engineering Report:
  - Epics completed per developer ↑ 66.2%
  - Median time in PR review ↑ 441%
  - DORA metrics under significant pressure

## What the reviewer (Gilad) cares about
Gilad Turbahn is Head of Product, Design, AND Engineering — engineering-literate.
- Will dig at the *why* behind every choice.
- Cares about both ship-fast AND craft (per the JD).
- Will look for systemic thinking across product surfaces.
- Will reward technical credibility (the prototype being real code matters).

## Design DNA signals to send through the prototype
1. **Data storytelling, not data dumps.** Every chart earns its space; narrative
   accompanies numbers; AI explains anomalies; recommendations are first-class.
2. **Multi-persona, single source of truth.** Same data, different views per
   exec / manager / IC. Mirrors Faros's pane-of-glass worldview.
3. **AI as analyst, not chatbot.** Lighthouse-style voice: analytical, evidence-first,
   transparent about uncertainty. No emoji, no "Here's a great list!"
4. **Personalization is agentic, not configurable.** Subtle theme woven across
   the prototype: the system shapes itself to the user, not via admin config.
5. **Cross-tool worldview.** Workday lives across Slack, Teams, mobile, calendar.
   Mirrors Faros's "we sit on top of every tool you use" worldview.

## What NOT to do
- Don't build a chatbot-first interface. Faros's audience is wary of bots.
- Don't put data viz under chat. Charts are the primary surface; chat is contextual help.
- Don't show admin/config screens as the main thing. Those are the *cause* of the problem.
- Don't make the agent voice cute. Make it credible.
