"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Track the scroll progress
  const { scrollYProgress } = useScroll();

  // Animate the image scale and opacity on scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-[95vh] py-10 md:py-20 lg:py-32">
      <div className="container mx-auto flex h-full flex-col items-center justify-center px-5 md:flex-row md:justify-between gap-4">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 lg:w-2/5"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block text-left">
            {/* Big Heading with highlight */}
            <motion.h1
              className="text-6xl font-bold leading-tight text-[#01553d] md:text-6xl lg:text-8xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative">
                Paul Usoro & Co
                <span className="absolute -left-3 -top-1 inline-block h-10 w-10 bg-orange-500 rounded-full opacity-70"></span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              className="mt-2 text-4xl font-light leading-snug text-[#01553d]/80 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Legal Practitioners
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="mt-4 text-xl leading-relaxed text-gray-600 lg:mt-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
              className="mt-6 flex flex-col md:flex-row space-x-0 md:space-x-4 md:space-y-0 space-y-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a href="/contact" className="px-6 py-3 text-xl text-white bg-[#01553d] rounded-full hover:bg-[#014432] transition-colors">
                Contact us
              </a>
              
              <a href="/expertise" className="px-6 py-3 text-xl text-[#01553d] border border-[#01553d] rounded-full hover:bg-[#01553d] hover:text-white transition-colors">
                Our practice areas
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Section with scroll-based animations */}
        <motion.div
          className="mt-8 w-full md:mt-0 md:w-1/2 lg:w-3/5 hidden md:block" // Hide on mobile
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <div className="relative h-full w-full">
            {!imageLoaded && <Skeleton height={500} />}
            <img
              src="/assets/img/who-we-are.jpg"
              alt="Leadership Coaching"
              className="rounded-lg shadow-lg object-cover w-full h-[500px] transition-opacity"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
