import Navbar from "../components/Navbar";
import supabase from "../client/client";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const { data, error } = await supabase.from("posts").select();
            if (error) throw error;
            setPosts(data);
        } catch (error) {
            console.error("There was an error getting all posts from DB: ", error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-red-400">Latest Offerings</h1>
                <div className="space-y-4">
                    {posts.map((post) => (
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
            </div>
        </div>
    );
};

export default HomePage;