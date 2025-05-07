function MessageInput() {
    return (
        <div className="flex items-center justify-between p-4 h-auto inset-x-0 bottom-0">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded"
            />
            <button className="ml-2 px-4 py-2 text-white rounded">Send</button>
        </div>
    )
}

export default MessageInput