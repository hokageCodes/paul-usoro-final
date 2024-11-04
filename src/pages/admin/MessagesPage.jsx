import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const messagesRef = collection(db, "contact");

    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "contact", id));
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message.");
      }
    }
  };

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
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{message.name}</td>
              <td className="px-4 py-2">{message.email}</td>
              <td className="px-4 py-2">{message.concern}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesPage;
