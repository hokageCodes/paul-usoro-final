import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import practiceAreas from '../../../practiceAreas';
import AOS from 'aos';
import 'aos/dist/aos.css';

const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ExpertiseCards = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="">
      <div className="container mx-auto px-5 py-10">
        <h2 className="text-4xl sm:text-5xl md:text-center font-bold text-[#01553d] mb-8" data-aos="fade-in">
          Our Practice Areas
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
        >
          {practiceAreas.map((area, index) => (
            <motion.div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg" variants={childVariants}>
              <Link to={`/expertise/${area.title.replace(/ /g, '-').toLowerCase()}`}>
                <img
                  src={area.imageSrc}
                  alt={area.title}
                  className="object-cover rounded-t-lg w-full h-48"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{area.title}</h3>
                <Link to={`/expertise/${area.title.replace(/ /g, '-').toLowerCase()}`} className="text-[#01553d] font-semibold hover:underline">
                  See More
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertiseCards;
