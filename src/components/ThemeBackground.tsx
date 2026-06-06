import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface Ring {
  radius: number;
  opacity: number;
  maxRadius: number;
}

interface Electron {
  orbitIndex: number;
  angle: number;
  speed: number;
  size: number;
}

interface Orbital {
  x: number;
  y: number;
  electrons: Electron[];
  rotation: number;
  rotationSpeed: number;
}

interface Star {
  x: number;
  y: number;
  index: number;
}

const PARTICLE_COUNT = 150;
const ORBITAL_COUNT = 12;
const STAR_COUNT = 70;

export default function ThemeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const nodes: Node[] = [];
    const rings: Ring[] = [];
    const orbitals: Orbital[] = [];
    const stars: Star[] = [];
    let ringCounter = 0;
    const isMobile = window.innerWidth < 768;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();

      // Initialize consciousness network nodes
      const nodeCount = isMobile ? 80 : PARTICLE_COUNT;
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        });
      }

      // Initialize stars
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          index: i,
        });
      }

      // Initialize atomic orbitals
      const orbitalCount = isMobile ? 6 : ORBITAL_COUNT;
      orbitals.length = 0;
      for (let i = 0; i < orbitalCount; i++) {
        const electronCount = 2 + Math.floor(Math.random() * 2);
        const electrons: Electron[] = [];
        for (let j = 0; j < electronCount; j++) {
          electrons.push({
            orbitIndex: j,
            angle: Math.random() * Math.PI * 2,
            speed: 0.001 + Math.random() * 0.002,
            size: 3,
          });
        }
        orbitals.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.8 + height * 0.1,
          electrons,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: 0.0002 * (i % 2 === 0 ? 1 : -1),
        });
      }

    }

    // Layer 1: Cosmic Intelligence Field
    function drawCosmicField() {
      const colors = [
        [124, 92, 255],
        [75, 0, 130],
        [0, 229, 255],
        [124, 92, 255],
        [75, 0, 130],
        [0, 229, 255],
      ];

      for (let i = 0; i < colors.length; i++) {
        const [r, g, b] = colors[i];
        const x = width * 0.5 + Math.sin(time * 0.0003 + i) * width * 0.4;
        const y = height * 0.5 + Math.sin(time * 0.0002 + i * 1.5) * height * 0.3;
        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, 350);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, width, height);
      }

      // Twinkling stars
      for (const star of stars) {
        const brightness = Math.sin(time * 0.002 + star.index) * 0.5 + 0.5;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${brightness * 0.6})`;
        ctx!.fill();
      }
    }

    // Layer 2: Consciousness Network
    function drawConsciousnessNetwork() {
      const connectionThreshold = time > 1200 ? 200 : 150;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionThreshold) {
            const opacity = (1 - dist / connectionThreshold) * 0.3;
            ctx!.beginPath();
            ctx!.moveTo(node.x, node.y);
            ctx!.lineTo(other.x, other.y);
            ctx!.strokeStyle = `rgba(124, 92, 255, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }

        // Draw node
        const pulseSize = node.size * (1 + Math.sin(time * 0.003 + i) * 0.3);
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(200, 180, 255, 0.8)';
        ctx!.fill();
      }
    }

    // Layer 3: Science Layer (Atomic Structures)
    function drawAtomicStructures() {
      for (const orbital of orbitals) {
        ctx!.save();
        ctx!.translate(orbital.x, orbital.y);
        ctx!.rotate(orbital.rotation + time * orbital.rotationSpeed);

        // Draw orbit rings
        for (let i = 0; i < orbital.electrons.length; i++) {
          const radiusX = 30 + i * 18;
          const radiusY = 20 + i * 12;
          ctx!.beginPath();
          ctx!.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
          ctx!.strokeStyle = 'rgba(0, 229, 255, 0.15)';
          ctx!.lineWidth = 1;
          ctx!.stroke();

          // Draw electron
          const electron = orbital.electrons[i];
          const angle = time * electron.speed + i * 2;
          const ex = Math.cos(angle) * radiusX;
          const ey = Math.sin(angle) * radiusY;

          ctx!.save();
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = 'rgba(0, 229, 255, 0.5)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, electron.size, 0, Math.PI * 2);
          ctx!.fillStyle = 'rgba(0, 229, 255, 0.8)';
          ctx!.fill();
          ctx!.restore();
        }

        // Nucleus
        const nucleusRadius = 4 + Math.sin(time * 0.004) * 2;
        ctx!.beginPath();
        ctx!.arc(0, 0, nucleusRadius, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(0, 229, 255, 0.9)';
        ctx!.fill();

        ctx!.restore();
      }
    }

    // Layer 4: Consciousness Portal
    function drawConsciousnessPortal() {
      // Add new rings
      ringCounter++;
      if (ringCounter % 120 === 0) {
        rings.push({
          radius: 0,
          opacity: 0.15,
          maxRadius: Math.max(width, height) * 0.6,
        });
      }

      // Draw and update rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 0.8;
        ring.opacity -= 0.0003;

        if (ring.opacity <= 0) {
          rings.splice(i, 1);
          continue;
        }

        ctx!.beginPath();
        ctx!.arc(width * 0.5, height * 0.4, ring.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(124, 92, 255, ${ring.opacity})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      // Rotating 12-pointed star
      ctx!.save();
      ctx!.translate(width * 0.5, height * 0.4);
      ctx!.rotate(time * 0.0003);

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx!.beginPath();
        ctx!.moveTo(0, 0);
        ctx!.lineTo(Math.cos(angle) * 300, Math.sin(angle) * 300);
        ctx!.strokeStyle = 'rgba(255, 215, 0, 0.06)';
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
      ctx!.restore();

      // Second portal system (golden, after 30 seconds)
      if (time > 1800) {
        if (ringCounter % 150 === 0) {
          rings.push({
            radius: 0,
            opacity: 0.1,
            maxRadius: Math.max(width, height) * 0.4,
          });
        }
      }
    }

    // Layer 5: Human Evolution Layer
    function drawHumanEvolution() {
      if (isMobile) return;

      for (let ribbonIndex = 0; ribbonIndex < 4; ribbonIndex++) {
        const baseX = ribbonIndex % 2 === 0 ? 0 : width;
        ctx!.beginPath();

        for (let y = 0; y <= height; y += 5) {
          const xOffset = Math.sin(y * 0.01 + time * 0.001 + ribbonIndex) * 80;
          if (y === 0) {
            ctx!.moveTo(baseX + xOffset, y);
          } else {
            ctx!.lineTo(baseX + xOffset, y);
          }
        }

        // Wide glow
        ctx!.strokeStyle = 'rgba(0, 230, 118, 0.03)';
        ctx!.lineWidth = 20;
        ctx!.stroke();

        // Core line
        ctx!.beginPath();
        for (let y = 0; y <= height; y += 5) {
          const xOffset = Math.sin(y * 0.01 + time * 0.001 + ribbonIndex) * 80;
          if (y === 0) {
            ctx!.moveTo(baseX + xOffset, y);
          } else {
            ctx!.lineTo(baseX + xOffset, y);
          }
        }
        ctx!.strokeStyle = 'rgba(0, 230, 118, 0.06)';
        ctx!.lineWidth = 4;
        ctx!.stroke();
      }
    }

    // Layer 7: Discovery Layer
    function drawDiscoveryLayer() {
      // Flower of Life (after 5 seconds)
      if (time > 300) {
        ctx!.save();
        ctx!.translate(width * 0.08, height * 0.9);
        ctx!.rotate(time * 0.0002);

        const flowerRadius = 40;
        const centerPoints = [
          { x: 0, y: 0 },
          { x: 0, y: -flowerRadius },
          { x: flowerRadius * 0.866, y: -flowerRadius * 0.5 },
          { x: flowerRadius * 0.866, y: flowerRadius * 0.5 },
          { x: 0, y: flowerRadius },
          { x: -flowerRadius * 0.866, y: flowerRadius * 0.5 },
          { x: -flowerRadius * 0.866, y: -flowerRadius * 0.5 },
        ];

        for (const center of centerPoints) {
          ctx!.beginPath();
          ctx!.arc(center.x, center.y, flowerRadius, 0, Math.PI * 2);
          ctx!.strokeStyle = 'rgba(255, 215, 0, 0.04)';
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
        ctx!.restore();
      }

      // Sanskrit-inspired symbols (after 10 seconds)
      if (time > 600) {
        const symbolOpacity = Math.min((time - 600) * 0.0001, 0.06);
        const symbolPositions = [
          { x: width * 0.15, y: height * 0.3 },
          { x: width * 0.9, y: height * 0.7 },
          { x: width * 0.05, y: height * 0.5 },
        ];

        for (let s = 0; s < symbolPositions.length; s++) {
          const pos = symbolPositions[s];
          ctx!.save();
          ctx!.translate(pos.x, pos.y);
          ctx!.rotate(time * 0.0001 * (s % 2 === 0 ? 1 : -1));

          // Simple geometric mandala fragment
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx!.beginPath();
            ctx!.arc(
              Math.cos(angle) * 25,
              Math.sin(angle) * 25,
              10,
              0,
              Math.PI * 2
            );
            ctx!.strokeStyle = `rgba(124, 92, 255, ${symbolOpacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }

          ctx!.beginPath();
          ctx!.arc(0, 0, 15, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(124, 92, 255, ${symbolOpacity})`;
          ctx!.stroke();

          ctx!.restore();
        }
      }
    }

    function animate() {
      if (!ctx) return;

      // Mobile frame skip
      if (isMobile && time % 2 !== 0) {
        time++;
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Fill background
      ctx.fillStyle = '#0D0520';
      ctx.fillRect(0, 0, width, height);

      drawCosmicField();
      drawConsciousnessNetwork();
      drawAtomicStructures();
      drawConsciousnessPortal();
      drawHumanEvolution();
      drawDiscoveryLayer();

      time++;
      animationId = requestAnimationFrame(animate);
    }

    // Handle reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Draw static frame at time=500
      time = 500;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0D0520';
      ctx.fillRect(0, 0, width, height);
      drawCosmicField();
      drawConsciousnessNetwork();
      drawAtomicStructures();
      drawConsciousnessPortal();
      drawHumanEvolution();
      drawDiscoveryLayer();
    } else {
      init();
      animate();
    }

    const handleResize = () => {
      resize();
      if (prefersReducedMotion) {
        time = 500;
        ctx!.clearRect(0, 0, width, height);
        ctx!.fillStyle = '#0D0520';
        ctx!.fillRect(0, 0, width, height);
        drawCosmicField();
        drawConsciousnessNetwork();
        drawAtomicStructures();
        drawConsciousnessPortal();
        drawHumanEvolution();
        drawDiscoveryLayer();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
