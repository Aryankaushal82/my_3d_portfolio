
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Profitex",
    description: "Financial analytics platform with real-time data visualization and prediction algorithms.",
    image: "/images/project1.jpg", // This would be a fallback image
    tags: ["React", "Node.js", "MongoDB", "D3.js"],
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "Game Island",
    description: "Immersive 3D island explorer game with physics-based interactions and dynamic weather system.",
    image: "/images/project2.jpg", // This would be a fallback image
    tags: ["C++", "Unity", "WebGL", "Three.js"],
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "AI Assistant",
    description: "Natural language processing tool that helps developers write and debug code through conversational AI.",
    image: "/images/project3.jpg", // This would be a fallback image
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    link: "#",
    github: "#"
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
