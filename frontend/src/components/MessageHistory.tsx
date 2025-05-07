import MessageBlob from "./MessageBlob";

function MessageHistory({ messages }: { messages: Array<any> }) {
    return (
        <div className="flex flex-col overflow-y-auto p-4 w-full h-8/10">
            {messages.map((msg, index) => (
                <MessageBlob key={index} user={msg.user} message={msg.message} />
            ))}
        </div>
    );
}

export default MessageHistory;