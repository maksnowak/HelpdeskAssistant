import MessageHistory from "./components/MessageHistory"
import MessageInput from "./components/MessageInput"
import { useEffect, useState } from "react";
export interface Message {
  user: string;
  message: string;
};

function App() {
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

  const resetChat = async () => {
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'DELETE',
        credentials: 'include',
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      });

      if (response && response.response) {
        console.log(response.response);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  }

  useEffect(() => {
    apiSanityCheck();
    resetChat();
  }, []);

  const [messageHistory, setMessageHistory] = useState([{user: 'assistant', message: 'Hello! How can I help you today?'}]);

  const updateHistory = (newMessage: Message) => {
    setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
  }

  return (
    <div className="App h-screen">
      <h1 className="text-center text-2xl font-bold p-4 h-1/10">Helpdesk Assistant</h1>
      <MessageHistory messages={messageHistory} />
      <MessageInput onSend={updateHistory}/>
    </div>
  )
}

export default App
