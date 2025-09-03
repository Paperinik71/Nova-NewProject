export const config = { runtime: 'edge' };

export async function POST(req){
  try{
    const { text = '', voice = 'alloy', format = 'mp3' } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if(!apiKey) return new Response('Missing OPENAI_API_KEY', { status: 500 });
    if(!text) return new Response('Missing text', { status: 400 });

    const r = await fetch('https://api.openai.com/v1/audio/speech',{
      method:'POST',
      headers:{ 'Authorization':'Bearer '+apiKey, 'Content-Type':'application/json' },
      body: JSON.stringify({ model:'gpt-4o-mini-tts', voice, input: text, format })
    })
    if(!r.ok){
      const e = await r.text()
      return new Response(e, { status: 500 })
    }
    const ab = await r.arrayBuffer()
    return new Response(ab, { headers: { 'Content-Type': 'audio/mpeg' } })
  }catch(e){
    return new Response(String(e), { status: 500 })
  }
}
