import os
from dotenv import load_dotenv

load_dotenv()

MODEL_PATH   = os.getenv("MODEL_PATH", "Noire2903/bias-mirror-model")
MAX_LEN      = 256
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL   = "llama-3.3-70b-versatile"
REWRITE_CACHE: dict = {}