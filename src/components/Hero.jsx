import logo from '../assets/logo.svg'
export default function Hero() {
    return (
        <div className="max-w-2xl ">
            <div className="flex items-center    ">
                <img src={logo} alt="logo" className="w-10 m-19" />
        
        <h1 className="text-4xl font-semibold">LogicStack</h1>
      </div>
      <div className="inline-block bg-black/40 px-4 py-2 rounded-lg text-sm text-gray-300 mb-6 ml-50">
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

        <button className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600">
          Play
        </button>
      </div>

            
             

        </div>
          
        
    )
}
