from google import genai
from pydantic import BaseModel
import dotenv
import os

class FormSchema(BaseModel):
    firstname: str
    lastname: str
    email: str
    reason_of_contact: str
    urgency: int

class ResponseSchema(BaseModel):
    response: str
    form: FormSchema

class GeminiClient:
    def __init__(self, model = "gemini-2.0-flash"):
        dotenv.load_dotenv()
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

        self.client = genai.Client(api_key=GEMINI_API_KEY)
        self.model = model
        self.context = """You are an IT helpdesk assistant at a company.
Your job is to help out users in filling out helpdesk forms when they have issues with their devices.
Ask the following questions to get the form fields provided in parenthesis:
1. What is their name (firstname and lastname, both max 20 characters; do not shorten anything, if the name is too long, truncate it),
2. What is their email address (must be a valid email),
3. What's their reason of contact (max 100 characters) - what is the issue, what solutions have they tried, summarize the inputs to fit the constraint and make it clear for IT people (for example, if the user sees a popup asking for Bitcoin, assume their computer is infected with a ransomware); when the user provides a vague answer, you can ask for more details, but only once,
4. How urgent is the issue (1-10) - propose the number yourself and ask the user if that's ok; if not, ask for their input.
Keep the conversation natural and friendly as if they were talking to a human - you can provide simple explanations, but do not provide any solutions.
Besides the response, return the following JSON object:
```json
{
    "firstname": str,
    "lastname": str,
    "email": email,
    "reason": str,
    "urgency": int 
}
```
Update the object after each question so the user can see what they have provided so far.
When the user provides all the information, say "Thank you for your input. Your request has been submitted." and end the conversation.
"""

        self.chat = self.client.chats.create(
            model=self.model,
            config={
                'system_instruction': self.context,
                'temperature': 0.9,
                'response_mime_type': 'application/json',
                'response_schema': ResponseSchema.model_json_schema()
            }
        )

    def message(self, prompt):
        response = self.chat.send_message(prompt)
        return response.text
    
    def get_history(self):
        history = self.chat.get_history()
        messages = []
        for content in history:
            role = content.role
            prompt = content.parts[0].text
            messages.append({'user': role, 'content': prompt})
        return messages

    def reset_chat(self):
        self.chat = self.client.chats.create(
            model=self.model,
            config={
                'system_instruction': self.context,
                'temperature': 0.9,
                'response_mime_type': 'application/json',
                'response_schema': ResponseSchema.model_json_schema()
            }
        )