import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi'; // React Icons arrow

const practiceAreas = [
  {
    title: "Adr & Advocacy",
    description:
      "PUC lawyers in the AADR Practice group are highly respected for their deep knowledge and strategic thinking in the handling of complex commercial disputes, and are regular speakers on burning issues relating to dispute resolution, at different fora.",
    image: "/assets/img/adr.jpg",
    link: "/expertise/adr-and-advocacy",
  },
  {
    title: "Transportation Law",
    description:
      "The transport industry is significant in the emergence and sustenance of an efficient economy and market growth. This realisation is driving the multi-billion dollar public and private-sector led investments in the transport sector in Nigeria, across Africa and other emerging markets.",
    image: "/assets/img/road.jpg",
    link: "/expertise/transportation-law",
  },
  {
    title: "Banking and Finance",
    description:
      "PUC routinely advise on, and act for clients in transactions and disputes relating to banking and finance law and practices, as well banking regulatory matters. Our clients recognise our expertise in adroitly navigating complex transactions, and rely on us to provide the vital legal and regulatory support needed to consummate their multifarious transactions. In recent times, we have worked with several Nigerian banks through the process of banking sector reforms and restructuring that commenced in 2005, and have continued up till date.",
    image: "/assets/img/banking.jpg",
    link: "/expertise/banking-and-finance",
  },
  {
    title: "Capital Market",
    description:
      "Our Capital Market practice team possess sound capital markets experience to help major corporate bodies, federal and state governments and financial institutions access - or offer - funding in innovative ways. The firm is registered with the Securities and Exchange Commission (“SEC”) and a good number of members of the team are registered as Sponsored Individuals and/or Compliance Officers.",
    image: "/assets/img/capital.jpg",
    link: "/expertise/capital-market-law",
  },
  {
    title: "Communications Law",
    description:
      "Our wealth of experience in the communications sector extends beyond its telecommunications arm, and encompasses the other two arms of broadcasting and information technology. We provide advisory, advocacy, and transactional services to an array of local and international clients cutting across the public and private sectors. Our knowledge of the regulatory practices, systems and environment has come to bear in the effective solutions we proffer to our clients in the pursuit of their business objectives.",
    image: "/assets/img/comms.jpg",
    link: "/expertise/communication-law",
  },
  {
    title: "Energy and Environment",
    description:
      "Our deep knowledge and experience in energy and environmental law and practice, and mastery of the complex regulatory landscapes in these dynamic fields explains our ease and efficiency in guiding our clients through the regulatory hurdles, supporting their transactional activities, and enabling their businesses operate effectively.",
    image: "/assets/img/energy.jpg",
    link: "/expertise/energy-and-environmental-law",
  },
];

export default function OurPracticeAreas() {
  const [hoveredArea, setHoveredArea] = useState(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative px-4 md:px-10 md:py-32 mx-auto max-w-7xl">
      {/* Heading Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <motion.h2 className="text-4xl md:text-5xl font-black text-[#01553d] relative" variants={itemVariants}>
          Our Practice Areas
          <span className="absolute -left-5 -top-3 inline-block h-10 w-10 bg-orange-500 rounded-full opacity-70"></span>
        </motion.h2>
        <motion.div className="mt-4 md:mt-6" variants={itemVariants}>
          <a href="/expertise" className="flex items-center gap-2 text-xl font-medium text-[#01553d] underline">
            VIEW ALL PRACTICE AREAS <FiArrowRight />
          </a>
        </motion.div>
      </motion.div>

      {/* Practice Areas */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {practiceAreas.map((area, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col md:flex-row justify-between items-start md:items-center border-b py-6 cursor-pointer group"
            onMouseEnter={() => setHoveredArea(index)}
            onMouseLeave={() => setHoveredArea(null)}
            variants={itemVariants}
          >
            {/* Title (Clickable with underline) */}
            <div className="md:w-3/4 w-full mb-2 md:mb-0">
              <a
                href={area.link}
                className="text-3xl md:text-6xl font-semibold text-[#01553d] group-hover:text-[#013d2e] underline-offset-4 hover:underline transition-colors duration-300"
              >
                {area.title}
              </a>
            </div>

            {/* Description */}
            <div className="md:w-3/4 w-full flex justify-between items-center md:items-start">
              <p className="text-gray-600 text-xl">{area.description}</p>

              {/* Hovered Image (Visible on hover) */}
              {hoveredArea === index && (
                <motion.img
                  src={area.image}
                  alt={area.title}
                  className="hidden md:block w-32 h-32 object-cover rounded-lg shadow-lg pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
