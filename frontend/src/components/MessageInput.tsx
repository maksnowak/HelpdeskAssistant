function MessageInput() {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-100">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        </div>
    )
}

export default MessageInput