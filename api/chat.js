export const config = { runtime: 'edge' };

export async function POST(req) {
  try {
    const { model = 'gpt-4.1-mini', messages = [] } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }), { status: 500 });

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature: 0.7 })
    });

    if (!r.ok) {
      const e = await r.text();
      return new Response(JSON.stringify({ error: e }), { status: 500 });
    }
    const data = await r.json();
    const text = data.choices?.[0]?.message?.content || '';
    return new Response(JSON.stringify({ text }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}
