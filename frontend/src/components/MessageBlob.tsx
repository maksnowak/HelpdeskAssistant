function MessageBlob({ user, message }: { user: string; message: string }) {
    let msg;
    if (!message) {
        return null;
    }
    if (user === "user") {
        msg = (
            <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                    {message}
                </div>
            </div>
        );
    }
    else {
        msg = (
            <div className="flex justify-start">
                <div className="bg-gray-300 p-2 rounded-lg max-w-xs">
                    {message}
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center mb-2">
            {msg}
        </div>
    );
}

export default MessageBlob;