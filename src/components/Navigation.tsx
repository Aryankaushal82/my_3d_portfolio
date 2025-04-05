
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"];
      const currentPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop && 
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-purple/20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={() => scrollToSection("home")}
                className="font-orbitron text-xl font-bold text-white hover:text-cyber-purple transition-colors"
              >
                DEV<span className="text-cyber-purple">CODER</span>
              </a>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {["home", "about", "projects", "skills", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  className={`text-sm uppercase font-semibold tracking-wider hover:text-cyber-purple transition-colors relative ${
                    activeSection === item ? "text-cyber-purple" : "text-white/70"
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-purple"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center p-2 rounded-md text-white hover:text-cyber-purple focus:outline-none"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? "rotate-45 translate-y-2.5" : "translate-y-1"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? "opacity-0" : "translate-y-3"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? "-rotate-45 translate-y-2.5" : "translate-y-5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-cyber-black/95 backdrop-blur-md border-b border-cyber-purple/20 md:hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {["home", "about", "projects", "skills", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  className={`block py-2 px-3 text-base uppercase font-semibold ${
                    activeSection === item
                      ? "text-cyber-purple bg-cyber-purple/10 rounded border-l-2 border-cyber-purple pl-4"
                      : "text-white/70"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
