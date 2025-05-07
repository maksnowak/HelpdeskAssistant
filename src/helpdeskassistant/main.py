from fastapi import FastAPI
from . import gemini

geminiclient = gemini.GeminiClient()

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/chat")
def get_chat_history():
    history = geminiclient.get_chat_history()
    return {"history": history}

@app.post("/chat")
def ask_gemini(prompt: str):
    response = geminiclient.message(prompt)
    return {"response": response}

@app.delete("/chat")
def reset_chat():
    geminiclient.reset_chat()