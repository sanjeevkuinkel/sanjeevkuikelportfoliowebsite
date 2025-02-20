// src/components/Skills/Skills.tsx
import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Git",
    "REST APIs",
    "GraphQL",
    "Docker",
    "AWS",
    "Firebase",
  ];

  return (
    <section
      id="skills"
      className="h-screen flex flex-col justify-center items-center bg-gray-950 text-white"
    >
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Skills
      </h2>
      <div className="mt-8 w-full max-w-4xl">
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-800/50 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
