from . import gemini

def main():
    gem = gemini.Gemini()

    print("Gemini: Hello! How can I help you today?")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break

        response = gem.message(user_input)
        print("Gemini:", response)

    print("Gemini: Goodbye!")