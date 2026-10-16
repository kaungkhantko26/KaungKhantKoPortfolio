import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Suspense } from 'react';
import { Band, type BandProps } from './Band';

export type LanyardBadge = Omit<BandProps, 'anchorX'>;

function Rig({ badges }: { badges: LanyardBadge[] }) {
  const spread = 1.1;
  const start = -((badges.length - 1) * spread) / 2;
  return <>{badges.map((b, i) => <Band key={b.cardLabel} {...b} anchorX={start + i * spread} />)}</>;
}

export function Lanyard({ badges }: { badges: LanyardBadge[] }) {
  const camZ = badges.length > 2 ? 7.2 : 5.4;
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.4, camZ], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} castShadow />
      <Suspense fallback={null}>
        <Rig badges={badges} />
        <Environment resolution={256}>
          <group rotation={[0, 0, Math.PI / 4]}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} scale={[10, 1, 1]} />
            <Lightformer intensity={1} color="#8ba3bd" position={[-3, 2, 1]} scale={[4, 1, 1]} rotation={[0, 0, Math.PI / 3]} />
            <Lightformer intensity={1} color="#f8c900" position={[3, 2, 1]} scale={[4, 1, 1]} rotation={[0, 0, -Math.PI / 3]} />
          </group>
        </Environment>
      </Suspense>
    </Canvas>
  );
}

export default Lanyard;
