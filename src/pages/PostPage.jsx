import Navbar from "../components/Navbar";
import supabase from "../client/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    const getPost = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            setPost(data);
        } catch (error) {
            console.error("Error getting single post from DB: ", error);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const deletePost = async (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (error) throw error;

            window.alert("Post Deleted!");
            window.location = "/";
        } catch (error) {
            console.error("Error deleting post from DB: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl text-red-400 font-bold mb-4">Post Details</h1>
                <div className="bg-gray-900 p-6 rounded-xl border border-red-800 shadow-md space-y-4 relative">

                    <div className="absolute top-4 right-4 flex gap-2">
                        <Link to={`/edit/${id}`}>
                            <button className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm text-white font-medium transition cursor-pointer">
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={deletePost}
                            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm text-white font-medium transition cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>


                    <h2 className="text-xl text-red-300 font-semibold">{post.title}</h2>
                    <p className="text-gray-200">{post.content}</p>

                    {post.image && post.image.length > 0 && (
                        <img
                            src={post.image}
                            alt="Post"
                            className="rounded-lg max-h-96 object-cover border border-gray-700"
                        />
                    )}

                    <div className="text-sm text-gray-400 border-t border-gray-700 pt-4 mt-4 flex justify-between">
                        <span>Upvotes: {post.upvotes}</span>
                        <span>Created: {new Date(post.created_at).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPage;
