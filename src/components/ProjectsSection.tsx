
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Profitex",
    description: "Comprehensive billing solution with inventory management, dynamic invoicing, user roles, and multi-branch support.",
    image: "/images/projec1.png",
    tags: ["MERN", "Node.js", "MongoDB", "Express", "React"],
    link: "https://profitex-iota.vercel.app/",
    github: "https://github.com/aryan138/ChaltaCode"
  },
  {
    id: 2,
    title: "Game Island",
    description: " Engineered an interactive mental exercise game, Game Island, using Python, Tkinter, and Pygame, aimed at enhancing cognitive skills through engaging gameplay",
    image: "/images/project2.png",
    tags: ["python","customTkinter"],
    link: "#",
    github: "https://github.com/Aryankaushal82/Game-Island"
  },
  {
    id: 3,
    title: "Product Configurator",
    description: "3D model configurator for a customizable product, allowing users to visualize and personalize their choices in real-time.",
    image: "/images/project3.png",
    tags: ["React", "React-Three-Fiber", "GSAP", "Model-viewer"],
    link: "https://magnificent-naiad-bb37c7.netlify.app/",
    github: "https://github.com/Aryankaushal82/configurator-v2"
  },
  {
    id: 4,
    title: "Lucky Spinner",
    description: "spinning game with a customizable wheel, allowing users to add their own options and spin to win.",
    image: "/images/project4.png",
    tags: ["React", "MongoDB", "Express", "Node.js"],
    link: "https://cute-lokum-097684.netlify.app/",
    github: "https://github.com/Aryankaushal82/luckySpinner.js"
  }
];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (sectionRef.current) {
      const panels = projectsRef.current.filter(Boolean);
      
      panels.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom-=150",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          }
        );
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 md:px-6 lg:px-8 relative" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 to-cyber-black z-[-1]"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-center font-orbitron mb-16 glow-text"
        >
          PROJECTS.map()
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectsRef.current[index] = el}
              className="cyber-panel h-[400px] group flex flex-col overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 to-cyber-teal/10 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-teal/20 to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Project Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-2xl font-orbitron mb-3 text-cyber-teal group-hover:text-cyber-purple transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-cyber-black/30 border border-cyber-purple/30 rounded text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-white/80 mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="mt-auto flex justify-between">
                  <a href={project.github} className="px-4 py-2 text-sm cyber-border hover:bg-cyber-purple/20 transition-colors duration-300">
                    SOURCE
                  </a>
                  <a href={project.link} className="px-4 py-2 text-sm bg-cyber-purple/20 cyber-border hover:bg-cyber-purple/40 transition-colors duration-300">
                    LAUNCH
                  </a>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyber-purple/40 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyber-teal/40 opacity-50"></div>
              
              {/* Interactive Elements */}
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br from-cyber-purple/0 to-cyber-purple/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
