import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ParallaxSection = ({ title, imageUrl }) => (
  <section
    className="bg-cover bg-center bg-fixed h-[50vh] flex justify-center items-center"
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    {title && <h2 className="text-4xl font-bold">{title}</h2>}
  </section>  
);

const TextSection = ({ children }) => (
  <section className="px-4 py-12 bg-white text-black text-lg">
    {children}
  </section>
)

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    position: "All Positions",
    location: "All Locations",
    experienceLevel: "All Levels",
  });

  const positions = ["Partner", "Managing Associate", "Senior Associate", "Associate", "Fresh Counsel", "NYSC", "Intern", "Extern"];
  const locations = ["Lagos", "Abuja", "Uyo"];
  const experienceLevels = ["All Levels", "Entry Level", "Mid Level", "Senior Level"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobCollection = collection(db, "job-openings");
        const jobSnapshot = await getDocs(jobCollection);
        const jobList = jobSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort jobs by createdAt in descending order
        jobList.sort((a, b) => b.createdAt - a.createdAt);

        setJobs(jobList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const openModal = (content, job) => {
    setSelectedJob(job);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.position === "All Positions" || job.position === filters.position) &&
      (filters.location === "All Locations" || job.location === filters.location) &&
      (filters.experienceLevel === "All Levels" || job.experienceLevel === filters.experienceLevel)
    );
  });

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        {/* Banner */}
        <div className="bg-[#01553d] text-white py-12 text-center">
          <h2 className="text-4xl font-bold">Open Jobs</h2>
        </div>

        {/* Main Content */}
        <div className="container mx-auto py-8 px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Filter by</h3>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Position</label>
              <select name="position" value={filters.position} onChange={handleFilterChange} className="w-full border rounded-lg px-4 py-2">
                <option>All Positions</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Location</label>
              <select name="location" value={filters.location} onChange={handleFilterChange} className="w-full border rounded-lg px-4 py-2">
                <option>All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Experience Level</label>
              <select name="experienceLevel" value={filters.experienceLevel} onChange={handleFilterChange} className="w-full border rounded-lg px-4 py-2">
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">Apply Filters</button>
          </aside>

          {/* Job Listings */}
          <main className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#01553d]">{job.title}</h3>
                  <div className="flex space-x-2 mt-2 mb-4">
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">{job.experienceLevel}</span>
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">{job.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="border border-2 border-[#01553d] text-[#01553d] px-4 py-2 rounded"
                    onClick={() => openModal("details", job)}
                  >
                    View Job Details
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => openModal("apply", job)}
                  >
                    Apply Here
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {modalContent === "details" ? "Job Details" : "Apply Here"}
              </h2>
              {modalContent === "details" && selectedJob && (
                <div>
                  <p className="text-gray-700 mb-4"><strong>Position:</strong> {selectedJob.title}</p>
                  <p className="text-gray-700 mb-4"><strong>Location:</strong> {selectedJob.location}</p>
                  <p className="text-gray-700 mb-4"><strong>Experience Level:</strong> {selectedJob.experienceLevel}</p>
                  <p className="text-gray-700 mb-4"><strong>Requirements:</strong> {selectedJob.requirements || "Not specified"}</p>
                </div>
              )}
              {modalContent === "apply" && (
                <div>
                  <p className="text-gray-700 mb-4">If you are qualified, please send your resume and cover letter to:</p>
                  <p className="text-blue-700 font-semibold">hr@example.com</p>
                </div>
              )}
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-6" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>

      <TextSection>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-4">
            Enquiries about recruitment?
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            We are here to help. Learn more about our recruitment process and find the right career opportunity for you.
          </p>
          <a
            href="/careers"
            className="px-6 py-3 bg-[#01553d] text-white transition duration-300"
          >
            Explore Careers
          </a>
        </div>
      </TextSection>

      <ParallaxSection imageUrl="/assets/img/small.webp" />

      <TextSection>
        <div className="flex flex-col items-center text-center p-8 bg-white">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-4">
            For further enquiries, send us a message
          </h2>
          <p className="text-gray-600 mb-6">
            We are always available to assist you with any questions. Reach out and we will get back to you shortly.
          </p>
          <button
            onClick={() => openModal("contact", null)}
            className="px-6 py-3 bg-[#01553d] text-white transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </TextSection>

      {isModalOpen && <ContactModal closeModal={closeModal} />}
    </>
  );
};

export default JobPage;
