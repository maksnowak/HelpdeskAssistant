from fastapi import FastAPI, Request, Cookie, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from . import gemini
import json

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return JSONResponse({'response': 'default backend response'})

@app.post("/chat")
async def ask_gemini(request: Request, session_id: str = Cookie(None)):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID not found")
    body = await request.json()
    prompt = body.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    geminiclient = get_gemini_client(session_id)
    response = geminiclient.message(prompt)
    return JSONResponse(json.loads(response))

@app.delete("/chat")
def reset_chat(session_id: str = Cookie(None)):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID not found")
    geminiclient = get_gemini_client(session_id)
    geminiclient.reset_chat()
    return JSONResponse({'response': 'Chat reset successfully'})