import React from "react";
import image from "../images/img.jpg"; // Import the image

const AboutMe = () => {
  return (
    <section
      id="aboutme"
      className="h-screen flex flex-col justify-center items-center bg-gray-950 text-white"
    >
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        About Me
      </h2>
      <div className="flex flex-col md:flex-row items-center mt-8">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-600">
          <img
            src={image} // Use the imported image
            alt="Your Name"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xl mt-4 md:mt-0 md:ml-8 text-gray-300 max-w-2xl text-center md:text-left">
          I am a passionate Full-Stack Developer specializing in the MERN stack.
          I love building scalable and user-friendly web applications. With a
          strong foundation in JavaScript, React, Node.js, and MongoDB, I bring
          ideas to life through clean and efficient code.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
