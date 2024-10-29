/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Adjust the import based on your file structure
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

export default function PeoplePage() {
    const [people, setPeople] = useState([]);
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetching data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const peopleCollection = collection(db, "people");
                const peopleSnapshot = await getDocs(peopleCollection);
                const peopleList = peopleSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPeople(peopleList);
                setFilteredPeople(peopleList);
            } catch (error) {
                console.error("Error fetching people data:", error);
            }
        };

        fetchData();
    }, []);

    // Handle delete operation with confirmation
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this person?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "people", id));
                setPeople((prev) => prev.filter((person) => person.id !== id));
                setFilteredPeople((prev) => prev.filter((person) => person.id !== id));
            } catch (error) {
                console.error("Error deleting person:", error);
            }
        }
    };

    // Handle search filter
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = people.filter((person) =>
            person.fullName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPeople(filtered);
        setCurrentPage(1); // Reset to first page
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredPeople.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen font-sans p-6">
            {/* Add New Button */}
            <div className="text-right my-4">
                <a href="/admin/upload/people">
                    <button className="bg-[#01553d] text-white text-lg px-12 py-4">
                        Add New
                    </button>
                </a>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01553d]"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {/* Table */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 border-b">Photo</th>
                        <th className="px-4 py-2 border-b">Full Name</th>
                        <th className="px-4 py-2 border-b">Position</th>
                        <th className="px-4 py-2 border-b">Practice Areas</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((person) => (
                            <tr key={person.id}>
                                <td className="px-4 py-2 border-b">
                                    <img src={person.photoURL} alt={person.fullName} className="w-16 h-16 object-cover rounded-full" />
                                </td>
                                <td className="px-4 py-2 border-b">{person.fullName}</td>
                                <td className="px-4 py-2 border-b">{person.position}</td>
                                <td className="px-4 py-2 border-b">
                                    <div className="max-w-xs flex flex-wrap">
                                        {person.practiceArea.map((area, index) => (
                                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleDelete(person.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center my-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-[#01553d] text-white px-4 py-2 rounded-md disabled:opacity-50 mr-2"
                >
                    Previous
                </button>
                <span className="mx-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-[#01553d] text-white px-4 py-2 rounded-md disabled:opacity-50 ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
