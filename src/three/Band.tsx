import { extend, useFrame, useThree, type ThreeElements, type ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { badgeTexture, type HackathonBadgeInfo } from './badgeCanvas';
import { strapTexture } from './strapTexture';

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElements['mesh'];
    meshLineMaterial: ThreeElements['meshBasicMaterial'] & { lineWidth?: number; resolution?: [number, number]; useMap?: number; map?: THREE.Texture };
  }
}

const SEGMENTS = 10;
const ROPE_LENGTH = 2.6;
const SEGMENT_LENGTH = ROPE_LENGTH / SEGMENTS;
const GRAVITY = new THREE.Vector3(0, -2.4, 0);

class VerletPoint {
  pos: THREE.Vector3;
  prev: THREE.Vector3;
  pinned: boolean;
  constructor(pos: THREE.Vector3, pinned = false) { this.pos = pos.clone(); this.prev = pos.clone(); this.pinned = pinned; }
  integrate(delta: number) {
    if (this.pinned) return;
    const velocity = this.pos.clone().sub(this.prev).multiplyScalar(0.985);
    this.prev.copy(this.pos);
    this.pos.add(velocity).add(GRAVITY.clone().multiplyScalar(delta * delta));
  }
}

export interface BandProps {
  anchorX: number;
  variant: 'hackerrank' | 'cursor' | 'hackathon';
  holderName: string;
  cardLabel: string;
  accent: string;
  hackathon?: HackathonBadgeInfo;
}

export function Band({ anchorX, variant, holderName, cardLabel, accent, hackathon }: BandProps) {
  const { size, camera, gl } = useThree();
  const band = useRef<THREE.Mesh>(null);
  const cardGroup = useRef<THREE.Group>(null);
  const [dragging, setDragging] = useState(false);
  const texture = useMemo(() => badgeTexture(variant, holderName, hackathon), [variant, holderName, hackathon]);
  const strapMap = useMemo(() => strapTexture(hackathon?.event ?? cardLabel, accent), [cardLabel, accent, hackathon]);

  const anchorWorld = useMemo(() => new THREE.Vector3(anchorX, 2.3, 0), [anchorX]);
  const points = useMemo(() => {
    const pts: VerletPoint[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      pts.push(new VerletPoint(new THREE.Vector3(anchorX, anchorWorld.y - i * SEGMENT_LENGTH, 0), i === 0));
    }
    return pts;
  }, [anchorX, anchorWorld]);

  const curvePoints = useMemo(() => Array.from({ length: SEGMENTS + 1 }, () => new THREE.Vector3()), []);
  const geometryRef = useRef<InstanceType<typeof MeshLineGeometry>>(null);
  const dragTarget = useRef(new THREE.Vector3());
  const dragPlane = useMemo(() => new THREE.Plane(), []);
  const pointerVec = useMemo(() => new THREE.Vector2(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    points[0].pos.copy(anchorWorld);
    points[0].prev.copy(anchorWorld);
    const tail = points[points.length - 1];
    if (dragging) { tail.pos.copy(dragTarget.current); tail.prev.copy(dragTarget.current); }

    for (let i = 1; i < points.length; i++) points[i].integrate(delta);

    for (let iter = 0; iter < 10; iter++) {
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i], b = points[i + 1];
        const diff = b.pos.clone().sub(a.pos);
        const dist = diff.length() || 0.0001;
        const correction = diff.multiplyScalar((dist - SEGMENT_LENGTH) / dist * 0.5);
        if (!a.pinned) a.pos.add(correction);
        if (!b.pinned && !(dragging && b === tail)) b.pos.sub(correction);
      }
    }

    points.forEach((p, i) => curvePoints[i].copy(p.pos));
    geometryRef.current?.setPoints(curvePoints);

    if (cardGroup.current) {
      const end = points[points.length - 1].pos;
      const prevPt = points[points.length - 2].pos;
      cardGroup.current.position.copy(end);
      const dir = end.clone().sub(prevPt).normalize();
      const swing = Math.atan2(dir.x, -dir.y);
      cardGroup.current.rotation.set(0, 0, THREE.MathUtils.clamp(swing * 0.6, -0.9, 0.9));
    }
  });

  useEffect(() => {
    const dom = gl.domElement;
    const toNdc = (ev: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      pointerVec.set(((ev.clientX - rect.left) / rect.width) * 2 - 1, -((ev.clientY - rect.top) / rect.height) * 2 + 1);
    };
    const move = (ev: PointerEvent) => {
      if (!dragging) return;
      toNdc(ev);
      raycaster.setFromCamera(pointerVec, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(dragPlane, hit)) dragTarget.current.copy(hit);
    };
    const up = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [dragging, camera, gl, dragPlane, pointerVec, raycaster]);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const normal = camera.getWorldDirection(new THREE.Vector3()).negate();
    dragPlane.setFromNormalAndCoplanarPoint(normal, e.point);
    dragTarget.current.copy(e.point);
    setDragging(true);
  };

  return <>
    <mesh ref={band}>
      <meshLineGeometry ref={geometryRef} />
      <meshLineMaterial color="#ffffff" map={strapMap} useMap={1} lineWidth={0.1} resolution={[size.width, size.height]} transparent opacity={0.97} />
    </mesh>
    <group
      ref={cardGroup}
      onPointerDown={onPointerDown}
      onPointerOver={() => (document.body.style.cursor = 'grab')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.84, 1.16, 0.035]} />
        <meshPhysicalMaterial color="#111318" roughness={0.35} metalness={0.15} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.019]}>
        <planeGeometry args={[0.78, 1.08]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.63, 0]}>
        <circleGeometry args={[0.035, 24]} />
        <meshStandardMaterial color="#d8d8d8" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  </>;
}

export default Band;
