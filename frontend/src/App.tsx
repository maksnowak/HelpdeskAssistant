import MessageHistory from "./components/MessageHistory"
import MessageInput from "./components/MessageInput"

function App() {
  let mockMessages = [
    { user: "user", message: "Hello, how are you?" },
    { user: "assistant", message: "I'm fine, thank you!" }
  ];
  return (
    <div className="App h-screen">
      <h1 className="text-center text-2xl font-bold p-4 h-1/10">Helpdesk Assistant</h1>
      <MessageHistory messages={mockMessages} />
      <MessageInput />
    </div>
  )
}

export default App
