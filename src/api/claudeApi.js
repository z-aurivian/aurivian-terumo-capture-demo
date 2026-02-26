import Anthropic from '@anthropic-ai/sdk';

const getClient = () => {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
};

export async function callClaude(systemPrompt, userMessage) {
  const client = getClient();
  if (!client) throw new Error('No Anthropic API key');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  return response.content[0].text;
}
