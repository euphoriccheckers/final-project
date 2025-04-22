import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/">HobbyHub</Link>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/create">Create New Post</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;