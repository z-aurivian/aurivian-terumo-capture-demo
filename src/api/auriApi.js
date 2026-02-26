import { getRelevantContext } from './rag';
import { buildSystemPrompt } from './promptBuilder';
import { callClaude } from './claudeApi';
import { callOpenAI } from './openaiApi';

/**
 * Keyword-based fallback response generator.
 * Produces a formatted markdown response using RAG context directly.
 */
function keywordFallback(userMessage, context, insights = []) {
  const lower = userMessage.toLowerCase();
  const sections = [];

  // Greeting / general
  if (/^(hi|hello|hey|good morning|good evening)/i.test(lower)) {
    sections.push(
      `**Hello!** I'm Auri, your AI congress co-pilot for CIRSE 2025 in Barcelona. ` +
      `The team has captured **${insights.length}** insight${insights.length !== 1 ? 's' : ''} so far.\n\n` +
      `I can help you with:\n` +
      `- Summarizing captured insights\n` +
      `- Identifying KIT coverage gaps\n` +
      `- Competitive landscape questions (LifePearl vs DC Bead vs HepaSphere)\n` +
      `- Trial data (EMERALD-1, LEAP-012, BIOPEARL-ONE, etc.)\n` +
      `- Generating daily briefs\n\n` +
      `What would you like to explore?`
    );
    return sections.join('\n\n');
  }

  // Daily brief / summary
  if (/brief|summary|recap|overview|status|progress/i.test(lower)) {
    const allKITs = [
      'Competitive Landscape', 'Combination Therapy', 'Technical Innovation', 'Clinical Outcomes',
      'Patient Selection', 'Safety & Tolerability', 'Health Economics', 'Emerging Indications',
    ];
    const kitsCovered = [...new Set(insights.map((i) => i.kit).filter(Boolean))];
    const uncoveredKITs = allKITs.filter((k) => !kitsCovered.includes(k));

    sections.push(`## CIRSE 2025 Daily Brief\n`);
    sections.push(`**Insights captured:** ${insights.length}`);
    sections.push(`**KITs covered:** ${kitsCovered.length}/${allKITs.length}`);

    if (kitsCovered.length > 0) {
      sections.push(`\n### Coverage by KIT`);
      for (const kit of allKITs) {
        const count = insights.filter((i) => i.kit === kit).length;
        const icon = count > 0 ? '&#9989;' : '&#9744;';
        sections.push(`${icon} **${kit}** — ${count} insight${count !== 1 ? 's' : ''}`);
      }
    }

    if (uncoveredKITs.length > 0) {
      sections.push(`\n### Priority Gaps`);
      sections.push(`The following KITs need coverage: ${uncoveredKITs.map((k) => `**${k}**`).join(', ')}`);
      sections.push(`\n**Recommended action:** Prioritize sessions covering ${uncoveredKITs[0]} and ${uncoveredKITs[1] || uncoveredKITs[0]} for the next capture round.`);
    }
    return sections.join('\n');
  }

  // Competitive / landscape
  if (/compet|dc.?bead|boston.?scientific|hepasphere|merit|lumi|head.to.head|radiopaque|pva/i.test(lower)) {
    sections.push(`## Competitive Landscape — CIRSE 2025\n`);
    sections.push(`Here's a summary based on the congress data:\n`);
    if (context) sections.push(context);
    else {
      sections.push(
        `**Key competitive dynamics:**\n` +
        `- **DC Bead (Boston Scientific):** PVA-based microspheres. ORR 65% in head-to-head (vs LifePearl 72%). Burst drug release over 7 days. Loading time 120 min.\n` +
        `- **DC Bead LUMI:** Radiopaque variant. Excellent visibility but ORR comparable to standard DC Bead (63% vs 65%). KOLs question premium pricing — CBCT provides similar visualization.\n` +
        `- **HepaSphere (Merit Medical):** Expandable microspheres. Lowest ORR (58%) and highest Grade 3+ hepatotoxicity (8.7%). Unpredictable drug elution.\n\n` +
        `**LifePearl differentiators:**\n` +
        `1. Combination trial platform — used in EMERALD-1 and LEAP-012 protocols\n` +
        `2. Sustained drug elution — 14 days vs 7-day burst (DC Bead)\n` +
        `3. Best safety profile — 3.8% Grade 3+ hepatotoxicity (lowest)\n` +
        `4. "Load and go" simplicity — 60 min vs 120 min (DC Bead)\n` +
        `5. BioPearl uniqueness — only degradable DEB on the market`
      );
    }
    return sections.join('\n');
  }

  // EMERALD-1
  if (/emerald|durvalumab|bevacizumab|tace.?io|tace.?immuno|combination.?trial/i.test(lower)) {
    sections.push(`## EMERALD-1 — TACE-IO Combination\n`);
    sections.push(
      `EMERALD-1 is the landmark trial validating TACE-immunotherapy combinations:\n\n` +
      `- **DEB-TACE + durvalumab + bevacizumab** vs DEB-TACE alone\n` +
      `- N = 616 patients with intermediate HCC (BCLC-B)\n` +
      `- **Median OS: 22.7 months** vs 15.8 months (HR 0.72, p=0.008)\n` +
      `- PFS: 15.0 months vs 8.2 months\n` +
      `- ORR (mRECIST): 72% vs 54%\n` +
      `- **First Phase 3** to validate TACE-IO combination\n\n` +
      `**Key for Terumo:** LifePearl is the DEB platform used in the trial protocol. This positions LifePearl as "the evidence-based DEB for the combination era."`
    );
    return sections.join('\n');
  }

  // LifePearl / BioPearl / bead technology
  if (/lifepearl|biopearl|degradable|peg|microsphere|bead.?tech|drug.?load|elution|re.?treatment/i.test(lower)) {
    sections.push(`## LifePearl & BioPearl — Terumo DEB Platform\n`);
    sections.push(
      `**LifePearl (PEG Microspheres):**\n` +
      `- Suspension time: 357 seconds (vs 204s DC Bead)\n` +
      `- Sizing consistency: CV < 5%\n` +
      `- Drug loading: 37.5mg/mL doxorubicin, 60-min complete loading\n` +
      `- Sustained release over 14 days\n` +
      `- ORR: 72% (head-to-head comparison at CIRSE 2025)\n` +
      `- Used in EMERALD-1 and LEAP-012 trial protocols\n\n` +
      `**BioPearl (Degradable PEG Microspheres):**\n` +
      `- First-in-class degradable DEB — no competitor equivalent\n` +
      `- Complete degradation in 85% of patients by 6 months (BIOPEARL-ONE)\n` +
      `- Re-treatment with fresh LifePearl successful with no vascular occlusion\n` +
      `- Grade 3+ AE: 4.2% (comparable to permanent DEBs)\n` +
      `- Positioning: "The future of TACE re-treatment"`
    );
    return sections.join('\n');
  }

  // Patient selection / BCLC
  if (/patient.?select|bclc|child.?pugh|albi|staging|eligib|liver.?function/i.test(lower)) {
    sections.push(`## Patient Selection — CIRSE 2025\n`);
    sections.push(
      `Key developments in TACE patient selection:\n\n` +
      `- **BCLC-B sub-staging** gaining consensus: B1 (well-defined) → DEB-TACE, B2 (diffuse) → TACE-IO combos, B3 (extensive) → systemic\n` +
      `- **ALBI score** replacing Child-Pugh: ALBI 1-2 = proceed with TACE, ALBI 3 = systemic preferred\n` +
      `- **72% support** treating selected Child-Pugh B7 patients with superselective technique\n` +
      `- **TACE-first strategy**: 1-2 DEB-TACE cycles, assess at 3 months, then decide\n` +
      `- **NASH-HCC** growing (25% of new HCC) — needs conservative loading doses\n` +
      `- **mRECIST** adoption >80% in Italian centers for TACE response assessment`
    );
    return sections.join('\n');
  }

  // KOLs
  if (/kol|thought leader|investigator|speaker|vogl|lencioni|llovet|bargellini|maleux|pereira|forner|veloso|kloeckner|sangro|kudo/i.test(lower)) {
    sections.push(`## KOL Landscape — CIRSE 2025\n`);
    sections.push(
      `**Tier 1 Global Thought Leaders:**\n` +
      `- **Prof. Thomas J. Vogl** — Frankfurt, TACE technique pioneer, PES data with LifePearl\n` +
      `- **Prof. Riccardo Lencioni** — Pisa/Miami, EMERALD-1 investigator, LifePearl "go-to DEB"\n` +
      `- **Prof. Josep M. Llovet** — Barcelona/Mount Sinai, TACE-IO rationale champion\n` +
      `- **Prof. Irene Bargellini** — Turin, DEB-TACE technique standardization\n` +
      `- **Prof. Alejandro Forner** — Barcelona, BCLC-B sub-staging proposer\n` +
      `- **Prof. Bruno Sangro** — Navarra, TACE-IO safety monitoring\n\n` +
      `**Sentiment:** Strong support for TACE-IO combinations, LifePearl as preferred DEB. BioPearl generating excitement. DC Bead LUMI value questioned.`
    );
    return sections.join('\n');
  }

  // Safety
  if (/safe|toxicit|adverse|pes|post.?emboliz|hepatotox|side.?effect/i.test(lower)) {
    sections.push(`## Safety Profile — CIRSE 2025\n`);
    sections.push(
      `**DEB Platform Comparison (Grade 3+ hepatotoxicity):**\n` +
      `- LifePearl: **3.8%** (lowest)\n` +
      `- DC Bead: 6.2%\n` +
      `- HepaSphere: 8.7% (highest, p=0.02 vs LifePearl)\n\n` +
      `**Post-Embolization Syndrome:**\n` +
      `- LifePearl: 38% vs DC Bead: 52% (p=0.03, Vogl data)\n\n` +
      `**TACE-IO Combination Safety:**\n` +
      `- Grade 3+ hepatic AEs: 18% (vs 12% TACE alone)\n` +
      `- Transient ALT/AST elevations resolving within 4 weeks\n` +
      `- Immune-mediated hepatitis: 4.2%\n` +
      `- No increase in liver-related mortality\n` +
      `- Monitoring: LFTs every 2 weeks for first 3 cycles`
    );
    return sections.join('\n');
  }

  // KIT gaps
  if (/gap|missing|uncovered|priorit|kit|intelligence/i.test(lower)) {
    const allKITs = [
      'Competitive Landscape', 'Combination Therapy', 'Technical Innovation', 'Clinical Outcomes',
      'Patient Selection', 'Safety & Tolerability', 'Health Economics', 'Emerging Indications',
    ];
    const kitsCovered = [...new Set(insights.map((i) => i.kit).filter(Boolean))];
    const uncoveredKITs = allKITs.filter((k) => !kitsCovered.includes(k));

    sections.push(`## KIT Coverage Analysis\n`);
    if (uncoveredKITs.length === 0) {
      sections.push(`All 8 KITs have at least one insight captured. Review depth of coverage for each to identify thin areas.`);
    } else {
      sections.push(`**${uncoveredKITs.length} KIT${uncoveredKITs.length !== 1 ? 's' : ''} without coverage:**`);
      for (const kit of uncoveredKITs) {
        sections.push(`- **${kit}** — No insights captured yet`);
      }
      sections.push(`\n**Suggestion:** Focus upcoming sessions on ${uncoveredKITs.slice(0, 3).join(', ')}. Look for poster presentations and satellite symposia that may cover these topics.`);
    }
    return sections.join('\n');
  }

  // Generic fallback with context
  if (context) {
    sections.push(`## Auri Response\n`);
    sections.push(`Based on the available congress data, here is what I found relevant to your question:\n`);
    sections.push(context);
    sections.push(`\n---\n*For more detailed analysis, configure an API key (Anthropic or OpenAI) in the environment settings.*`);
    return sections.join('\n');
  }

  // Absolute fallback
  return (
    `## Auri — CIRSE 2025 Co-Pilot\n\n` +
    `I'm ready to help with your congress intelligence needs! Here are some things you can ask me:\n\n` +
    `- **"Give me a daily brief"** — Summary of captured insights and coverage gaps\n` +
    `- **"What's the competitive landscape?"** — LifePearl vs DC Bead vs HepaSphere\n` +
    `- **"Tell me about EMERALD-1"** — TACE-IO combination trial data\n` +
    `- **"What's LifePearl's advantage?"** — DEB technology and evidence\n` +
    `- **"What KITs need coverage?"** — Gap analysis across 8 intelligence topics\n` +
    `- **"Summarize KOL sentiment"** — Thought leader positions at CIRSE 2025\n` +
    `- **"What about patient selection?"** — BCLC-B staging and treatment algorithms\n\n` +
    `*${insights.length} insight${insights.length !== 1 ? 's' : ''} captured so far.*`
  );
}

/**
 * Main entry point for Auri AI assistant.
 * Fallback chain: Claude -> OpenAI -> keyword-based response.
 */
export async function askAuri(userMessage, insights = []) {
  const context = getRelevantContext(userMessage, insights);
  const systemPrompt = buildSystemPrompt(insights, context);

  // Try Claude first
  try {
    const response = await callClaude(systemPrompt, userMessage);
    return { response, provider: 'claude' };
  } catch (e) {
    console.log('Claude unavailable, trying OpenAI...', e.message);
  }

  // Fall back to OpenAI
  try {
    const response = await callOpenAI(systemPrompt, userMessage);
    return { response, provider: 'openai' };
  } catch (e) {
    console.log('OpenAI unavailable, using keyword fallback...', e.message);
  }

  // Keyword-based fallback
  const response = keywordFallback(userMessage, context, insights);
  return { response, provider: 'keyword' };
}
