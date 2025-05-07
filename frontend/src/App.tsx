import MessageHistory from "./components/MessageHistory"
import MessageInput from "./components/MessageInput"
import { useState } from "react";

function App() {
  const [messageHistory, setMessageHistory] = useState([{user: "assistant", message: "Hi, how can I help you today?"}]);
  return (
    <div className="App h-screen">
      <h1 className="text-center text-2xl font-bold p-4 h-1/10">Helpdesk Assistant</h1>
      <MessageHistory messages={messageHistory} />
      <MessageInput />
    </div>
  )
}

export default App
