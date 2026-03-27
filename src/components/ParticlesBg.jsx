import { useEffect, useRef } from "react";

export default function ParticlesBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const mouse = { x: null, y: null };

    // ✅ Handle resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ✅ Mouse tracking
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;

        this.size = Math.random() * 3 + 1;

        // ✅ velocity for smooth physics
        this.vx = 0;
        this.vy = 0;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 170, 50, 0.9)";
        ctx.shadowColor = "rgba(255, 170, 50, 0.8)";
        ctx.shadowBlur = 20;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 120;

        // ✅ Repel from mouse smoothly
        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;

          this.vx -= (dx / distance) * force * 0.6;
          this.vy -= (dy / distance) * force * 0.6;
        }

        // ✅ Return to original position (soft pull)
        this.vx += (this.baseX - this.x) * 0.01;
        this.vy += (this.baseY - this.y) * 0.01;

        // ✅ Friction (kills bouncing)
        this.vx *= 0.9;
        this.vy *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    // ✅ Init particles
    function init() {
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
      }
    }

    // ✅ Animate loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    init();
    animate();

    // ✅ Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
}