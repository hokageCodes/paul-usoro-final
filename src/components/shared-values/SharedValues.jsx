/* eslint-disable react/prop-types */
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ValueCard = ({ title, description, index, isInView }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full mb-10 sm:mb-0 sm:w-1/2"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.3 }}
      role="article" // Accessibility
    >
      <div className="relative h-full">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#01553d] rounded-lg"></span>
        <div className="relative h-full p-5 bg-white border-2 border-[#01553d] rounded-lg">
          <h3 className="my-2 ml-3 text-2xl md:text-3xl font-bold">{title}</h3>
          <p className="mb-2 text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function SharedValues() {
  const values = [
    {
      title: "TEAMWORK",
      description:
        "Fostering collaboration, mutual respect, and shared success within our dynamic and innovative law firm.",
    },
    {
      title: "INTEGRITY",
      description:
        "Integrity is fundamental. It guides our ethical conduct, actions, and commitment to transparency within our law firm.",
    },
    {
      title: "MASTERY",
      description:
        "Mastery is paramount, driving our pursuit of excellence, continuous learning, and expertise in delivering exceptional legal services and counsel.",
    },
    {
      title: "EXCELLENCE",
      description:
        "Excellence defines us, inspiring our relentless pursuit of quality, innovation, and client satisfaction in every aspect of our practice.",
    },
    {
      title: "ENTREPRENEURIAL ORIENTATION",
      description:
        "By embracing an entrepreneurial spirit, we foster a culture of innovation, risk-taking, and initiative, empowering our team to pioneer new solutions and drive transformative change in the legal industry.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div
      ref={ref}
      className="container relative flex flex-col justify-between h-full max-w-7xl px-4 mx-auto xl:px-0 mt-5"
    >
      <h2 className="mb-6 text-4xl md:text-5xl font-extrabold leading-tight text-[#01553d]">
        Our Shared Values
        <span className="absolute -left-3 -top-1 inline-block h-10 w-10 bg-orange-500 rounded-full opacity-70"></span>
      </h2>
      <div className="w-full">
        <div className="flex flex-col w-full gap-8 mb-10 sm:flex-row">
          {values.slice(0, 2).map((value, index) => (
            <ValueCard key={index} {...value} index={index} isInView={isInView} />
          ))}
        </div>
        <div className="flex flex-col w-full mb-5 sm:flex-row gap-8">
          {values.slice(2).map((value, index) => (
            <ValueCard key={index + 2} {...value} index={index + 2} isInView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
}
