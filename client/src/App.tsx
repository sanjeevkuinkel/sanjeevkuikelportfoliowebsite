// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  Hero,
  AboutMe,
  MyProjects,
  Skills,
  Contact,
  Navbar,
  Footer,
} from "../src/components";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Reset scroll position to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Hero />
      <AboutMe />
      <MyProjects />
      <Skills />
      <Contact />
      <Footer   />
    </div>
  );
};

export default App;
