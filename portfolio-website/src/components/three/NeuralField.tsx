/* eslint-disable react/no-unknown-property -- react-three-fiber scene-graph JSX props (args, attach, transparent, …) are not DOM properties */
import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 280;
const MAX_LINK_DISTANCE = 2.4;
const MAX_LINKS_PER_NODE = 3;
const PULSE_COUNT = 18;
const ACCENT = new THREE.Color("#E8553A");
const CREAM = new THREE.Color("#F5F0EB");
const MUTED = new THREE.Color("#6B6B70");

interface Network {
  positions: Float32Array;
  colors: Float32Array;
  linePositions: Float32Array;
  edges: [number, number][];
}

// Distribute nodes in a flattened ellipsoid and link near neighbors,
// approximating the look of a layered neural network without a rigid grid.
function buildNetwork(): Network {
  const positions = new Float32Array(NODE_COUNT * 3);
  const colors = new Float32Array(NODE_COUNT * 3);
  const rng = mulberry32(42);

  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = rng() * Math.PI * 2;
    const r = Math.sqrt(rng());
    positions[i * 3] = Math.cos(theta) * r * 8.5;
    positions[i * 3 + 1] = (rng() - 0.5) * 7;
    positions[i * 3 + 2] = Math.sin(theta) * r * 4 - 1;

    const color = rng() < 0.14 ? ACCENT : rng() < 0.5 ? CREAM : MUTED;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const edges: [number, number][] = [];
  const degree = new Array(NODE_COUNT).fill(0);
  for (let i = 0; i < NODE_COUNT; i++) {
    if (degree[i] >= MAX_LINKS_PER_NODE) continue;
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (degree[i] >= MAX_LINKS_PER_NODE) break;
      if (degree[j] >= MAX_LINKS_PER_NODE) continue;
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < MAX_LINK_DISTANCE * MAX_LINK_DISTANCE) {
        edges.push([i, j]);
        degree[i]++;
        degree[j]++;
      }
    }
  }

  const linePositions = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], k) => {
    linePositions.set(positions.subarray(a * 3, a * 3 + 3), k * 6);
    linePositions.set(positions.subarray(b * 3, b * 3 + 3), k * 6 + 3);
  });

  return { positions, colors, linePositions, edges };
}

// Deterministic PRNG so the constellation is identical on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeGlowSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function Pulses({ network, sprite }: { network: Network; sprite: THREE.Texture }) {
  const ref = useRef<THREE.Points>(null);
  const pulses = useMemo(() => {
    const rng = mulberry32(7);
    return Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(rng() * network.edges.length),
      t: rng(),
      speed: 0.25 + rng() * 0.5,
    }));
  }, [network]);
  const buffer = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    pulses.forEach((pulse, i) => {
      pulse.t += delta * pulse.speed;
      if (pulse.t > 1) {
        pulse.t = 0;
        pulse.edge = Math.floor(Math.random() * network.edges.length);
      }
      const [a, b] = network.edges[pulse.edge];
      // Ease the travel so pulses accelerate out of a node and settle into the next
      const t = pulse.t * pulse.t * (3 - 2 * pulse.t);
      for (let axis = 0; axis < 3; axis++) {
        buffer[i * 3 + axis] =
          network.positions[a * 3 + axis] +
          (network.positions[b * 3 + axis] - network.positions[a * 3 + axis]) * t;
      }
    });
    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffer, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color={ACCENT}
        size={0.34}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const network = useMemo(buildNetwork, []);
  const sprite = useMemo(makeGlowSprite, []);

  // Canvas has pointer-events disabled (it is decorative), so track the
  // cursor on the window for parallax instead of via R3F events.
  useEffect(() => {
    if (!animate) return;
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [animate]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.04;
    const targetX = pointer.current.y * 0.12;
    const targetZ = pointer.current.x * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.rotation.z += (targetZ - g.rotation.z) * 0.04;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
  });

  return (
    <group ref={group} rotation={[0.1, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[network.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[network.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          vertexColors
          size={0.16}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[network.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={CREAM}
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {animate && <Pulses network={network} sprite={sprite} />}
    </group>
  );
}

interface NeuralFieldProps {
  animate?: boolean;
}

const NeuralField = ({ animate = true }: NeuralFieldProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      dpr={[1, 2]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene animate={animate} />
    </Canvas>
  );
};

export default NeuralField;
