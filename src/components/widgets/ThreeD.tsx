// import { Canvas } from '@react-three/fiber';
import { lazy } from 'react';
const Canvas = lazy(() => import('@react-three/fiber').then((mod) => ({ default: mod.Canvas })));
const Experience = lazy(() => import('~/components/widgets/Experience'));

const ThreeD = () => (
  <div className="canvas-wrapper fixed top-0 left-0 w-screen h-full z-[2] pointer-events-none">
    <Canvas className="fixed top-0 left-0 w-screen h-full pointer-events-none bg-secondary-dark">
      <Experience />
    </Canvas>
  </div>
);

export default ThreeD;
