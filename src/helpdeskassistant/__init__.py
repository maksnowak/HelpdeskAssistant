import uvicorn

def main():
    uvicorn.run('helpdeskassistant.main:app', host='0.0.0.0', port=8000, reload=True)