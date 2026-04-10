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
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-10 md:flex-row md:justify-between md:px-16">
        
        {/* Left */}
        <div className="w-full max-w-2xl">
          <Hero />
        </div>

        {/* Right */}
        <div className="w-full max-w-lg">
          <QuizSlider />
        </div>

      </div>
    </div>
  );
}

export default Home;