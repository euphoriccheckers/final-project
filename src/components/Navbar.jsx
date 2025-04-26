import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-black bg-gradient-to-r from-black via-purple-800 to-red-800 px-6 py-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center text-white font-semibold">
                <Link
                    to="/"
                    className="text-2xl font-bold text-red-400 hover:text-white transition duration-200 cursor-pointer"
                >
                    HadesHub
                </Link>

                <div className="hidden md:flex space-x-6 items-center">
                    <Link
                        to="/"
                        className="hover:text-red-300 transition duration-200 cursor-pointer"
                    >
                        Home
                    </Link>
                    <Link
                        to="/create"
                        className="hover:text-red-300 transition duration-200 cursor-pointer"
                    >
                        Create New Post
                    </Link>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden mt-2 space-y-2 flex flex-col items-start bg-black bg-gradient-to-r from-black via-purple-800 to-red-800 rounded-lg p-4 shadow-md">
                    <Link
                        to="/"
                        className="text-white hover:text-red-300 transition duration-200 cursor-pointer w-full"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/create"
                        className="text-white hover:text-red-300 transition duration-200 cursor-pointer w-full"
                        onClick={() => setMenuOpen(false)}
                    >
                        Create New Post
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
