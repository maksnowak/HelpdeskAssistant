import MessageHistory from "./components/MessageHistory"
import MessageInput from "./components/MessageInput"

function App() {
  let mockMessages = [
    { user: "user", message: "Hello, how are you?" },
    { user: "assistant", message: "I'm fine, thank you!" }
  ];
  return (
    <div className="App">
      <MessageHistory messages={mockMessages} />
      <MessageInput />
    </div>
  )
}

export default App
