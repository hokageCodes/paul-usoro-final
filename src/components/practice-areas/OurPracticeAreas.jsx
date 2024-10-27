import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi'; // React Icons arrow

const practiceAreas = [
  {
    title: "ADR & Advocacy",
    description:
      "PUC lawyers are highly respected for their strategic thinking in handling complex commercial disputes and are regular speakers at dispute resolution forums.",
    link: "/expertise/adr-and-advocacy",
  },
  {
    title: "Transportation Law",
    description:
      "The transport sector is driving multi-billion-dollar public and private investments across Africa, boosting economic efficiency and market growth.",
    link: "/expertise/transportation-law",
  },
  {
    title: "Banking & Finance",
    description:
      "PUC advises clients on transactions, disputes, and regulatory matters, helping navigate complex banking reforms since 2005.",
    link: "/expertise/banking-and-finance",
  },
  {
    title: "Capital Market",
    description:
      "Our team helps governments and corporations access innovative funding solutions and comply with SEC regulations.",
    link: "/expertise/capital-market-law",
  },
  {
    title: "Communications Law",
    description:
      "We provide advisory services across telecommunications, broadcasting, and IT sectors, leveraging regulatory expertise.",
    link: "/expertise/communication-law",
  },
  {
    title: "Energy & Environment",
    description:
      "We guide clients through regulatory challenges in energy and environmental sectors, supporting efficient business operations.",
    link: "/expertise/energy-and-environmental-law",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OurPracticeAreas() {
  return (
    <div className="relative px-4 md:px-10 md:py-32 mx-auto max-w-7xl">
      {/* Heading Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }} // Trigger animation as soon as visible
        transition={{ staggerChildren: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-black text-[#01553d] relative"
          variants={itemVariants}
        >
          Our Practice Areas
          <span className="absolute -left-5 -top-3 h-10 w-10 bg-orange-500 rounded-full opacity-70"></span>
        </motion.h2>
        <motion.div className="mt-4 md:mt-0" variants={itemVariants}>
          <a
            href="/expertise"
            className="flex items-center gap-2 text-xl font-medium text-[#01553d] underline"
          >
            VIEW ALL PRACTICE AREAS <FiArrowRight />
          </a>
        </motion.div>
      </motion.div>

      {/* Practice Areas List */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }} // Ensure early trigger
        transition={{ staggerChildren: 0.2 }}
      >
        {practiceAreas.map((area, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col md:flex-row justify-between items-start md:items-center border-b py-6 group"
            variants={itemVariants}
          >
            {/* Title */}
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
