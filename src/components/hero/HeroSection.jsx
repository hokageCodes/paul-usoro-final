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
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      className="relative h-[80vh] md:h-[95vh] py-2"
      aria-label="Paul Usoro & Co - Legal Practice"
    >
      <div className="container mx-auto flex flex-col-reverse items-center justify-center px-6 md:flex-row md:justify-between gap-8">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <header>
            <motion.h1
              className="text-4xl font-bold leading-tight text-[#01553d] md:text-5xl lg:text-7xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative">
                Paul Usoro & Co
                <span className="absolute -left-3 -top-1 h-10 w-10 bg-orange-500 rounded-full opacity-70"></span>
              </span>
            </motion.h1>

            <motion.h2
              className="mt-2 text-2xl font-light text-[#01553d]/80 md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Legal Practitioners
            </motion.h2>

            <motion.p
              className="mt-4 hidden md:block text-md text-gray-600 lg:text-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </motion.p>
          </header>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="/contact"
              className="px-6 py-3 text-white bg-[#01553d] rounded-full hover:bg-[#014432] transition-colors text-xl"
            >
              Contact Us
            </a>
            <a
              href="/expertise"
              className="px-6 py-3 text-[#01553d] border border-[#01553d] rounded-full hover:bg-[#01553d] hover:text-white transition-colors text-xl"
            >
              Our Practice Areas
            </a>
          </motion.div>
        </motion.div>

        {/* Image Section with scroll-based animations */}
        <motion.div
          className="w-full md:w-1/2 lg:w-3/5"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            {!imageLoaded && <Skeleton height="100%" />}
            <img
              src="/assets/img/who-we-are.webp"
              alt="Leadership Coaching"
              className="rounded-lg shadow-lg object-cover w-full h-full transition-opacity duration-500"
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
