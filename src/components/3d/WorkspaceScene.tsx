
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera, Environment, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

export function WorkspaceModel({ name = "Aryan Kaushal", title = "FULL-STACK DEVELOPER" }) {
  const groupRef = useRef();
  const monitorRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Mouse movement effect
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Rotation following mouse position
      const mouseX = state.mouse.x * 0.1;
      const mouseY = state.mouse.y * 0.1;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX,
        0.05
      );
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY,
        0.05
      );
    }
    
    // Monitor screen pulsing glow effect
    if (monitorRef.current && hovered) {
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      monitorRef.current.material.emissiveIntensity = intensity;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={45} />
      <Environment preset="city" />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.4} 
        penumbra={0.5} 
        intensity={1} 
        castShadow 
        shadow-mapSize={2048} 
      />
      <spotLight 
        position={[-5, 5, 5]} 
        angle={0.4} 
        penumbra={0.5} 
        intensity={0.6} 
        color="#4F46E5" 
        castShadow 
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#10B981" />

      {/* Main scene group - will animate as one unit */}
      <group 
        ref={groupRef} 
        position={[0, 0, 0]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Desk */}
        <mesh position={[0, -1, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.2, 0.1, 1.5]} />
          <meshStandardMaterial color="#1F2937" metalness={0.6} roughness={0.2} />
        </mesh>
        
        {/* Main monitor */}
        <group position={[0, 0, -0.4]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.3, 0.08]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.2} />
          </mesh>
          
          {/* Monitor screen */}
          <mesh 
            ref={monitorRef} 
            position={[0, 0, 0.05]} 
            castShadow 
            receiveShadow
          >
            <planeGeometry args={[2, 1.1]} />
            <meshStandardMaterial 
              color="#0F172A" 
              emissive="#4F46E5" 
              emissiveIntensity={hovered ? 0.5 : 0.2}
              metalness={0.9} 
              roughness={0.2} 
            />
            
            {/* Screen content */}
            <Html transform position={[0, 0, 0.02]} scale={0.17} zIndexRange={[100, 0]}>
              <div className="w-[600px] h-[350px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-md p-4 overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-white mb-2 tracking-wider animate-pulse">{name}</div>
                <div className="text-emerald-400 text-xl mb-6 tracking-widest">{title}</div>
                <div className="border-t border-indigo-500/30 w-36 mb-6"></div>
                <div className="text-sm text-white/80 mb-4 tracking-wide">
                  REACT • NODE • JAVASCRIPT • JAVA • REACT THREE FIBER
                </div>
                <div className="mt-6 flex space-x-4">
                  <button className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/40 rounded hover:bg-indigo-500/30 transition-all">PORTFOLIO</button>
                  <button className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded hover:bg-emerald-500/30 transition-all">CONTACT</button>
                </div>
              </div>
            </Html>
          </mesh>
          
          {/* Monitor stand */}
          <mesh position={[0, -0.8, 0]} castShadow>
            <boxGeometry args={[0.2, 0.3, 0.2]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.95, 0.1]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.4]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
        
        {/* Left side monitor */}
        <group position={[-1.5, -0.1, 0]} rotation={[0, Math.PI / 5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.9, 0.08]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.2} />
          </mesh>
          
          <mesh position={[0, 0, 0.05]} castShadow>
            <planeGeometry args={[1.1, 0.8]} />
            <meshStandardMaterial 
              color="#0F172A" 
              emissive="#10B981" 
              emissiveIntensity={0.2}
              metalness={0.9} 
              roughness={0.2} 
            />
            
            <Html transform position={[0, 0, 0.01]} scale={0.12} zIndexRange={[100, 0]}>
              <div className="w-[500px] h-[350px] bg-slate-900 rounded-md p-4 overflow-hidden font-mono">
                <div className="text-green-500 text-sm h-full overflow-hidden">
                  <div>$ whoami</div>
                  <div className="text-white mb-2">developer</div>
                  <div>$ ls -la projects/</div>
                  <div className="text-white mb-2">
                    <div>drwxr-xr-x 5  21 years old</div>
                    <div>drwxr-xr-x 8 Jalandhar, Punjab</div>
                    <div>drwxr-xr-x 6 +917888593684</div>
                  </div>
                  <div>$ cat skills.txt</div>
                  <div className="text-emerald-400 mb-2">
                    React, Node.js, JavaScript, JAVA, RESTAPI, AWS
                  </div>
                  <div className="animate-pulse">$ _</div>
                </div>
              </div>
            </Html>
          </mesh>
          
          <mesh position={[0, -0.6, 0]} castShadow>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.75, 0.1]} castShadow>
            <boxGeometry args={[0.3, 0.06, 0.3]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
        
        {/* Right side monitor */}
        <group position={[1.5, -0.1, 0]} rotation={[0, -Math.PI / 5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.9, 0.08]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.2} />
          </mesh>
          
          <mesh position={[0, 0, 0.05]} castShadow>
            <planeGeometry args={[1.1, 0.8]} />
            <meshStandardMaterial 
              color="#0F172A" 
              emissive="#60A5FA" 
              emissiveIntensity={0.2}
              metalness={0.9} 
              roughness={0.2} 
            />
            
            <Html transform position={[0, 0, 0.01]} scale={0.12} zIndexRange={[100, 0]}>
              <div className="w-[500px] h-[350px] bg-slate-900 rounded-md p-4 overflow-hidden">
                <div className="flex flex-col h-full justify-center items-center text-white/90">
                  <div className="text-xl font-bold mb-4 tracking-wide">EXPERIENCE</div>
                  <div className="space-y-4 w-full">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
                      <div className="text-blue-400 font-bold">Software Developer Intern</div>
                      <div className="text-xs text-white/60">Ikarus 3D • 2025 - Present</div>
                      <div className="text-xs mt-1 text-white/70">Working on 3d models and configurators</div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
                      <div className="text-blue-400 font-bold">Web Developer</div>
                      <div className="text-xs text-white/60">SmarternTech • Nov 2024 - Jan 2025</div>
                      <div className="text-xs mt-1 text-white/70">Building scalable enterprise applications</div>
                    </div>    
                  </div>
                </div>
              </div>
            </Html>
          </mesh>
          
          <mesh position={[0, -0.6, 0]} castShadow>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.75, 0.1]} castShadow>
            <boxGeometry args={[0.3, 0.06, 0.3]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
        
        {/* Keyboard */}
        <mesh position={[0, -0.92, 0.3]} castShadow>
          <boxGeometry args={[1.8, 0.05, 0.6]} />
          <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.2} />
        </mesh>
        
        {/* Additional keyboard details */}
        <mesh position={[0, -0.89, 0.3]} castShadow>
          <boxGeometry args={[1.75, 0.02, 0.55]} />
          <meshStandardMaterial 
            color="#1E293B" 
            emissive="#4ADE80" 
            emissiveIntensity={0.2} 
            metalness={0.5} 
            roughness={0.3} 
          />
        </mesh>
        
        {/* Mouse */}
        <mesh position={[1.2, -0.92, 0.3]} castShadow>
          <capsuleGeometry args={[0.05, 0.15, 5, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial 
            color="#111827" 
            emissive="#4F46E5" 
            emissiveIntensity={0.2} 
            metalness={0.6} 
            roughness={0.2} 
          />
        </mesh>
        
        {/* Coffee Cup */}
        <group position={[-1.3, -0.85, 0.4]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.2, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.1} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.1} roughness={0.8} />
          </mesh>
          <mesh position={[0.12, -0.05, 0]} castShadow>
            <torusGeometry args={[0.04, 0.015, 16, 16, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.1} roughness={0.8} />
          </mesh>
        </group>
      </group>
      
      {/* Floating orbs for decoration */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[2.2, 0.6, 0.4]} castShadow>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial 
            color="#4F46E5" 
            emissive="#4F46E5"
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-2.2, 0.8, 0.2]} castShadow>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial 
            color="#10B981" 
            emissive="#10B981"
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[0, 1.5, -1]} castShadow>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            emissive="#60A5FA"
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
      </Float>
      
      {/* Ground reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#0F172A" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Background particles */}
      <ParticleField />
    </>
  );
}

// Background particle field for added depth
function ParticleField({ count = 150 }) {
  const pointsRef = useRef();
  
  // Generate random particle positions
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    
    // Random colors between blue, purple and teal
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i * 3] = 0.3;
      colors[i * 3 + 1] = 0.2;
      colors[i * 3 + 2] = 1.0;
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.8;
      colors[i * 3 + 1] = 0.2;
      colors[i * 3 + 2] = 0.8;
    } else {
      colors[i * 3] = 0.2;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 0.8;
    }
    
    // Random sizes
    sizes[i] = Math.random() * 0.1 + 0.03;
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default WorkspaceModel;