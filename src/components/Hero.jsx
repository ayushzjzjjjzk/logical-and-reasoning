import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
export default function Hero() {
    return (
        <div className="w-full max-w-2xl">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <img src={logo} alt="logo" className="w-10" />
                <h1 className="text-4xl font-semibold">LogicStack</h1>
            </div>

            <div className="mt-6 inline-block bg-black/40 px-4 py-2 rounded-lg text-sm text-gray-300 mb-6">
                💡 Completely free to use - no ads or hidden fees
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                sharp your logical skills <br />
                through <span className="text-green-400">interactive quiz</span>
            </h2>

            <p className="mt-6 text-gray-300 leading-relaxed">
                Challenge yourself with over 1k+ carefully crafted questions across essential interview aptitude topics. Perfect your skills in quantitative analysis, logical deduction, verbal reasoning, and more.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="text-gray-300 cursor-default">Select filters</span>
                <Link
                    to="/quiz"
                    className="group relative inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 font-semibold text-white overflow-hidden transition-all duration-300 ease-out hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,255,150,0.6),0_0_60px_rgba(34,255,150,0.4)]"
                >
                    <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,rgba(34,255,150,0.4)_0%,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-30" />
                    <span className="relative z-10">Play</span>
                </Link>
            </div>
        </div>
    )
}
