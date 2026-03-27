import ParticlesBg from "./components/ParticlesBg";
import Hero from "./components/Hero";
import QuizSlider from "./components/QuizSlider";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBg />
      </div>

      {/* Layout */}
      <div className="flex items-center justify-between min-h-screen px-16">
        
        {/* Left */}
        <Hero />

        {/* Right */}
        <div className="w-[450px]">
          <QuizSlider />
        </div>

      </div>
    </div>
  );
}

export default App;