import { Link } from "react-router-dom";

const Post = ({ id, title, upvotes, created }) => {
    return (
        <Link to={`post/${id}`} className="block cursor-pointer">
            <div className="bg-gray-900 hover:bg-gray-800 border border-red-900 rounded-xl p-5 mb-5 shadow-md transition duration-200">
                <h1 className="text-red-400 text-lg sm:text-xl font-bold mb-2 hover:text-red-300 transition duration-200">
                    {title}
                </h1>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
                    <p className="text-gray-300">Upvotes: {upvotes}</p>
                    <p>Created: {new Date(created).toLocaleString()}</p>
                </div>
            </div>
        </Link>
    );
};

export default Post;
