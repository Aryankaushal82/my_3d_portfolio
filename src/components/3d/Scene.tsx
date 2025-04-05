
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WorkspaceScene } from './WorkspaceScene';
import { OrbitControls, Stats } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function Scene() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full h-screen"
    >
      <Canvas shadows>
        <Suspense fallback={null}>
          <WorkspaceScene />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
        {/* <Stats /> */} {/* Uncomment for development */}
      </Canvas>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/60 text-sm z-10">
        <p>Scroll to explore</p>
        <div className="mx-auto mt-2 w-6 h-10 border-2 border-white/30 rounded-full relative">
          <motion.div 
            className="absolute left-1/2 top-1 w-2 h-2 bg-cyber-purple rounded-full transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
