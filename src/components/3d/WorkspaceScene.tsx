
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, PerspectiveCamera, Text3D, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/desk_setup.glb');

export function WorkspaceScene() {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  // Simulated model loading - in a real app you'd use a real 3D model
  const WorkspaceModel = () => {
    return (
      <group>
        {/* Desk */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Main Monitor */}
        <mesh ref={screenRef} position={[0, 0, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[2, 1.2, 0.05]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.2} />
          <Html transform position={[0, 0, 0.03]} scale={0.17} zIndexRange={[100, 0]}>
            <div className="w-[600px] h-[350px] bg-cyber-dark rounded-md p-4 border border-cyber-purple/40 overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="flex flex-col h-full justify-center items-center">
                <div className="text-4xl font-orbitron text-white mb-2 animate-text-glow">DEVELOPER_NAME</div>
                <div className="text-cyber-teal text-xl mb-6 tracking-wider">FULL-STACK DEVELOPER</div>
                <div className="border-t border-cyber-purple/30 w-36 mb-6"></div>
                <div className="text-sm text-white/80 mb-2">
                  MERN • JAVA • C++ • TYPESCRIPT
                </div>
                <div className="mt-6 flex space-x-4">
                  <button className="px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/40 rounded hover:bg-cyber-purple/30 hover:shadow-[0_0_10px_rgba(139,92,246,0.4)] transition-all">PROJECTS</button>
                  <button className="px-3 py-1 bg-cyber-teal/20 border border-cyber-teal/40 rounded hover:bg-cyber-teal/30 hover:shadow-[0_0_10px_rgba(15,160,206,0.4)] transition-all">CONTACT</button>
                </div>
              </div>
            </div>
          </Html>
        </mesh>
        
        {/* Side Monitor Left */}
        <mesh position={[-1.5, 0, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.9, 0.05]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.2} />
          <Html transform position={[0, 0, 0.03]} scale={0.12} zIndexRange={[100, 0]}>
            <div className="w-[500px] h-[350px] bg-cyber-dark rounded-md p-4 border border-cyber-pink/40 overflow-hidden shadow-[0_0_15px_rgba(217,70,239,0.3)]">
              <div className="font-mono text-sm text-green-400 h-full overflow-hidden">
                <div>$ whoami</div>
                <div>developer</div>
                <div>$ ls -la projects/</div>
                <div className="text-white">
                  <div>drwxr-xr-x  5 dev  staff  160 Apr  1 2025 project-one</div>
                  <div>drwxr-xr-x  8 dev  staff  256 Apr  2 2025 project-two</div>
                  <div>drwxr-xr-x  6 dev  staff  192 Apr  3 2025 project-three</div>
                </div>
                <div>$ cat skills.txt</div>
                <div className="text-cyber-teal">
                  React.js, Node.js, MongoDB, Express, TypeScript, Java, C++, Python, Docker, AWS
                </div>
                <div>$ _</div>
              </div>
            </div>
          </Html>
        </mesh>
        
        {/* Side Monitor Right */}
        <mesh position={[1.5, 0, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.9, 0.05]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.2} />
          <Html transform position={[0, 0, 0.03]} scale={0.12} zIndexRange={[100, 0]}>
            <div className="w-[500px] h-[350px] bg-cyber-dark rounded-md p-4 border border-cyber-blue/40 overflow-hidden shadow-[0_0_15px_rgba(30,174,219,0.3)]">
              <div className="flex flex-col h-full justify-center items-center text-white/80">
                <div className="text-xl font-orbitron mb-4">EXPERIENCE</div>
                <div className="space-y-3 w-full">
                  <div className="cyber-panel text-sm">
                    <div className="text-cyber-blue font-bold">Senior Developer</div>
                    <div className="text-xs text-white/60">Smartern Tech • 2023 - Present</div>
                  </div>
                  <div className="cyber-panel text-sm">
                    <div className="text-cyber-blue font-bold">Full-Stack Developer</div>
                    <div className="text-xs text-white/60">Tech Solutions Inc • 2020 - 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </Html>
        </mesh>
        
        {/* Keyboard */}
        <mesh position={[0, -0.9, 0.25]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.05, 0.6]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Mouse */}
        <mesh position={[1.2, -0.9, 0.25]} castShadow receiveShadow>
          <capsuleGeometry args={[0.05, 0.15, 5, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Floating orbs for decoration */}
        <Float speed={2} rotationIntensity={0.5}>
          <mesh position={[2.5, 0.5, 0.5]} castShadow>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial 
              color="#9B87F5" 
              emissive="#9B87F5"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.3}>
          <mesh position={[-2.5, 0.8, 0.3]} castShadow>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial 
              color="#0FA0CE" 
              emissive="#0FA0CE"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        </Float>
      </group>
    );
  };

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Subtle rotation following mouse
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
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
      <Environment preset="city" />
      
      <ambientLight intensity={0.5} />
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
        intensity={0.5} 
        color="#9B87F5" 
        castShadow 
      />

      {/* Main group that will animate */}
      <group ref={groupRef}>
        <WorkspaceModel />
      </group>
      
      {/* Ground reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Background particles */}
      <Particles />
    </>
  );
}

// Simple particles effect for the background
function Particles({ count = 200 }) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  
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
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}
