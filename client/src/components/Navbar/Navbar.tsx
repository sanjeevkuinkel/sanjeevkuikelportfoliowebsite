// src/components/Navbar/Navbar.tsx
import React from "react";
import { NavbarProps } from "../../types";

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/50 backdrop-blur-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Sanjeev Kuikel
        </h1>
        <ul className="flex space-x-8">
          {["Home", "About Me", "My Projects", "Skills", "Contact"].map(
            (item) => {
              const sectionId = item.toLowerCase().replace(" ", "");
              return (
                <li
                  key={item}
                  className={`text-gray-300 hover:text-blue-400 cursor-pointer ${
                    activeSection === sectionId ? "text-blue-400" : ""
                  }`}
                  onClick={() => handleSectionClick(sectionId)}
                >
                  {item}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;