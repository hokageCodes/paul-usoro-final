import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const formatTimestamp = (timestamp) => {
  const now = new Date();
  const timeAgo = now - new Date(timestamp);

  const seconds = Math.floor(timeAgo / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return days === 1 ? "yesterday" : `${days} days ago`;
  else if (hours > 0) return `${hours} hours ago`;
  else if (minutes > 0) return `${minutes} minutes ago`;
  return "just now";
};

const AdminDashboard = () => {
  const [contactCount, setContactCount] = useState(0);
  const [jobOpeningsCount, setJobOpeningsCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);

        const contactSnapshot = await getDocs(collection(db, "contact"));
        setContactCount(contactSnapshot.size);

        const jobOpeningsSnapshot = await getDocs(collection(db, "job-openings"));
        setJobOpeningsCount(jobOpeningsSnapshot.size);

        const peopleSnapshot = await getDocs(collection(db, "people"));
        setPeopleCount(peopleSnapshot.size);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    // Set up real-time listeners for updates and contact messages
    const updatesRef = collection(db, "updates");
    const contactRef = collection(db, "contact");

    const unsubscribeUpdates = onSnapshot(updatesRef, (snapshot) => {
      const updatesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentUpdates(updatesData.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5));
    });

    const unsubscribeContact = onSnapshot(contactRef, (snapshot) => {
      setContactCount(snapshot.size);
    });

    fetchCounts();

    return () => {
      unsubscribeUpdates();
      unsubscribeContact();
    };
  }, []);

  if (loading) return <p>Loading dashboard overview...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <p className="mb-4">Welcome to your admin dashboard! Here is a quick overview of the data:</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Contacts</h3>
          <p className="text-4xl font-bold">{contactCount}</p>
          <p className="text-sm">Total messages received</p>
        </div>

        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Job Openings</h3>
          <p className="text-4xl font-bold">{jobOpeningsCount}</p>
          <p className="text-sm">Current job listings</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">People</h3>
          <p className="text-4xl font-bold">{peopleCount}</p>
          <p className="text-sm">Total team members</p>
        </div>
      </div>

      {/* Recent Updates Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Recent Updates</h3>
        {recentUpdates.length > 0 ? (
          <ul className="list-none">
            {recentUpdates.map(update => (
              <li key={update.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{update.message}</p>
                  <span className="text-sm text-gray-500">({formatTimestamp(update.timestamp)})</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent updates available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
