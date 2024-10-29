/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "../../firebase"; // Ensure correct Firebase config for Vite
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleCollection = collection(db, "people");
        const peopleSnapshot = await getDocs(
          query(peopleCollection, orderBy("createdAt", "asc"))
        );
        const peopleList = peopleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPeople(peopleList);
      } catch (error) {
        console.error("Error fetching people data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering logic
  const filterPeople = () => {
    return people.filter((person) => {
      const matchesSearch = person.fullName
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
            ? Array(8)
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
                  href={`/staff/${person.fullName
                    .replace(/\s+/g, '-')
                    .toLowerCase()}`}
                  key={person.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={person.photoURL}
                    alt={person.fullName}
                    className="w-84 h-84 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                  <div className="mt-4 p-2 pl-4">
                    <h3 className="text-3xl font-bold text-[#01553d]">
                      {person.fullName}
                    </h3>
                    <p className="text-lg text-gray-600 mt-1">
                      {person.position}
                    </p>
                    <p className="text-sm text-[#01553d] mt-1">
                      {person.practiceArea.join(", ")}
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
