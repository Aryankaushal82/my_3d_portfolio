
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandLine, setCommandLine] = useState('');
  
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Terminal text animation
  const terminalLines = [
    "Initializing contact module...",
    "Establishing secure connection...",
    "Ready to receive message...",
    "----------------------------",
    "Enter your details below:",
  ];
  
  useEffect(() => {
    if (terminalRef.current) {
      gsap.fromTo(
        terminalRef.current,
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
            trigger: terminalRef.current,
            start: "top bottom-=150",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending message
    setCommandLine("Sending message...");
    
    // After a delay, show success and reset form
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! I'll get back to you soon.",
      });
      
      setCommandLine("Message sent successfully! Type a new message to continue...");
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 md:px-6 lg:px-8 relative" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 to-cyber-black z-[-1]"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-center font-orbitron mb-16 glow-text"
        >
          CONTACT.terminal()
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="cyber-panel p-6"
          >
            <h3 className="text-2xl font-orbitron mb-6 text-cyber-teal">CONNECTION_DETAILS</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Location</h4>
                <p className="text-white/80">New York, NY</p>
              </div>
              
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Email</h4>
                <a href="mailto:contact@example.com" className="text-white/80 hover:text-cyber-teal transition-colors">contact@example.com</a>
              </div>
              
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Social Networks</h4>
                <div className="flex space-x-4">
                  <a href="#" className="py-2 px-4 bg-cyber-dark border border-cyber-purple/30 hover:border-cyber-purple/70 rounded transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="py-2 px-4 bg-cyber-dark border border-cyber-teal/30 hover:border-cyber-teal/70 rounded transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="py-2 px-4 bg-cyber-dark border border-cyber-blue/30 hover:border-cyber-blue/70 rounded transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-cyber-purple font-orbitron text-lg mb-2">Resume</h4>
                <a href="#" className="inline-block py-2 px-6 bg-cyber-purple/20 border border-cyber-purple/50 hover:bg-cyber-purple/30 rounded transition-colors">
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
          
          <div ref={terminalRef} className="cyber-panel p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4 bg-cyber-black/80 p-2 rounded">
              <div className="text-cyber-purple font-mono text-sm">contact_terminal.sh</div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="bg-cyber-black/80 p-4 rounded h-[400px] terminal-screen font-mono text-sm overflow-y-auto">
              {/* Terminal Lines */}
              {terminalLines.map((line, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                  className={`mb-2 ${index < 3 ? 'text-green-400' : 'text-white'}`}
                >
                  {index === 0 ? '> ' : index < 4 ? '$ ' : '# '}{line}
                </motion.div>
              ))}
              
              {/* Contact Form as Terminal Input */}
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                  <div className="flex">
                    <span className="text-cyber-pink mr-2">$</span>
                    <span className="text-cyber-teal mr-2">name:</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      className="flex-1 bg-transparent border-none outline-none text-white"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex">
                    <span className="text-cyber-pink mr-2">$</span>
                    <span className="text-cyber-teal mr-2">email:</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      className="flex-1 bg-transparent border-none outline-none text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex">
                    <span className="text-cyber-pink mr-2">$</span>
                    <span className="text-cyber-teal mr-2">message:</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      className="flex-1 bg-transparent border-none outline-none text-white"
                      placeholder="Type your message here"
                      rows={4}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2 items-center">
                  <span className="text-cyber-pink mr-2">$</span>
                  <button 
                    type="submit"
                    className="py-2 px-4 bg-cyber-purple/20 border border-cyber-purple/50 hover:bg-cyber-purple/40 rounded transition-colors"
                  >
                    submit_message
                  </button>
                  <span 
                    className={`${isTyping ? 'opacity-100' : 'opacity-0'} inline-block w-2 h-4 bg-white ml-1 animate-pulse transition-opacity`}
                  ></span>
                </div>
                
                {commandLine && (
                  <div className="mt-4">
                    <span className="text-cyber-teal mr-2">&gt;</span>
                    <span className="text-green-400">{commandLine}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
