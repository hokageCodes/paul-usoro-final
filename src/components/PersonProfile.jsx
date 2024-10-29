// PersonProfile.js
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust the import based on your file structure
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const PersonProfile = () => {
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); // Using useParams to get the ID

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const personRef = doc(db, "people", id);
        const personDoc = await getDoc(personRef);
        if (personDoc.exists()) {
          setPerson({ id: personDoc.id, ...personDoc.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching person data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!person) {
    return <p>No person found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{person.fullName}</h1>
      <img src={person.photoURL} alt={person.fullName} className="w-full h-64 object-cover mt-4" />
      <p className="text-lg mt-2">{person.position}</p>
      <p className="text-sm text-gray-600 mt-1">
        {person.practiceArea.join(", ")}
      </p>
      <p className="mt-4">{person.bio}</p>
    </div>
  );
};

export default PersonProfile;
