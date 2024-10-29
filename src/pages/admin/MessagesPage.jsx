import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, "contact"); // replace "contact" with your collection name
        const messagesSnapshot = await getDocs(messagesCollection);
        const messagesList = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const exportToCSV = () => {
    const csvHeader = ["Name,Email,Concern"];
    const csvRows = messages.map(
      (message) => `${message.name},${message.email},${message.concern}`
    );
    const csvContent = [csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "messages.csv");
    link.click();
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <button
          onClick={exportToCSV}
          className="mb-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          Export as CSV
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#01533d] text-white">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Concern</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{message.name}</td>
              <td className="px-4 py-2">{message.email}</td>
              <td className="px-4 py-2">{message.concern}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesPage;
