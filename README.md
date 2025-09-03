# Virtuality‑Nova • GPT + Voce (TTS)

Progetto minimale per testare chat GPT + Text‑to‑Speech su Vercel.

## Endpoints
- `POST /api/chat` -> { text } risposta del modello
- `POST /api/tts`  -> audio/mp3 della frase passata

## Variabili d'ambiente
- `OPENAI_API_KEY` (obbligatoria)

## Deploy
1) Carica cartella su GitHub
2) In Vercel, aggiungi `OPENAI_API_KEY` nelle Environment Variables (Production/Preview/Development)
3) Deploy. Apri il sito, scrivi un messaggio: sentirai la risposta parlata.
