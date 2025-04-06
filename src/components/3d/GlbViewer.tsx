import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

// Model component that loads and displays the GLB
const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  
  // Clone the scene to avoid issues when unmounting
  const clone = React.useMemo(() => scene.clone(), [scene]);
  
  return <primitive object={clone} scale={1.5} position={[0, -1, 0]} />;
};

// Main component that will be used in your portfolio
const GlbViewer = () => {
  const [modelUrl, setModelUrl] = useState('/models/lost_programmer.glb');



  // Clean up object URLs when component unmounts or URL changes
  useEffect(() => {
    return () => {
      if (modelUrl && modelUrl.startsWith('blob:')) {
        URL.revokeObjectURL(modelUrl);
      }
    };
  }, [modelUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      viewport={{ once: true }}
      className="cyber-panel p-6 my-8"
    >
      
      {/* Canvas for the 3D model */}
      <div className="w-full h-64 md:h-96 bg-black/30 cyber-border mb-4">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            {modelUrl && <Model url={modelUrl} />}
            <Environment preset="city" />
          </Suspense>
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default GlbViewer;