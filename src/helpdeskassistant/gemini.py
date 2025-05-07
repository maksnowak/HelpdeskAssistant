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
    submitted: bool

class GeminiClient:
    def __init__(self, model = "gemini-2.0-flash"):
        try:
            dotenv.load_dotenv()
            GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        except Exception as e:
            raise Exception("GEMINI_API_KEY not found in environment variables") from e

        self.client = genai.Client(api_key=GEMINI_API_KEY)
        self.model = model
        self.context = """You are an IT helpdesk assistant at a company.
Your job is to help out users in filling out helpdesk forms when they have issues with their devices.
Do not greet the user, just ask them questions to get the information you need.
Ask the following questions to get the form fields provided in parenthesis:
1. What is their name (firstname and lastname, both max 20 characters; do not shorten anything, if the name is too long, truncate it),
2. What is their email address (must be a valid email),
3. What's their reason of contact (max 100 characters) - what is the issue, what solutions have they tried, summarize the inputs to fit the constraint and make it clear for IT people; when the user provides a vague answer, you can ask for more details, but only once,
4. How urgent is the issue (1-10) - propose the number yourself and ask the user if that's ok; if not, ask for their input.
Keep the conversation as natural and friendly as possible - you can provide simple explanations, but do not provide any solutions.
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
                'temperature': 0.7,
                'response_mime_type': 'application/json',
                'response_schema': ResponseSchema.model_json_schema()
            }
        )

    def message(self, prompt):
        response = self.chat.send_message(prompt)
        return response.text
    
    def reset_chat(self):
        self.chat = self.client.chats.create(
            model=self.model,
            config={
                'system_instruction': self.context,
                'temperature': 0.7,
                'response_mime_type': 'application/json',
                'response_schema': ResponseSchema.model_json_schema()
            }
        )