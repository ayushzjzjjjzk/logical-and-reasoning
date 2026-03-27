import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

export default function StarParticle() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // ✅ IMPORTANT (not loadFull)
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },

        particles: {
          number: { value: 60 },

          color: {
            value: ["#22ff96", "#ff3c3c"],
          },

          shape: {
            type: "circle",
          },

          opacity: {
            value: { min: 0.2, max: 0.8 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
            },
          },

          size: {
            value: { min: 1, max: 3 },
          },

          move: {
            enable: true,
            direction: "bottom",
            speed: { min: 0.5, max: 1.5 },
            straight: false,
            outModes: {
              default: "out",
            },
          },

          shadow: {
            enable: true,
            color: "#22ff96",
            blur: 15,
          },
        },

        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },

        detectRetina: true,
      }}
    />
  );
}