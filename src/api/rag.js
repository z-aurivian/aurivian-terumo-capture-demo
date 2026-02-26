import {
  TRIAL_SUMMARIES,
  COMPETITIVE_LANDSCAPE,
  CLINICAL_PRACTICE,
  KOL_LANDSCAPE,
  CONGRESS_OVERVIEW,
} from '../data/congressContent';

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
  'because', 'but', 'and', 'or', 'if', 'while', 'about', 'up', 'it',
  'its', 'this', 'that', 'these', 'those', 'i', 'me', 'my', 'we', 'our',
  'you', 'your', 'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their',
  'what', 'which', 'who', 'whom', 'any', 'tell', 'give', 'show', 'know',
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function scoreMatch(tokens, text) {
  const lower = text.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (lower.includes(token)) score++;
  }
  return score;
}

function matchInsights(tokens, insights) {
  if (!insights || insights.length === 0) return [];

  return insights
    .map((insight) => {
      const searchable = [
        insight.narrative || '',
        insight.title || '',
        (insight.tags || []).join(' '),
        (insight.products || []).join(' '),
        insight.kit || '',
        insight.kol || '',
        insight.session || '',
      ].join(' ');

      return { insight, score: scoreMatch(tokens, searchable) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.insight);
}

function matchTrials(tokens) {
  const results = [];
  for (const [name, summary] of Object.entries(TRIAL_SUMMARIES)) {
    const score = scoreMatch(tokens, name + ' ' + summary);
    if (score > 0) results.push({ name, summary, score });
  }
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.summary.trim());
}

function matchReferenceBlocks(tokens) {
  const blocks = [
    { label: 'Competitive Landscape', content: COMPETITIVE_LANDSCAPE },
    { label: 'Clinical Practice', content: CLINICAL_PRACTICE },
    { label: 'KOL Landscape', content: KOL_LANDSCAPE },
    { label: 'Congress Overview', content: CONGRESS_OVERVIEW },
  ];

  return blocks
    .map((b) => ({ ...b, score: scoreMatch(tokens, b.content) }))
    .filter((b) => b.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function getRelevantContext(query, insights = []) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return '';

  const sections = [];

  // Match captured insights
  const matchedInsights = matchInsights(tokens, insights);
  if (matchedInsights.length > 0) {
    const formatted = matchedInsights
      .map((ins, i) => {
        const parts = [`**Insight ${i + 1}**`];
        if (ins.title) parts.push(`Title: ${ins.title}`);
        if (ins.session) parts.push(`Session: ${ins.session}`);
        if (ins.kol) parts.push(`KOL: ${ins.kol}`);
        if (ins.kit) parts.push(`KIT: ${ins.kit}`);
        if (ins.narrative) parts.push(ins.narrative);
        if (ins.products?.length) parts.push(`Products: ${ins.products.join(', ')}`);
        if (ins.tags?.length) parts.push(`Tags: ${ins.tags.join(', ')}`);
        return parts.join('\n');
      })
      .join('\n\n');
    sections.push(`### Captured Insights\n${formatted}`);
  }

  // Match trial summaries
  const matchedTrials = matchTrials(tokens);
  if (matchedTrials.length > 0) {
    sections.push(`### Relevant Trial Data\n${matchedTrials.join('\n\n')}`);
  }

  // Match reference blocks
  const matchedBlocks = matchReferenceBlocks(tokens);
  if (matchedBlocks.length > 0) {
    const formatted = matchedBlocks.map((b) => b.content.trim()).join('\n\n---\n\n');
    sections.push(`### Reference Data\n${formatted}`);
  }

  if (sections.length === 0) {
    // Fallback: always include congress overview
    sections.push(`### Congress Overview\n${CONGRESS_OVERVIEW.trim()}`);
  }

  return sections.join('\n\n---\n\n');
}
