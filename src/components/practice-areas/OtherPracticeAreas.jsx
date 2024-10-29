/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const practiceAreas = [
  { title: "Adr & Advocacy", image: "/assets/img/adr.webp", link: "/expertise/adr-and-advocacy" },
  { title: "Transportation Law", image: "/assets/img/road.webp", link: "/expertise/transportation-law" },
  { title: "Banking and Finance", image: "/assets/img/banking.webp", link: "/expertise/banking-and-finance" },
  { title: "Capital Market", image: "/assets/img/capital.webp", link: "/expertise/capital-market-law" },
  { title: "Communications Law", image: "/assets/img/comms.webp", link: "/expertise/communication-law" },
  { title: "Energy and Environmental Law", image: "/assets/img/energy.webp", link: "/expertise/energy-and-environmental-law" },
  { title: "General Practice", image: "/assets/img/gen.jpg", link: "/expertise/general-commercial-practice" },
  { title: "Labour", image: "/assets/img/labour.jpg", link: "/expertise/labour-and-industrial-relations" },
  { title: "Maritime", image: "/assets/img/maritime.jpg", link: "/expertise/maritime" },
  { title: "Mergers and Acquisitions", image: "/assets/img/mergers.webp", link: "/expertise/corporate-restructuring,-mergers-and-acquisitions  " },
  { title: "Aviation", image: "/assets/img/aviation.jpg", link: "/expertise/aviation" },
  { title: "Project Finance", image: "/assets/img/pro-finance.jpg", link: "/expertise/project-finance" },
];

export default function OtherPracticeAreas({ currentTitle }) {
  const [filteredAreas, setFilteredAreas] = useState([]);

  // Filter practice areas excluding the one with the current title
  useEffect(() => {
    const otherAreas = practiceAreas.filter(area => area.title !== currentTitle);
    setFilteredAreas(otherAreas);
  }, [currentTitle]);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>

      <div className="px-4 md:px-10 py-16 mx-auto max-w-7xl">
        <motion.h2
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-black text-[#01553d] mb-6"
        >
          Explore Other Practice Areas
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {filteredAreas.map((area, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <a href={area.link} className="block group">
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-[#01553d] group-hover:text-[#013d2e]">
                    {area.title}
                  </h3>
                  <div className="mt-2 flex items-center text-lg text-[#01553d] font-medium group-hover:underline">
                    Learn More <FiArrowRight className="ml-2" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
