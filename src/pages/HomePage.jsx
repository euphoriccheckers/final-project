import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import supabase from "../client/client";
import Post from "../components/Post";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("created_at");
    const [searchQuery, setSearchQuery] = useState("");

    const getAllPosts = async () => {
        try {
            const { data, error } = await supabase.from("posts").select();
            if (error) throw error;
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            alert("Failed to fetch posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy === "upvotes") {
            return b.upvotes - a.upvotes;
        } else {
            return new Date(b.created_at) - new Date(a.created_at);
        }
    });

    const filteredPosts = sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white relative">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-red-400">Latest Offerings</h1>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
                    <input
                        type="text"
                        placeholder="Search posts by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setSortBy("created_at")}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition cursor-pointer"
                        >
                            Sort by Newest
                        </button>
                        <button
                            onClick={() => setSortBy("upvotes")}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition cursor-pointer"
                        >
                            Sort by Upvotes
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <p className="text-center text-gray-400 py-12">No posts found. Be the first to create one!</p>
                ) : (
                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                image={post.image}
                                created={post.created_at}
                                upvotes={post.upvotes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
