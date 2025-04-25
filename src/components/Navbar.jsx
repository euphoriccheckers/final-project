import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-black via-purple-900 to-red-900 px-6 py-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center text-white font-semibold">
                <Link
                    to="/"
                    className="text-2xl font-bold text-red-400 hover:text-white transition duration-200 cursor-pointer"
                >
                    HadesHub
                </Link>
                <div className="space-x-6">
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
            </div>
        </nav>
    );
};

export default Navbar;
