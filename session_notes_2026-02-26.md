# Terumo Europe Congress Capture Demo — Session Notes
**Date:** 2026-02-26

## What Was Built
Congress capture & collaboration app for Terumo Europe, modeled around **CIRSE 2025** (Barcelona, Sept 6-10, 2025) in the **Interventional Oncology / TACE / LifePearl microspheres** domain.

## Architecture
- Copied from Novo Nordisk capture app (`aurivian-novo-nordisk-demo`)
- React + CRA + Tailwind, Aurivian dark theme, Michroma font
- 5 tabs: Activity Feed / Capture / Leaderboard / Social / Auri
- useReducer + Context state management
- LLM fallback chain: Claude → OpenAI → keyword fallback

## Domain Content
- **Congress:** CIRSE 2025, Barcelona, 5 days, 4 tracks
- **8 KITs:** Competitive Landscape, Combination Therapy, Technical Innovation, Clinical Outcomes, Patient Selection, Safety & Tolerability, Health Economics, Emerging Indications
- **5 Products:** LifePearl, BioPearl (Terumo) / DC Bead, DC Bead LUMI (Boston Scientific) / HepaSphere (Merit Medical)
- **8 Trials:** EMERALD-1, LEAP-012, COLLISION, BIOPEARL-ONE, TACE-3, CheckMate 74W, TALENTACE, ORIENT-32
- **6 Team Members:** Dr. Maria Santos (current user), Dr. Thomas Richter, Dr. Sophie Laurent, Dr. Alessandro Conti, Dr. Elena Petrova, Dr. Henrik Andersen
- **28 Mock Insights** across Days 2-3, all 8 KITs
- **16 Social Posts** with #CIRSE2025 hashtags
- **2 Daily Summaries** (Day 2 & Day 3)
- **KOLs referenced:** Vogl, Lencioni, Llovet, Bargellini, Forner, Pereira, Maleux, Veloso Gomes, Kloeckner, Sangro, Kudo, Helmberger, Raoul, Bolondi

## Key Narrative Themes
1. **EMERALD-1 OS update:** DEB-TACE + durvalumab + bev = 22.7mo OS (HR 0.72) — validates TACE-IO combos
2. **BioPearl degradation:** 85% complete by 6 months, enables re-treatment — unique differentiation
3. **Head-to-head DEB:** LifePearl ORR 72% vs DC Bead 65% vs HepaSphere 58%
4. **DC Bead LUMI skepticism:** Radiopacity questioned when CBCT available
5. **BCLC-B sub-staging:** B1/B2/B3 framework gaining consensus
6. **CBCT as standard-of-care:** CR 42%→61%, non-target embolization 8.3%→2.1%

## Repos & Deployment
- GitHub: `z-aurivian/aurivian-terumo-capture-demo`
- Vercel: needs import from dashboard
- Existing Terumo demo updated with "Congress Capture ↗" nav link
- Demo landing page updated with Terumo Congress Capture entry
