import MessageBlob from "./MessageBlob";

function MessageHistory({ messages }: { messages: Array<any> }) {
    return (
        <div className="flex flex-col h-full overflow-y-auto p-4">
            {messages.map((msg, index) => (
                <MessageBlob key={index} user={msg.user} message={msg.message} />
            ))}
        </div>
    );
}

export default MessageHistory;