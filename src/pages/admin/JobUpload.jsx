import { useState } from 'react';
import { db, auth } from '../../../firebase'; // Adjust the import based on your project structure
import { collection, addDoc } from 'firebase/firestore';

const JobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if the current user is an admin
    const user = auth.currentUser;
    if (!user) {
      setError('User is not authenticated.');
      return;
    }

    try {
      // Adding job posting to Firestore
      const jobPostingRef = await addDoc(collection(db, 'job-openings'), {
        title,
        location,
        jobType,
        experienceLevel,
        description,
        createdAt: new Date(),
      });

      // Adding an update to the updates collection
      await addDoc(collection(db, 'updates'), {
        message: `New job opening added: ${title} (${jobType}) at ${location}.`,
        timestamp: new Date(),
        jobPostingId: jobPostingRef.id, // Optionally link to the job posting
      });

      setSuccess('Job opening added successfully.');
      // Clear the form
      setTitle('');
      setLocation('');
      setJobType('');
      setExperienceLevel('');
      setDescription('');
    } catch (error) {
      setError('Error adding job posting: ' + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Job Opening</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select experience level</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#01553d] text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Add Job Opening
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
