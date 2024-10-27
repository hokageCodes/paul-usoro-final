/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Dummy Data for Staff Members
const peopleData = [
  {
    name: "John Doe",
    position: "Senior Partner",
    practiceArea: "Banking and Finance, Corporate Law",
    image: "/assets/img/john.jpg",
    bioLink: "/staff/john-doe",
  },
  {
    name: "Jane Smith",
    position: "Managing Partner",
    practiceArea: "Transportation Law, Maritime Law",
    image: "/assets/img/jane.jpg",
    bioLink: "/staff/jane-smith",
  },
  {
    name: "Robert Johnson",
    position: "Partner",
    practiceArea: "ADR & Advocacy, Dispute Resolution",
    image: "/assets/img/robert.jpg",
    bioLink: "/staff/robert-johnson",
  },
  {
    name: "Emily Brown",
    position: "Managing Associate",
    practiceArea: "Capital Market, Investments, Finance",
    image: "/assets/img/emily.jpg",
    bioLink: "/staff/emily-brown",
  },
  {
    name: "Michael Green",
    position: "Associate",
    practiceArea: "Communications Law, Environmental Law",
    image: "/assets/img/michael.jpg",
    bioLink: "/staff/michael-green",
  },
];

const practiceAreas = [
  "ADR & Advocacy",
  "Transportation Law",
  "Banking and Finance",
  "Capital Market",
  "Communications Law",
  "Energy and Environment",
];

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  // Simulate fetching data and loading state
  useEffect(() => {
    setTimeout(() => {
      setFilteredPeople(peopleData);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter logic
  const filterPeople = () => {
    return peopleData.filter((person) => {
      const matchesSearch = person.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPosition = positionFilter
        ? person.position === positionFilter
        : true;
      const matchesArea = areaFilter
        ? person.practiceArea.includes(areaFilter)
        : true;
      return matchesSearch && matchesPosition && matchesArea;
    });
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="bg-[#01553d] text-white text-center py-12 px-6">
        <h1 className="text-3xl md:text-5xl font-bold">Meet the Team</h1>
        <p className="mt-4 text-lg">
          Our professionals specialize in delivering top-notch legal services
          across various areas of practice.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <input
            type="text"
            placeholder="Search by Name"
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01553d]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01553d]"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">All Positions</option>
            <option value="Senior Partner">Senior Partner</option>
            <option value="Managing Partner">Managing Partner</option>
            <option value="Partner">Partner</option>
            <option value="Managing Associate">Managing Associate</option>
            <option value="Associate">Associate</option>
          </select>
          <select
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01553d]"
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
          >
            <option value="">All Practice Areas</option>
            {practiceAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* People Cards or Skeleton Loaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array(8) // Render skeletons while loading
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <Skeleton height={224} className="rounded-t-lg" />
                    <div className="mt-4">
                      <Skeleton height={24} width="60%" />
                      <Skeleton height={16} width="80%" className="mt-2" />
                      <Skeleton height={14} width="90%" className="mt-1" />
                    </div>
                  </div>
                ))
            : filterPeople().map((person) => (
                <a
                  href={person.bioLink}
                  key={person.name}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-[#3F2E3E]">
                      {person.name}
                    </h3>
                    <p className="text-md text-gray-600 mt-1">
                      {person.position}
                    </p>
                    <p className="text-sm text-[#7F5283] mt-1">
                      {person.practiceArea}
                    </p>
                    <span className="mt-4 block text-[#01553d] underline">
                      View Profile
                    </span>
                  </div>
                </a>
              ))}
        </div>

        {/* No Results Message */}
        {!isLoading && filterPeople().length === 0 && (
          <p className="text-center text-gray-500 mt-12">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default PeoplePage;
