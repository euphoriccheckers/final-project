import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <Link to={`post/${props.id}`}>
            <div className="bg-gray-900 hover:bg-gray-800 border border-red-900 rounded-xl p-4 mb-4 shadow-md transition">
                <h1 className="text-red-400 text-xl font-bold mb-2 hover:text-red-300 transition">
                    {props.title}
                </h1>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <p className="text-gray-300">Upvotes: {props.upvotes}</p>
                    <p>Created: {new Date(props.created).toLocaleString()}</p>
                </div>
            </div>
        </Link>
    );
};

export default Post;
