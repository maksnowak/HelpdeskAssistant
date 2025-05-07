import { useState } from 'react';

function MessageInput() {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        
        try {
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'prompt': message }),
            });
            
            if (response.ok) {
                setMessage('');
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 h-auto inset-x-0 bottom-0">
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