import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const JobOpeningsPage = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const jobOpeningsCollection = collection(db, "job-openings");
        const jobOpeningsSnapshot = await getDocs(jobOpeningsCollection);
        const jobOpeningsList = jobOpeningsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobOpenings(jobOpeningsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job openings:", err);
        setError("Failed to load job openings.");
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job opening? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "job-openings", id));
        setJobOpenings(jobOpenings.filter((job) => job.id !== id));
      } catch (err) {
        console.error("Error deleting job opening:", err);
        setError("Failed to delete job opening.");
      }
    }
  };

  if (loading) return <p>Loading job openings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Job Openings</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#01533d] text-white">
          <tr>
            <th className="text-left px-4 py-2">Title</th>
            <th className="text-left px-4 py-2">Location</th>
            <th className="text-left px-4 py-2">Job Type</th>
            <th className="text-left px-4 py-2">Experience Level</th>
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobOpenings.map((job) => (
            <tr key={job.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.location}</td>
              <td className="px-4 py-2">{job.jobType}</td>
              <td className="px-4 py-2">{job.experienceLevel}</td>
              <td className="px-4 py-2">{job.description}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default JobOpeningsPage;
