import React from "react";
import { motion } from "framer-motion";
import img from "../images/ecommerce.png"; // Ensure correct path

// Define the Project type
interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const MyProjects = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [projects, setProjects] = React.useState<Project[]>([]);

  // Simulate fetching data from an API
  React.useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (!isMounted) return;

      setProjects([
        {
          title: "E-Commerce Platform",
          description:
            "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
          image: img, // Use the imported image
          link: "https://github.com/sanjeevkuinkel/shopOnly",
        },
        {
          title: "Portfolio Website",
          description:
            "A responsive portfolio website built with React and Tailwind CSS.",
          image: "https://placehold.co/400x200", // Placeholder for testing
          link: "https://example.com/portfolio",
        },
        {
          title: "Task Management App",
          description:
            "A task management app built with React, Firebase, and Material-UI.",
          image: "https://placehold.co/400x200", // Placeholder for testing
          link: "https://example.com/task-manager",
        },
      ]);
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, []);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="h-48 bg-gray-700 rounded-lg animate-pulse"></div>
      <div className="mt-4 h-6 bg-gray-700 rounded-lg animate-pulse"></div>
      <div className="mt-2 h-4 bg-gray-700 rounded-lg animate-pulse"></div>
      <div className="mt-4 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
    </div>
  );

  // Image Component with Fallback
  const ProjectImage = ({ project }: { project: Project }) => {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
      return (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-300 text-sm px-4 text-center">
            {project.title} Preview Not Available
          </span>
        </div>
      );
    }

    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className="w-full h-48 object-cover"
        onError={() => setHasError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <div className="relative w-full bg-gray-950">
      <section
        id="myprojects"
        className="min-h-screen w-full flex flex-col items-center py-16 bg-gray-950 text-white"
      >
        <div className="w-full max-w-6xl px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent inline-block">
              My Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? [...Array(3)].map((_, index) => <SkeletonLoader key={index} />)
              : projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <ProjectImage project={project} />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-gray-300">
                        {project.description}
                      </p>
                      <button
                        onClick={() =>
                          window.open(
                            project.link,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        View Project
                      </button>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProjects;
