import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const PersonProfile = () => {
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const personRef = doc(db, "people", id);
        const personDoc = await getDoc(personRef);
        if (personDoc.exists()) {
          const data = personDoc.data();

          // Log specific fields for clarity
          console.log("Full data:", data);
          console.log("Experience data:", data.experience);
          console.log("Education data:", data.education);

          setPerson({
            id: personDoc.id,
            fullName: data.fullName || '',
            email: data.email || '',
            phoneNumber: data.phone || '',
            photoURL: data.photoURL || '/default-profile.png',
            position: data.position || '',
            practiceArea: data.practiceArea || [],
            experiences: data.experience || ['Example Experience 1', 'Example Experience 2'], // Temporary fallback
            education: data.education || ['Example Education 1', 'Example Education 2'], // Temporary fallback
          });
        } else {
          console.log("No such document!");
          setError("No person found.");
        }
      } catch (error) {
        console.error("Error fetching person data:", error);
        setError("Error fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-xl font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl font-semibold">{error}</p>;
  }

  if (!person) {
    return <p className="text-center text-xl font-semibold">No person found.</p>;
  }

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-8">
      <aside className="md:col-span-1 space-y-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <img
            src={person.photoURL}
            alt={person.fullName || "Profile Image"}
            className="w-full h-64 object-cover rounded-lg border-4 border-[#01553d] shadow-lg"
          />
        </div>
        <div className="text-left">
          <h1 className="text-3xl font-bold text-[#01553d]">{person.fullName}</h1>
          <p className="text-lg font-semibold text-gray-700 mt-1">{person.position}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-sm font-semibold text-gray uppercase tracking-wide">Practice Areas</h2>
          <div className="flex flex-col gap-2 mt-2">
            {person.practiceArea.length ? (
              person.practiceArea.map((area, index) => (
                <span key={index} className="py-1 text-md text-[#01553d] font-medium transition-colors">
                  {area}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No practice areas listed.</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-left text-sm text-gray-700 space-y-2">
          <div>
            <strong className="font-medium">Phone:</strong> <span>{person.phoneNumber || "N/A"}</span>
          </div>
          <div>
            <strong className="font-medium">Email:</strong> <span>{person.email || "N/A"}</span>
          </div>
        </div>
      </aside>

      <main className="md:col-span-4 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Recent Experiences</h2>
          {console.log("Rendering experiences:", person.experiences)} {/* Debugging log */}
          <div className="space-y-4 text-gray-700 mt-2">
            {Array.isArray(person.experiences) && person.experiences.length ? (
              person.experiences.map((experience, index) => (
                <p
                  key={index}
                  className="text-justify leading-relaxed bg-gray-50 p-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  {experience}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No experiences listed.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          {console.log("Rendering education:", person.education)} {/* Debugging log */}
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            {Array.isArray(person.education) && person.education.length ? (
              person.education.map((education, index) => (
                <li key={index} className="hover:text-[#01553d] transition-colors">
                  {education}
                </li>
              ))
            ) : (
              <li>No education records available.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default PersonProfile;
