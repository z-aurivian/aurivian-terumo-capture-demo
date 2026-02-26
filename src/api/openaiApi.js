import OpenAI from 'openai';

const getClient = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
};

export async function callOpenAI(systemPrompt, userMessage) {
  const client = getClient();
  if (!client) throw new Error('No OpenAI API key');

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 2048,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  });

  return response.choices[0].message.content;
}
