import { useState } from "react";

const TeacherDashboard = () => {
    const [message, setMessage] = useState("");

    const sendNotification = async () => {
        const res = await fetch("http://localhost:5000/api/notifications/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Send Notification</h2>
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 w-full"
            />
            <button onClick={sendNotification} className="bg-blue-500 text-white px-4 py-2 mt-2">
                Send
            </button>
        </div>
    );
};

export default TeacherDashboard;
