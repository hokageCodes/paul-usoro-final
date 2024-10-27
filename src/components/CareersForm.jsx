import { useState } from "react";

const CareersForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Fresh Counsel",
    linkedin: "",
    coverLetter: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic here
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FEFBF6] flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#3F2E3E] text-center mb-6">
          Careers Application Form
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position Applying For
          </label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          >
            <option value="Fresh Counsel">Fresh Counsel</option>
            <option value="Experienced Associate">Experienced Associate</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        {/* LinkedIn Profile */}
        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn Profile (Optional)
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="Enter your LinkedIn profile URL"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          />
        </div>

        {/* Cover Letter */}
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
            Cover Letter (Optional)
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows="4"
            placeholder="Write a brief cover letter"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          ></textarea>
        </div>

        {/* Upload CV */}
        <div className="mb-4">
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
            Upload CV (PDF, max 2MB)
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf"
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:ring-[#A6D1E6] focus:border-[#A6D1E6]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#3F2E3E] text-white font-semibold py-3 rounded-lg 
            hover:bg-[#7F5283] transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CareersForm;
