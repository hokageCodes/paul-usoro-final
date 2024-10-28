import { useState } from 'react';
import { db, storage } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const practiceAreas = [
  { title: "Adr & Advocacy" },
  { title: "Transportation Law" },
  { title: "Banking and Finance" },
  { title: "Capital Market" },
  { title: "Communications Law" },
  { title: "Energy and Environmental Law" },
  { title: "General Practice" },
  { title: "Labour" },
  { title: "Maritime" },
  { title: "Mergers and Acquisitions" },
  { title: "Aviation" },
  { title: "Project Finance" },
];

const positions = [
  "Senior Partner",
  "Managing Partner",
  "Managing Associate",
  "Associate",
];

export default function PeopleUpload() {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    practiceArea: [],
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Reset error on change
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
    setError(''); // Reset error on change
  };

  const handlePracticeAreaChange = (e) => {
    const area = e.target.value;
    setFormData(prev => ({
      ...prev,
      practiceArea: prev.practiceArea.includes(area)
        ? prev.practiceArea.filter(a => a !== area)
        : [...prev.practiceArea, area],
    }));
    setError(''); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');
    setError('');

    try {
      const { fullName, position, practiceArea, photo } = formData;

      // Validation checks
      if (!fullName || !position || practiceArea.length === 0 || !photo) {
        throw new Error('All fields are required.');
      }

      const photoRef = ref(storage, `people/${photo.name}`);
      await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoRef);

      const peopleCollection = collection(db, 'people');
      await addDoc(peopleCollection, {
        fullName,
        position,
        practiceArea,
        photoURL,
        createdAt: new Date(),
      });

      setFeedbackMessage('Staff uploaded successfully!');
      setFormData({ fullName: '', position: '', practiceArea: [], photo: null });
    } catch (error) {
      console.error('Error uploading staff:', error);
      setError(error.message || 'Failed to upload staff. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Staff Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Position</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
            required
          >
            <option value="">Select Position</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Practice Areas</label>
          <div className="flex flex-wrap gap-2 mb-4 mt-4">
            {formData.practiceArea.map(area => (
              <span key={area} className="bg-green-200 text-green-800 rounded-full px-2 py-1 text-sm">
                {area}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {practiceAreas.map((area) => (
              <label key={area.title} className="flex items-center">
                <input
                  type="checkbox"
                  value={area.title}
                  checked={formData.practiceArea.includes(area.title)}
                  onChange={handlePracticeAreaChange}
                  className="mr-2"
                />
                {area.title}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Photo</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {feedbackMessage && <p className="text-green-500 text-sm mb-4">{feedbackMessage}</p>}

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
