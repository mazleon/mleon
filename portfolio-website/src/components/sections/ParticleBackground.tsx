import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const animationFrameRef = useRef<number | null>(null);

  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(96, 73, 234, ${Math.random() * 0.5 + 0.1})`, // Accent-primary with random opacity
      });
    }

    particlesRef.current = particles;
  }, []);

  const animateParticles = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x > canvas.width || particle.x < 0) {
        particle.speedX = -particle.speedX;
      }

      if (particle.y > canvas.height || particle.y < 0) {
        particle.speedY = -particle.speedY;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Connect particles if they're close enough to each other
      for (const otherParticle of particlesRef.current) {
        if (particle === otherParticle) continue;

        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          // Draw line between particles
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 73, 234, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }

      // Handle mouse interaction
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          // Connect particle to mouse
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.3 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();

          // Push particles away from mouse slightly
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (120 - distance) / 120;

          particle.speedX += forceDirectionX * force * 0.2;
          particle.speedY += forceDirectionY * force * 0.2;

          // Limit max speed
          const currentSpeed = Math.sqrt(
            particle.speedX * particle.speedX +
              particle.speedY * particle.speedY
          );
          if (currentSpeed > 2) {
            particle.speedX = (particle.speedX / currentSpeed) * 2;
            particle.speedY = (particle.speedY / currentSpeed) * 2;
          }
        }
      }
    });

    // Apply some drag to slow particles gradually
    particlesRef.current.forEach((particle) => {
      particle.speedX *= 0.98;
      particle.speedY *= 0.98;
    });

    animationFrameRef.current = requestAnimationFrame(animateParticles);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: null, y: null };
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    // Reinitialize particles on resize
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    // Initialize particles
    initParticles();

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateParticles);

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    animateParticles,
    handleMouseLeave,
    handleMouseMove,
    handleResize,
    initParticles,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
