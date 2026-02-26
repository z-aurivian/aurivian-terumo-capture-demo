// CIRSE 2025 Congress Reference Content for Auri RAG

export const CONGRESS_OVERVIEW = `
CIRSE 2025 — Cardiovascular and Interventional Radiological Society of Europe Annual Congress
September 6-10, 2025 | Barcelona, Spain
Organized by: CIRSE (Cardiovascular and Interventional Radiological Society of Europe)

The 2025 CIRSE Annual Congress is the premier scientific meeting in Europe for interventional radiology and interventional oncology. Over 6,000 attendees including interventional radiologists, interventional oncologists, hepatologists, surgeons, medical oncologists, and industry representatives.

Key congress themes:
1. TACE-immunotherapy combination as the new standard in intermediate HCC
2. DEB-TACE technical advances — bead chemistry, drug loading, CBCT guidance
3. Degradable microspheres (BioPearl) and re-treatment paradigm
4. Patient selection refinement — BCLC-B sub-staging and ALBI scoring
5. Emerging TACE indications beyond HCC (mCRC, ICC, neuroendocrine)
6. Health economics and DEB adoption across European markets
7. Safety profiling of TACE-IO combinations
`;

export const TRIAL_SUMMARIES = {
  'EMERALD-1': `
**EMERALD-1 (Embolization combined with durvalumab/bevacizumab in HCC)**
- Sponsor: AstraZeneca / Global investigator consortium
- Phase: 3, randomized, open-label
- N = 616 patients with intermediate-stage (BCLC-B) HCC
- Arms: DEB-TACE + durvalumab + bevacizumab vs DEB-TACE + durvalumab vs DEB-TACE alone
- DEB protocol: LifePearl microspheres loaded with doxorubicin
- Primary endpoint: Progression-free survival (PFS)
- Results (updated OS at CIRSE 2025):
  - Triple combo: median OS 22.7 months vs 15.8 months for TACE alone
  - HR 0.72 (95% CI: 0.56-0.92, p=0.008)
  - PFS: 15.0 months vs 8.2 months (HR 0.77)
  - ORR (mRECIST): 72% vs 54%
- Significance: FIRST Phase 3 to validate TACE-IO combination in intermediate HCC
- Key for Terumo: LifePearl is the DEB platform used in the trial protocol
`,
  'LEAP-012': `
**LEAP-012 (Lenvatinib + Pembrolizumab + TACE in HCC)**
- Sponsor: Merck/Eisai
- Phase: 3, randomized, double-blind
- N = ~950 patients with intermediate-stage HCC
- Arms: TACE + lenvatinib + pembrolizumab vs TACE + placebo
- Primary endpoints: PFS and OS
- Status: Enrolling, interim analysis showing encouraging PFS signals
- Preliminary signals (CIRSE 2025 corridor intel): PFS potentially 14+ months vs 8 months
- Significance: If positive, second Phase 3 validating TACE-IO paradigm
- DEB-TACE is the preferred TACE modality in trial protocol
`,
  'COLLISION': `
**COLLISION (Thermal Ablation vs Surgical Resection for Colorectal Liver Metastases)**
- Sponsor: Amsterdam UMC / European consortium
- Phase: 3, randomized, non-inferiority
- N = 618 patients with resectable CRLM (max 10 lesions, max 3cm)
- Arms: Thermal ablation vs surgical resection
- Primary endpoint: Overall survival
- Significance: Could establish ablation as equivalent to surgery, expanding IO role
- Relevance: Validates interventional oncology approaches in liver tumors
`,
  'BIOPEARL-ONE': `
**BIOPEARL-ONE (Safety and Efficacy of BioPearl Degradable Microspheres in HCC)**
- Sponsor: Terumo Europe
- Phase: 2, single-arm, prospective
- N = 48 patients with intermediate HCC (BCLC-B)
- BioPearl: Degradable PEG microspheres loaded with doxorubicin
- 12-month results (CIRSE 2025):
  - Complete bead degradation: 85% by 6 months on MRI
  - Successful re-treatment with LifePearl in all cases
  - No vascular occlusion issues during re-treatment
  - Grade 3+ AE rate: 4.2% (comparable to permanent DEBs)
  - ORR (mRECIST): 68%
- Significance: FIRST degradable DEB with clinical data, enables re-treatment optimization
- Unique Terumo differentiation — no competitor has a degradable microsphere
`,
  'TACE-3': `
**TACE-3 (DEB-TACE vs Bland Embolization in HCC)**
- Sponsor: UK NIHR / Multi-center
- Phase: 3, randomized
- N = 500 patients with intermediate HCC
- Arms: DEB-TACE (DC Bead) vs bland embolization
- Primary endpoint: Overall survival
- Status: Fully enrolled, results pending
- Significance: If DEB-TACE shows survival advantage, strengthens DEB value proposition
`,
  'CheckMate 74W': `
**CheckMate 74W (Nivolumab + Ipilimumab + TACE in HCC)**
- Sponsor: Bristol-Myers Squibb
- Phase: 3, randomized
- N = ~750 patients with intermediate HCC
- Arms: Nivolumab + ipilimumab + TACE vs TACE alone
- Primary endpoints: PFS and OS
- Status: Enrolling, results expected 2026
- Significance: If positive, would be third Phase 3 confirming TACE-IO paradigm
- DEB-TACE is an allowed TACE modality in the protocol
`,
  'TALENTACE': `
**TALENTACE (Talimogene Laherparepvec + TACE in HCC)**
- Sponsor: Amgen / Academic consortium
- Phase: 2, single-arm
- N = 36 patients with intermediate HCC
- Oncolytic virus (T-VEC) injected intrahepatically + DEB-TACE
- Status: Enrolling
- Rationale: Oncolytic viruses may enhance anti-tumor immunity when combined with TACE
`,
  'ORIENT-32': `
**ORIENT-32 (Sintilimab + Bevacizumab Biosimilar in Unresectable HCC)**
- Sponsor: Innovent Biologics / Eli Lilly
- Phase: 3, randomized
- N = 571 patients with unresectable HCC
- Arms: Sintilimab + IBI305 (bevacizumab biosimilar) vs sorafenib
- Results: Significant OS improvement (HR 0.57, p<0.0001)
- Relevance: Establishes IO + anti-VEGF backbone in advanced HCC
- Implication for TACE: TACE-IO combinations may benefit from adding anti-VEGF
`,
};

export const COMPETITIVE_LANDSCAPE = `
## DEB-TACE Competitive Landscape — CIRSE 2025

### Terumo Portfolio
**LifePearl Microspheres (PEG-based DEB)**
- Market: Leading DEB platform in combination trial protocols
- Chemistry: Polyethylene glycol (PEG) hydrogel
- Key advantages:
  - Suspension time: 357 seconds (vs 204s for DC Bead)
  - Sizing consistency: CV < 5%
  - Drug loading: 37.5mg/mL doxorubicin, 60-min complete loading
  - Sustained drug release over 14 days (vs 7 days burst for DC Bead)
  - Superior compressibility — passes through smaller microcatheters
- Clinical evidence: ORR 72% in head-to-head comparison (CIRSE 2025)
- Combination trial platform: Used in EMERALD-1 and LEAP-012 protocols
- Safety: Lowest Grade 3+ hepatotoxicity (3.8% in comparative study)
- Positioning: "The evidence-based DEB for the combination era"

**BioPearl Microspheres (Degradable PEG DEB)**
- First-in-class degradable drug-eluting microsphere
- Controlled hydrolysis over 3-6 months
- BIOPEARL-ONE data: 85% complete degradation by 6 months
- Enables re-treatment without vascular occlusion
- Safety: Grade 3+ AE rate 4.2% (comparable to permanent DEBs)
- Positioning: "The future of TACE re-treatment"
- NO competitor has a degradable DEB platform

### Key Competitors
**Boston Scientific — DC Bead / DC Bead LUMI**
- DC Bead: PVA-based microspheres, established market presence
- Drug loading: 37.5mg/mL max but optimal at 25mg/mL
- Loading time: 120 minutes (2x LifePearl)
- Drug release: Burst pattern over 7 days
- DC Bead LUMI: Radiopaque variant with intrinsic visibility
  - 92% rated visibility as "excellent" during delivery
  - BUT: ORR comparable to standard DC Bead (63% vs 65%)
  - Drug loading capacity slightly lower
  - Premium pricing questioned by KOLs
  - CBCT achieves similar procedural confidence with any bead
- Weakness: No combination trial positioning, radiopaque premium hard to justify

**Merit Medical — HepaSphere**
- Expandable co-polymer microspheres
- Unique expansion mechanism (2x-4x size increase in vivo)
- Drug loading: Variable due to expansion, less predictable elution
- Clinical evidence: ORR 58% in head-to-head (lowest of 3 platforms)
- Safety: Highest Grade 3+ hepatotoxicity (8.7%)
- Expansion may cause more parenchymal damage
- Weakness: Weakest safety profile, unpredictable behavior

### Terumo Competitive Advantages
1. **Combination trial leadership** — LifePearl is the DEB in EMERALD-1 and LEAP-012
2. **BioPearl uniqueness** — Only degradable DEB, enables re-treatment paradigm
3. **Superior drug elution** — Sustained 14-day release vs burst pattern
4. **Best safety profile** — Lowest hepatotoxicity in comparative data
5. **Procedural simplicity** — "Load and go" in 60 min (vs 120 min for DC Bead)
6. **Consistent sizing** — CV <5%, predictable behavior

### Terumo Competitive Challenges
1. DC Bead has longer market presence and established relationships
2. DC Bead LUMI visibility narrative is appealing (though clinical benefit unproven)
3. HepaSphere pricing advantage in some cost-sensitive markets
4. Need more prospective randomized DEB comparison data
`;

export const CLINICAL_PRACTICE = `
## Clinical Practice Patterns in DEB-TACE — CIRSE 2025

### DEB-TACE vs cTACE Shift
- DEB-TACE represents 67% of all TACE procedures in high-volume European centers (2024)
- Up from 45% in 2020 — accelerating shift
- Germany, France, Italy account for 58% of European DEB-TACE volume
- Economic driver: fewer re-treatments with DEB-TACE (2.8 vs 4.2 sessions with cTACE)

### Technique Optimization
- **Superselective catheterization**: Improves ORR from 55% to 74%
- **Bead size**: 100-300\u00B5m preferred for better tumor penetration
- **CBCT guidance**: Improves CR from 42% to 61%, reduces non-target embolization from 8.3% to 2.1%
- **Standardized loading protocol**: 37.5mg/mL doxorubicin, 1-hour loading (LifePearl)

### Response Assessment
- mRECIST preferred over RECIST 1.1 for TACE evaluation
- mRECIST adoption >80% in Italian IO centers
- Assessment timing shifting to 4-6 weeks post-TACE (from 3 months)
- Earlier assessment enables faster re-treatment decisions

### Patient Selection Trends
- BCLC-B sub-staging gaining consensus (B1/B2/B3 framework)
- ALBI score replacing Child-Pugh for liver function assessment
- TACE-first strategy with early evaluation endorsed (1-2 cycles then assess)
- NASH-HCC population growing (25% of new HCC in Western Europe) — needs adapted protocols

### Center Volume Matters
- Centers performing >50 TACE/year: 35% better outcomes
- Call for centralization of complex IO procedures
- Supports Terumo's training and proctoring programs
`;

export const KOL_LANDSCAPE = `
## Key CIRSE 2025 KOL Landscape

### Tier 1 — Global Thought Leaders (Present at CIRSE 2025)
- **Prof. Thomas J. Vogl** — Goethe University Hospital Frankfurt, TACE technique pioneer, LifePearl PES data presenter
- **Prof. Riccardo Lencioni** — University of Pisa/Miami, EMERALD-1 investigator, LifePearl "go-to DEB" endorsement
- **Prof. Josep M. Llovet** — Hospital Cl\u00EDnic Barcelona/Mount Sinai, TACE-IO rationale champion
- **Prof. Philippe Pereira** — SLK-Kliniken Heilbronn, center-of-excellence advocate
- **Prof. Irene Bargellini** — Candiolo Cancer Institute Turin, DEB-TACE technique standardization
- **Prof. Alejandro Forner** — Hospital Cl\u00EDnic Barcelona, BCLC-B sub-staging proposer
- **Prof. Bruno Sangro** — Clinica Universidad de Navarra, TACE-IO safety monitoring protocols
- **Prof. Masatoshi Kudo** — Kindai University Osaka, aggressive TACE in Child-Pugh B advocate

### Tier 2 — European Regional Leaders
- **Dr. Filipe Veloso Gomes** — Hospital Curry Cabral Lisbon, BIOPEARL-ONE presenter
- **Prof. Roman Kloeckner** — Johannes Gutenberg University Mainz, standardized loading protocols
- **Prof. Geert Maleux** — University Hospitals Leuven, CBCT guidance champion, DC Bead LUMI skeptic
- **Prof. Thomas Helmberger** — Klinikum Munich, degradable bead paradigm advocate
- **Dr. Jean-Luc Raoul** — Institut de Canc\u00E9rologie de l'Ouest, ICC "next frontier" champion
- **Prof. Luigi Bolondi** — University of Bologna, conservative liver function thresholds

### KOL Sentiment Summary (CIRSE 2025)
- Strong enthusiasm for TACE-IO combinations (EMERALD-1 validated)
- LifePearl preferred DEB in combination trial protocols
- Growing excitement about BioPearl degradable microsphere concept
- Skepticism about DC Bead LUMI value proposition (CBCT provides adequate visualization)
- Consensus on BCLC-B sub-staging need
- ALBI score gaining favor over Child-Pugh for TACE patient selection
- DEB-TACE over cTACE in combination settings — unanimous
`;
