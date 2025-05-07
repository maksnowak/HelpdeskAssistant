import FormView from "./components/FormView";
import MessageHistory from "./components/MessageHistory"
import MessageInput from "./components/MessageInput"
import { useEffect, useState } from "react";
export interface Message {
  user: string;
  message: string;
};

export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  reason_of_contact: string;
  urgency: number;
}

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
  const [formData, setFormData] = useState<FormData>({firstname: '', lastname: '', email: '', reason_of_contact: '', urgency: 0});
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateHistory = (newMessage: Message, formFields?: FormData) => {
    setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
    if (formFields) {
      setFormData(formFields);
    }
  }

  const onResetChat = () => {
    setMessageHistory([{user: 'assistant', message: 'Hello! How can I help you today?'}]);
    setFormData({firstname: '', lastname: '', email: '', reason_of_contact: '', urgency: 0});
    setSubmitted(false);
  }

  return (
    <div className="App h-screen flex flex-col">
      <h1 className="text-center text-2xl font-bold p-4">Helpdesk Assistant</h1>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-grow overflow-auto">
          <MessageHistory messages={messageHistory} />
        </div>
        {showForm && (
          <div className="w-1/3 border-l border-gray-300 overflow-auto">
            <FormView data={formData} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4 border-t border-gray-300"> 
        <div className="flex-grow flex gap-2">
          <MessageInput onSend={updateHistory} submitted={submitted} setSubmitted={setSubmitted}/>
        </div>
        <div className="flex gap-2 ml-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => {
            resetChat();
            onResetChat();
          }}>New Chat</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700" onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Show Form'}</button>
        </div>
      </div>
    </div>
  )
}

export default App
