// src/components/Hero/Hero.tsx
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const name = "Sanjeev Kuikel";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center bg-gray-950 text-white relative overflow-hidden"
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, rgba(30, 58, 138, 0.2), transparent",
            "radial-gradient(circle at 90% 80%, rgba(107, 33, 168, 0.2), transparent",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Glassmorphism Card */}
      <motion.div
        className="bg-gray-900/20 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8 shadow-2xl relative z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Name */}
        <motion.h1
          className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-2xl mt-4 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          Full-Stack Developer | MERN Stack Developer
        </motion.p>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            onClick={() => scrollToSection("myprojects")}
          >
            View My Work
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Circles */}
      <motion.div
        className="absolute w-32 h-32 bg-purple-600/20 rounded-full -top-16 -left-16 z-10"
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-blue-600/20 rounded-full -bottom-24 -right-24 z-10"
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default Hero;
