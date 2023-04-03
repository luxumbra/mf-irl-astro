import { useCallback } from 'react';
import { Particles } from 'react-particles';
import type { Container, Engine, IOptions } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import './confetti.css';
// const root = ReactDOM.createRoot(document.querySelector('#root'))

const Confetti = (config: any) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={config}
    />
  );
};

export default Confetti;
