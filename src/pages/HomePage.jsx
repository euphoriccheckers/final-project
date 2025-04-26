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
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-red-400">
                    Latest Offerings
                </h1>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <input
                        type="text"
                        placeholder="Search posts by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                    <div className="flex flex-col sm:flex-row sm:space-x-2 gap-2 sm:gap-0">
                        <button
                            onClick={() => setSortBy("created_at")}
                            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded transition cursor-pointer text-sm sm:text-base"
                        >
                            Sort by Newest
                        </button>
                        <button
                            onClick={() => setSortBy("upvotes")}
                            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded transition cursor-pointer text-sm sm:text-base"
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
                    <p className="text-center text-gray-400 py-12">
                        No posts found. Be the first to create one!
                    </p>
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
