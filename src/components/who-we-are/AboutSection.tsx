"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  const { scrollYProgress } = useScroll();

  // Adjusting the scale and opacity effects
  const scale = useTransform(scrollYProgress, [0.05, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section
      className="relative bg-white py-16 px-5 sm:px-10 lg:px-20 text-lg"
      id="about-us"
      aria-labelledby="leading law firm Nigeria" // Accessibility
    >
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }} // Trigger ASAP
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/assets/img/who-we-are.webp"
              alt="A team of legal professionals at Paul Usoro & Co"
              className="rounded-lg shadow-xl object-cover w-full h-[300px] sm:h-[400px] lg:h-[500px] transition-all"
              style={{ opacity: 0.95 }} // Less opaque for better clarity
              loading="lazy"
            />
          </motion.div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.h2
              id="About Paul Usoro" // Ensure a heading ID for accessibility
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01553d] relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6 }}
            >
              Who We Are
              <span className="absolute -left-5 -top-4 h-10 w-10 bg-orange-500 rounded-full opacity-80"></span>
            </motion.h2>

            <motion.p
              className="text-xl leading-relaxed text-gray-600 lg:mt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Paul Usoro & Co. (PUC) is a leading full-service law firm offering unparalleled legal services to local and international clients. Our goal is to provide practical business solutions and innovative legal strategies.
            </motion.p>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="/expertise"
                className="px-6 py-3 text-xl text-[#01553d] border border-[#01553d] rounded-full hover:bg-[#01553d] hover:text-white transition-colors"
                title="Explore our practice areas"
                aria-label="Paul Usoro Expertise Page" // Accessibility
              >
                Our Practice Areas
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
