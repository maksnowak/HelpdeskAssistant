from fastapi import FastAPI, Request, Cookie, HTTPException
from uuid import uuid4
from . import gemini

app = FastAPI()

session_store = {}
COOKIE_NAME = "session_id"

def get_gemini_client(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = gemini.GeminiClient()
    return session_store[session_id]

@app.middleware("http")
async def add_session(request: Request, call_next):
    session_id = request.cookies.get(COOKIE_NAME)
    if not session_id:
        session_id = str(uuid4())
        response = await call_next(request)
        response.set_cookie(key=COOKIE_NAME, value=session_id, httponly=True)
        return response
    response = await call_next(request)
    return response

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/chat")
def get_chat_history(session_id: str = Cookie(None)):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID not found")
    geminiclient = get_gemini_client(session_id)
    history = geminiclient.get_chat_history()
    return {"history": history}

@app.post("/chat")
def ask_gemini(prompt: str, session_id: str = Cookie(None)):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID not found")
    geminiclient = get_gemini_client(session_id)
    response = geminiclient.message(prompt)
    return {"response": response}

@app.delete("/chat")
def reset_chat(session_id: str = Cookie(None)):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID not found")
    geminiclient = get_gemini_client(session_id)
    geminiclient.reset_chat()
    return {"status": "Chat reset"}