import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../client/client";

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submittingComment, setSubmittingComment] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const getPost = async () => {
        try {
            const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
            if (error) throw error;
            setPost(data);
        } catch (error) {
            console.error("Error fetching post:", error);
            alert("Failed to fetch post.");
        }
    };

    const getComments = async () => {
        try {
            const { data, error } = await supabase.from("comments").select("*").eq("post_id", id).order("created_at", { ascending: true });
            if (error) throw error;
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const deletePost = async () => {
        try {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (error) throw error;
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post.");
        }
    };

    const upvotePost = async () => {
        try {
            const { error } = await supabase.from("posts").update({ upvotes: post.upvotes + 1 }).eq("id", id);
            if (error) throw error;
            setPost((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }));
        } catch (error) {
            console.error("Error upvoting post:", error);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setSubmittingComment(true);
        try {
            const { error } = await supabase.from("comments").insert([{ post_id: id, content: newComment }]);
            if (error) throw error;
            setNewComment("");
            getComments();
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment.");
        } finally {
            setSubmittingComment(false);
        }
    };

    useEffect(() => {
        Promise.all([getPost(), getComments()]).finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white relative">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl sm:text-3xl text-red-400 font-bold mb-4">
                            Post Details
                        </h1>
                        <div className="bg-gray-900 p-6 rounded-xl border border-red-800 shadow-md space-y-4 relative">
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit/${id}`}>
                                    <button className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-xs sm:text-sm text-white font-medium transition cursor-pointer">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => setConfirmDelete(true)}
                                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs sm:text-sm text-white font-medium transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>

                            <h2 className="text-lg sm:text-xl text-red-300 font-semibold">{post.title}</h2>
                            <p className="text-gray-200">{post.content}</p>

                            {post.image && post.image.length > 0 && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="w-full rounded-lg max-h-96 object-cover border border-gray-700"
                                />
                            )}

                            <div className="text-xs sm:text-sm text-gray-400 border-t border-gray-700 pt-4 mt-4 flex justify-between">
                                <span>Upvotes: {post.upvotes}</span>
                                <span>Created: {new Date(post.created_at).toLocaleString()}</span>
                            </div>

                            <button
                                onClick={upvotePost}
                                className="mt-6 bg-red-700 hover:bg-red-600 px-6 py-3 rounded text-white font-semibold transition cursor-pointer"
                            >
                                Upvote
                            </button>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-2xl text-red-400 font-bold mb-4">
                                Comments
                            </h3>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-800 p-4 rounded mb-4">
                                        <p className="text-gray-300">{comment.content}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 py-12">
                                    No comments yet. Be the first!
                                </p>
                            )}

                            <form onSubmit={addComment} className="mt-8 space-y-4">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    rows="3"
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                                />
                                <button
                                    type="submit"
                                    disabled={submittingComment}
                                    className={`w-full bg-red-700 hover:bg-red-600 px-6 py-3 rounded text-white font-semibold transition cursor-pointer ${submittingComment ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {submittingComment ? "Posting..." : "Post Comment"}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>

            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-red-800 text-center max-w-sm w-full">
                        <h2 className="text-2xl text-red-400 font-bold mb-4">Confirm Delete</h2>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete this post?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={deletePost}
                                className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold w-full transition cursor-pointer"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-semibold w-full transition cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostPage;
