import ParticlesBg from "./ParticlesBg";
import Hero from "./Hero";
import QuizSlider from "./QuizSlider";

function Home() {
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

export default Home;