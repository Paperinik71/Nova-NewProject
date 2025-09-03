import { append } from './util'

export async function sendFromOutside(text){
  if(!text) return
  append('utente', text)
  try{
    const res = await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ model:'gpt-4.1-mini', messages:[{role:'user', content:text}] })
    })
    const data = await res.json()
    const reply = data.text || 'Nessuna risposta'
    append('assistente', reply)

    // Sintesi vocale via TTS
    const tts = await fetch('/api/tts',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text: reply, voice: 'alloy', format:'mp3' })
    })
    // in caso di errore testuale
    if(!tts.ok){
      const err = await tts.text()
      append('system', 'TTS error: '+err)
      return
    }
    const blob = await tts.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audio.play()
  }catch(e){
    append('system', 'Errore: '+e.message)
  }
}
