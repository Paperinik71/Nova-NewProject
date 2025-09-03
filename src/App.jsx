import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-5", messages: newMessages })
    });

    const data = await res.json();
    const reply = data.text || "Nessuna risposta";

    // Aggiungi risposta
    setMessages([...newMessages, { role: "assistant", content: reply }]);

    // Leggi a voce alta
    const utterance = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(utterance);

    setInput("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Virtuality-Nova V6</h1>
      <img src="/avatar.png" alt="Nova Avatar" width="200" />
      <div style={{ margin: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi qui..."
        />
        <button onClick={sendMessage}>Invia</button>
      </div>
      <div style={{ textAlign: "left", margin: "0 auto", width: "50%" }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.role}:</b> {m.content}</p>
        ))}
      </div>
    </div>
  );
}

export default App;