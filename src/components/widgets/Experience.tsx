/* eslint-disable react/no-unknown-property */
import React, { Suspense, useCallback, useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Sparkles, Center, PerspectiveCamera } from '@react-three/drei';
import { Camera, Mesh } from 'three';
import * as THREE from 'three';
// import gsap from 'gsap';
import LoadingOrError from './LoadingOrError';

export interface SceneSectionProps {
  name: string;
  count: number;
  children: React.ReactNode;
  props?: any;
  config: Record<string, any>;
}

export function R3FSceneSection({ name, count, config, children, ...props }: SceneSectionProps) {
  const group = useRef(null);
  const { objectsDistance } = config;

  return (
    <group ref={group} name={name} position={[0, -objectsDistance * count, 0]} {...props}>
      {children}
    </group>
  );
}

function Experience() {
  const mesh = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const sparkleColor = new THREE.Color(0x1f8975);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const scrollY = useRef(0);
  const sizes = useRef({ width: 0, height: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const mousePos = useRef(new THREE.Vector2());
  const mouse = new THREE.Vector2();
  const plant1 = useRef<Mesh>(null);
  const camera = useRef(Camera);
  const cameraGroup = useRef();
  const clock = new THREE.Clock();
  let previousTime = 0;
  const currentSection = useRef(0);

  const experienceConfig = useMemo(
    () => ({
      objectsDistance: 4,
      sparkles: {
        size: 10,
        count: 300,
        scale: new THREE.Vector3(30, 40, 40),
        positionY: 1,
        speed: 0.2,
      },
    }),
    []
  );
  const { objectsDistance, sparkles } = experienceConfig;

  const resizeHandler = useCallback(() => {
    sizes.current.width = window.innerWidth;
    sizes.current.height = window.innerHeight;
  }, []);

  const scrollHandler = useCallback(() => {
    scrollY.current = window.scrollY;

    const newSection = Math.round(scrollY.current / sizes.current.height);
    if (newSection !== currentSection.current) {
      currentSection.current = newSection;
    }
  }, []);

  const mousemoveHandler = useCallback((event) => {
    cursor.current.x = event.clientX / sizes.current.width - 0.3;
    cursor.current.y = -(event.clientY / sizes.current.height) - 0.3;

    mousePos.current.x = (event.clientX / sizes.current.width) * 2 - 1;
    mousePos.current.y = -(event.clientY / sizes.current.height) * 2 - 1;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial sizes based on the display
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Set initial scroll position
      scrollY.current = window.scrollY;

      window.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);
      window.addEventListener('mousemove', mousemoveHandler);
    }

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mousemoveHandler);
    };
  }, [scrollHandler, resizeHandler, mousemoveHandler]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = cursor.current.y * 0.5;

    if (camera.current && cameraGroup.current) {
      camera.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
      cameraGroup.current.position.x += (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime;
      cameraGroup.current.position.y += (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime;
    }
  });

  return (
    <>
      <Suspense fallback={<LoadingOrError message="Loading atmosphere..." />}>
        <group ref={cameraGroup}>
          <PerspectiveCamera
            ref={camera}
            makeDefault
            aspect={sizes.current.width / sizes.current.height}
            position={[0, 0, 0]}
            far={400}
            filmGauge={53}
          />
        </group>

        <R3FSceneSection name="SectionOne" config={experienceConfig} count={0}>
          <directionalLight position={[1, 2, 3]} intensity={1.5} />
          <ambientLight intensity={0.5} />
          <Sparkles
            size={sparkles.size}
            count={sparkles.count}
            scale={sparkles.scale}
            position-y={sparkles.positionY}
            speed={sparkles.speed}
            color={sparkleColor}
          />
        </R3FSceneSection>
      </Suspense>
    </>
  );
}

export default Experience;
