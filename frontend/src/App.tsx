import MessageHistory from "./components/MessageHistory"
import MessageInput from "./components/MessageInput"
import { useState } from "react";
export interface Message {
  user: string;
  message: string;
};

function App() {
  const [messageHistory, setMessageHistory] = useState([{user: "assistant", message: "Hi, how can I help you today?"}]);

  const updateHistory = (newMessage: Message) => {
    setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
  }

  const apiSanityCheck = async () => {
    try {
      const repsonse = await fetch('http://localhost:8000/', {
        method: 'GET',
        credentials: 'include'
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      });

      if (!(repsonse && repsonse.response)) {
        console.error('Unexpected response format:', repsonse);
      }

    } catch (error) {
      console.error('Error checking API:', error);
    }
  }
  apiSanityCheck(); // Call the API sanity check to generate the cookie

  return (
    <div className="App h-screen">
      <h1 className="text-center text-2xl font-bold p-4 h-1/10">Helpdesk Assistant</h1>
      <MessageHistory messages={messageHistory} />
      <MessageInput onSend={updateHistory}/>
    </div>
  )
}

export default App
