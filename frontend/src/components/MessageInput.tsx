import { useState } from 'react';
import type { Message } from '../App';

function MessageInput({ onSend }: { onSend: ( message: Message ) => void }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        
        onSend({user: 'user', message: message});
        setMessage('');

        try {
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'prompt': message }),
            }).then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            });
            
            if (response && response.response) {
                onSend({ user: 'assistant', message: response.response });
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 h-1/10 inset-x-0 bottom-0">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                }}
            />
            <button 
                className="ml-2 px-4 py-2 text-white rounded"
                onClick={handleSendMessage}
            >
                Send
            </button>
        </div>
    )
}

export default MessageInput