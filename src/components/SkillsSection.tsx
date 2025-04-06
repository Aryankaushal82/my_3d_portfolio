
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Language" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "Express", level: 85, category: "Backend" },
  { name: "Java", level: 75, category: "Language" },
  { name: "C++", level: 70, category: "Language" },
  { name: "AWS", level: 65, category: "DevOps" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "GraphQL", level: 70, category: "API" },
  { name: "Redux", level: 80, category: "Frontend" },
  { name: "TailwindCSS", level: 90, category: "Frontend" },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (sectionRef.current && orbitsRef.current) {
      // Animate the orbits container
      gsap.fromTo(
        orbitsRef.current,
        { 
          scale: 0.5, 
          opacity: 0,
          rotation: 0 
        },
        { 
          scale: 1,
          opacity: 1,
          rotation: 360,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: orbitsRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );
      
      // Animate individual skill items
      skillsRef.current.filter(Boolean).forEach((skill, index) => {
        gsap.fromTo(
          skill,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              toggleActions: "play none none reverse",
            },
            delay: 0.05 * index,
          }
        );
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 md:px-6 lg:px-8 flex items-center relative" id="skills">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black to-cyber-dark/80 z-[-1]"></div>
      
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-center font-orbitron mb-16 glow-text"
        >
          SKILLS.orbit()
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div ref={orbitsRef} className="relative h-[500px] w-full">
              {/* Center core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyber-dark border-2 border-cyber-purple animate-pulse-glow flex items-center justify-center">
                <div className="text-center">
                  <div className="font-orbitron text-cyber-purple text-xl animate-text-glow">CORE</div>
                  <div className="text-white/70 text-xs">SKILLS</div>
                </div>
              </div>
              
              {/* Orbits */}
              {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-cyber-purple/20 animate-rotate-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-cyber-teal/20 animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-cyber-blue/20 animate-rotate-slow"></div> */}
              
              {/* Skill orbs */}
              {skills.slice(0, 10).map((skill, index) => {
                // Calculate position on different orbits
                const angle = (index * (2 * Math.PI / 10)) - Math.PI/2;
                const orbitSize = index % 3 === 0 ? 225 : (index % 3 === 1 ? 175 : 125);
                const x = Math.cos(angle) * orbitSize;
                const y = Math.sin(angle) * orbitSize;
                
                return (
                  <motion.div
                    ref={el => skillsRef.current[index] = el}
                    key={skill.name}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                    style={{ 
                      marginLeft: x, 
                      marginTop: y,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-full h-full rounded-full bg-cyber-dark/80 border border-cyber-purple/30 hover:border-cyber-purple flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="text-center p-1">
                        <div className="text-white text-sm font-semibold">{skill.name}</div>
                        <div className="text-cyber-purple text-xs">{skill.level}%</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="cyber-panel p-6">
            <h3 className="text-2xl font-orbitron mb-6 text-cyber-teal">TECH_STACK</h3>
            
            <div className="space-y-4">
              {/* Frontend */}
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Frontend</h4>
                <div className="space-y-2">
                  {skills.filter(s => s.category === "Frontend").map((skill, index) => (
                    <div key={skill.name} className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-cyber-teal">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-cyber-dark/50 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-teal" 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Backend */}
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Backend</h4>
                <div className="space-y-2">
                  {skills.filter(s => s.category === "Backend").map((skill, index) => (
                    <div key={skill.name} className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-cyber-teal">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-cyber-dark/50 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-teal" 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Languages */}
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Languages</h4>
                <div className="space-y-2">
                  {skills.filter(s => s.category === "Language").map((skill, index) => (
                    <div key={skill.name} className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-cyber-teal">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-cyber-dark/50 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-teal" 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


