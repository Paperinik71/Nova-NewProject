import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input) return
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4.1-mini", messages: newMessages })
      })
      const data = await res.json()
      const reply = data.text || "Nessuna risposta"
      setMessages([...newMessages, { role: "assistant", content: reply }])
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Errore API" }])
    }
    setLoading(false)
    setInput("")
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Virtuality-Nova GPT Test</h1>
      <div style={{ margin: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi qui..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Attendi..." : "Invia"}
        </button>
      </div>
      <div style={{ textAlign: "left", margin: "0 auto", width: "60%" }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.role}:</b> {m.content}</p>
        ))}
      </div>
    </div>
  )
}

export default App
