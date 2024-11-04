import { useState } from 'react';
import { db, storage } from '../../../firebase'; // Adjust the import path based on your setup
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  "Partner",
  "Managing Associate",
  "Associate",
];

export default function PeopleUpload() {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    practiceArea: [],
    photo: null,
    experience: '',
    education: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // To handle multi-step form

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
    setFormData((prev) => ({
      ...prev,
      practiceArea: prev.practiceArea.includes(area)
        ? prev.practiceArea.filter((a) => a !== area)
        : [...prev.practiceArea, area],
    }));
    setError(''); // Reset error on change
  };

  const handleQuillChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');
    setError('');

    try {
      const { fullName, position, practiceArea, photo, experience, education, email, phone } = formData;

      if (!fullName || !position || !email || !phone || practiceArea.length === 0 || !photo || !experience || !education) {
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
        email,
        phone,
        photoURL,
        experience,
        education,
        createdAt: new Date(),
      });

      const updatesCollection = collection(db, 'updates');
      await addDoc(updatesCollection, {
        message: `${fullName} has been added as a ${position}.`,
        timestamp: new Date(),
      });

      setFeedbackMessage('Staff uploaded successfully!');
      setFormData({
        fullName: '',
        position: '',
        practiceArea: [],
        photo: null,
        experience: '',
        education: '',
        email: '',
        phone: ''
      });
      setStep(1); // Reset to first step after successful submission
    } catch (error) {
      console.error('Error uploading staff:', error);
      setError(error.message || 'Failed to upload staff. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
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
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <label className="block text-sm font-medium mb-1">Practice Areas</label>
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
          </>
        );

      case 3:
        return (
          <>
            <label className="block text-sm font-medium mb-1">Experience</label>
            <ReactQuill
              value={formData.experience}
              onChange={(value) => handleQuillChange("experience", value)}
              className="mb-4"
            />

            <label className="block text-sm font-medium mb-1">Education</label>
            <ReactQuill
              value={formData.education}
              onChange={(value) => handleQuillChange("education", value)}
              className="mb-4"
            />
          </>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Staff Information</h2>
      <form onSubmit={handleSubmit}>
        {renderStepContent()}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {feedbackMessage && <p className="text-green-500 text-sm mb-4">{feedbackMessage}</p>}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
            >
              Previous
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
