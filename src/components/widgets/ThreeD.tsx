import { Canvas } from '@react-three/fiber';
import { lazy } from 'react';
const Experience = lazy(() => import('~/components/widgets/Experience'));

// const root = ReactDOM.createRoot(document.querySelector('#root'))

const ThreeD = () => {
  // const isMobile = /iPhone|iPad|iPo/d|Android/i.test(navigator.userAgent)

  return (
    <div className="fixed top-0 left-0 w-screen h-full z-[2] pointer-events-none">
      <Canvas
        className='w-full h-full pointer-events-none'
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default ThreeD;