import { useState, useEffect } from "react";

export default function AdminPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("/api/admin", {
            headers: { "Authorization": `Bearer ${import.meta.env.VITE_ADMIN_SECRET}` }
        })
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((err) => console.error("Error fetching messages:", err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id} className="border p-4 my-2 rounded">
                            <p><strong>Name:</strong> {msg.name}</p>
                            <p><strong>Email:</strong> {msg.email}</p>
                            <p><strong>Subject:</strong> {msg.subject}</p>
                            <p><strong>Message:</strong> {msg.message}</p>
                            <p><small>Sent: {new Date(msg.submitted_at).toLocaleString()}</small></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
