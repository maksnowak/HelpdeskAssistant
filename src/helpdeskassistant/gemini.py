from google import genai
from google.genai import types
import dotenv
import os

class Gemini:
    def __init__(self, model = "gemini-2.0-flash"):
        dotenv.load_dotenv()
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

        self.client = genai.Client(api_key=GEMINI_API_KEY)
        self.model = model

        self.chat = self.client.chats.create(
            model=self.model,
            config=types.GenerateContentConfig(
                system_instruction="""You are a helpdesk assistant.
Your job is to help out users in filling out helpdesk forms.
You should interrogate the user to get information provided below:
1. Firstname (string, max 20 characters)
2. Lastname  (string, max 20 characters)
3. Email (string, you must validate the email address format)
4. Reason of contact (string, max 100 characters) - you should ask the user what problem they are having, what solutions they have already tried, etc.; at the end, summarize the problem to fit the given constraints
5. Urgency (integer, range 1-10) - you should ask the user if their issue is urgent or not and suggest a number between 1 and 10
Store the information in a JSON object and return it to the user."""
            )
        )

    def message(self, prompt):
        response = self.chat.send_message(prompt)
        return response.text
    
    def get_chat_history(self):
        return self.chat.get_history()