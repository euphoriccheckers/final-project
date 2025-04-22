import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../client/client";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
        image: ""
    });

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
            console.error("Error fetching post:", error);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        try {
            const { error } = await supabase
                .from("posts")
                .update(post)
                .eq("id", id);

            if (error) throw error;

            window.alert("Post Updated!");
            navigate(`/post/${id}`);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h2 className="text-3xl text-red-400 font-bold mb-6">Edit Post</h2>
                <form
                    onSubmit={updatePost}
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
                        className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded text-white font-semibold transition cursor-pointer"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPage;
