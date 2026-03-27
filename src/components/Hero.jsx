import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
export default function Hero() {
    return (
        <div className="max-w-2xl ">
            <div className="flex items-center    ">
                <img src={logo} alt="logo" className="w-10 m-19" />
        
        <h1 className="text-4xl font-semibold">LogicStack</h1>
      </div>
      <div className="inline-block bg-black/40 px-4 py-2 rounded-lg text-sm text-gray-300 mb-6 ml-50   text-4xl">
        💡 Completely free to use - no ads or hidden fees
      </div>
       {/* Heading */}
      <h2 className="text-4xl font-bold leading-tight ml-50">
         sharp your logical skills <br />
        through{" "}
        <span className="text-green-400">
          interactive quiz
        </span>
      </h2>

         <p className="mt-6 text-gray-300 leading-relaxed ml-50" >
       Challenge yourself with over 1k+ carefully crafted questions across essential interview aptitude topics. Perfect your skills in quantitative analysis, logical deduction, verbal reasoning, and more
      </p>  

        <div className="mt-8 flex items-center gap-6 ml-50">
        <span className="text-gray-300 cursor-pointer">
          Select filters
        </span>
      <Link
  to="/quiz"
  className="
    relative inline-block px-6 py-3 rounded-xl font-semibold text-white
    bg-green-500
    overflow-hidden
    transition-all duration-800 ease-out

    before:absolute before:inset-0 before:rounded-xl
    before:bg-black/20 before:opacity-100
    before:transition-opacity before:duration-500

    hover:before:opacity-0
    hover:bg-green-500
    hover:shadow-[0_0_20px_rgba(34,255,150,0.6),0_0_60px_rgba(34,255,150,0.4)]
  "
>
  {/* Glow Rays */}
  <span className="
    absolute inset-0 rounded-xl
    bg-[radial-gradient(circle_at_center,rgba(34,255,150,0.4)_0%,transparent_70%)]
    opacity-0
    transition-opacity duration-700
    group-hover:opacity-300
  "></span>

  {/* Text */}
  <span className="relative z-10">Play</span>
</Link>
      </div>

            
             

        </div>
          
        
    )
}
