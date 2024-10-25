"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  // Track the scroll progress
  const { scrollYProgress } = useScroll();

  // Adjust ranges for the About section animations
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]); // Zoom in earlier
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]); // Fade in earlier

  return (
    <motion.div
      className="relative bg-white py-16 px-5 lg:px-20 text-lg sm:text-lg"
      id="about-us"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Content */}
          <motion.div
            className="w-full lg:w-1/2"
            style={{ scale, opacity }} // Apply scale and opacity based on scroll
          >
            <motion.img
              src="/assets/img/who-we-are.jpg"
              alt="About Us"
              className="rounded-lg shadow-2xl object-cover w-full h-[400px] transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-textPrimary space-y-6 relative">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-[#01553d]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Who We Are
              <span className="absolute -left-5 -top-3 inline-block h-10 w-10 bg-orange-500 rounded-full opacity-70"></span>
            </motion.h2>
            <motion.p
              className="text-xl leading-relaxed text-gray-600 lg:mt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Paul Usoro & Co. (PUC) is a leading full-service law firm,
              providing top-notch legal services to both local and international
              clients. We hold our clients in high esteem, providing them with
              sound legal advice and innovative business solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="/expertise" className="px-6 py-3 text-xl text-[#01553d] border border-[#01553d] rounded-full hover:bg-[#01553d] hover:text-white transition-colors">
                Our practice areas
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
