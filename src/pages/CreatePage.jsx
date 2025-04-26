import { useState } from "react";
import Navbar from "../components/Navbar";
import supabase from "../client/client";

const CreatePage = () => {
    const [post, setPost] = useState({ title: "", content: "", image: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const createNewPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.from("posts").insert([post]);
            if (error) throw error;
            setSuccess(true);
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSuccess(false);
        window.location = "/";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white relative">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h2 className="text-2xl sm:text-3xl text-red-400 font-bold mb-6">Create a New Post</h2>
                <form
                    onSubmit={createNewPost}
                    className="bg-gray-900 p-6 rounded-xl border border-red-800 shadow-md space-y-6"
                >
                    <div>
                        <label className="block mb-1 text-red-300 font-medium">Title*</label>
                        <input
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-red-300 font-medium">Content</label>
                        <textarea
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-red-300 font-medium">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={post.image}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-red-700 hover:bg-red-600 px-6 py-3 rounded text-white font-semibold transition cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>

            {loading && (
                <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                </div>
            )}

            {success && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-red-800 text-center max-w-sm w-full">
                        <h2 className="text-2xl text-red-400 font-bold mb-4">Post Created!</h2>
                        <p className="text-gray-300 mb-6">Your post has been successfully added.</p>
                        <button
                            onClick={closeModal}
                            className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded text-white font-semibold transition cursor-pointer"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePage;
