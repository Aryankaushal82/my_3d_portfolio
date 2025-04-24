
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlbViewer from '../components/3d/GlbViewer'

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const codeBlocksRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && codeBlocksRef.current) {
      const blocks = codeBlocksRef.current.querySelectorAll('.code-block');
      
      blocks.forEach((block, index) => {
        gsap.fromTo(
          block,
          {
            opacity: 0,
            y: 50,
            rotateY: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15,
          }
        );
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 md:px-6 lg:px-8 relative" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black to-cyber-dark/80 z-[-1]"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-center font-orbitron mb-16 glow-text"
        >
          ABOUT.ME
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="cyber-panel p-6 max-h-[100vh]"
          >
            <h3 className="text-2xl font-orbitron mb-4 text-cyber-teal">SOFTWARE_DEVELOPER</h3>
            <p className="text-lg mb-4">
              Full-stack developer with expertise in MERN stack, Java, C++, R3F and JavaScript. 
              Passionate about creating efficient, scalable solutions and immersive user experiences.
            </p>
            <p className="text-lg mb-4">
              Currently working at Ikarus 3D, focused on developing 3D model Configurators.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-orbitron mb-3 text-cyber-purple">CORE_SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Java', 'C++', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 cyber-border bg-cyber-purple/10 text-white rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <GlbViewer/>
            </div>
          </motion.div>
          
          <div ref={codeBlocksRef} className="space-y-6">
            <div className="code-block cyber-panel p-4 transform perspective-800">
              <div className="flex justify-between items-center mb-2">
                <div className="text-cyber-purple font-mono">developer.js</div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="text-sm font-mono bg-cyber-black/50 p-3 rounded overflow-x-auto">
                <code className="language-javascript">
{`class Developer {
  constructor() {
    this.name = "ARYAN KAUSHAL";
    this.title = "Full-Stack Developer";
    this.skills = [
      "JavaScript", "TypeScript", 
      "React", "Node.js", "MongoDB",
      "Java", "C++", "AWS"
    ];
  }

  createSolution(problem) {
    return this.analyzeRequirements(problem)
      .then(this.developCode)
      .then(this.testSolution)
      .then(this.deploy);
  }
}`}
                </code>
              </pre>
            </div>
            
            <div className="code-block cyber-panel p-4 transform perspective-800">
              <div className="flex justify-between items-center mb-2">
                <div className="text-cyber-teal font-mono">projects.json</div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="text-sm font-mono bg-cyber-black/50 p-3 rounded overflow-x-auto">
                <code className="language-json">
{`{
  "projects": [
    {
      "name": "Profitex",
      "type": "Web Application",
      "tech": ["React", "Node.js", "MongoDB"],
      "description": "Financial analytics platform"
    },
    {
      "name": "Game Island",
      "type": "Game Development",
      "tech": ["Python", "Custom tkinter", "PyGame"],
      "description": "Immersive games experience"
    }
  ]
}`}
                </code>
              </pre>
            </div>
            
            <div className="code-block cyber-panel p-4 transform perspective-800">
              <div className="flex justify-between items-center mb-2">
                <div className="text-cyber-blue font-mono">experience.ts</div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="text-sm font-mono bg-cyber-black/50 p-3 rounded overflow-x-auto">
                <code className="language-typescript">
{`interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

const career: Experience[] = [
  {
    company: "Smartern Tech",
    role: "Senior Developer",
    period: "2023 - Present",
    achievements: [
      "Led team of 5 developers",
      "Implemented microservices architecture",
      "Reduced API response time by 40%"
    ]
  }
];

export default career;`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
