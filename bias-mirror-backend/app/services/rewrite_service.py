from groq import Groq
from app.config import GROQ_API_KEY, GROQ_MODEL, REWRITE_CACHE

client = Groq(api_key=GROQ_API_KEY)

def build_prompt(text: str, label: str) -> str:
    return f"""You are a bias correction assistant. Rewrite the following sentence to remove {label} bias while preserving the core meaning.

Rules:
- Keep the same general topic and context
- Remove stereotypes, assumptions, or discriminatory language
- Make it neutral, respectful and professional
- Return ONLY the rewritten sentence, nothing else, no explanation, no preamble
- Do NOT suggest the person change their name, appearance, accent, or any part of their identity
- If the bias involves someone being told to change their identity to fit in, rewrite to affirm their identity and challenge the bias instead
- Keep the rewrite concise — do not over-explain or add unnecessary caveats
- Do NOT add commentary, analysis or observations about the bias itself
- Do NOT add phrases like "highlighting a concerning disparity", "it's important to note", "it's essential to" or similar editorial language
- Simply rewrite the sentence to be neutral, nothing more

Biased sentence: "{text}"
Bias type: {label}

Rewritten sentence:"""

def rewrite_text(text: str, label: str) -> str:
    cache_key = f"{label}::{text.strip().lower()}"
    if cache_key in REWRITE_CACHE:
        return REWRITE_CACHE[cache_key]

    prompt   = build_prompt(text, label)
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=256,
        temperature=0.3,
    )

    rewritten = response.choices[0].message.content.strip()
    if rewritten.startswith('"') and rewritten.endswith('"'):
        rewritten = rewritten[1:-1].strip()

    REWRITE_CACHE[cache_key] = rewritten
    return rewritten