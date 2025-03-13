import { useState, useEffect } from "react";

// ✅ Define Message Type
interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submitted_at?: string;  // Optional
}

// ✅ Type the Component
export default function AdminPage(): JSX.Element {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMessages(): Promise<void> {
            try {
                const response = await fetch("/api/admin", {
                    headers: {
                        "Authorization": `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }

                const data: Message[] = await response.json();
                setMessages(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        }

        fetchMessages();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Admin Panel</h2>

            {/* 🔄 Loading State */}
            {loading && <p className="text-center text-gray-400">Loading messages...</p>}

            {/* ❌ Error State */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* 📬 Message List */}
            {!loading && !error && messages.length === 0 ? (
                <p className="text-center text-gray-400">No messages found.</p>
            ) : (
                <ul className="space-y-4">
                    {messages.map((msg: Message) => (
                        <li key={msg.id} className="border border-orange-500 p-4 rounded-lg bg-gray-800 shadow-md">
                            <p><strong className="text-orange-400">Name:</strong> {msg.name}</p>
                            <p><strong className="text-orange-400">Email:</strong> {msg.email}</p>
                            <p><strong className="text-orange-400">Subject:</strong> {msg.subject}</p>
                            <p><strong className="text-orange-400">Message:</strong> {msg.message}</p>
                            <p className="text-sm text-gray-400">
                                📅 Sent: {msg.submitted_at ? new Date(msg.submitted_at).toLocaleString() : "Unknown"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
