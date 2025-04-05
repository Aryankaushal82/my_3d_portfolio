
import { useEffect, useRef } from "react";
import Scene from "@/components/3d/Scene";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a cursor trailer effect
    const cursor = document.createElement("div");
    cursor.className = "fixed w-6 h-6 rounded-full pointer-events-none z-50 hidden md:block";
    cursor.style.background = "radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(139, 92, 246, 0) 70%)";
    cursor.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(cursor);

    const updateCursorPosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursor.style.boxShadow = "0 0 15px 5px rgba(139, 92, 246, 0.3)";
    };

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-cyber-black text-white">
      <Navigation />
      
      {/* Hero Section with 3D Scene */}
      <section id="home" className="h-screen w-full relative">
        <Scene />
      </section>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-6 border-t border-cyber-purple/20 bg-cyber-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} DEVELOPER_NAME. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-1">
            Built with React, Three.js, GSAP and ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
