import Navbar from "../components/Navbar";
import supabase from "../client/client";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const { data, error } = await supabase.from("posts").select();

            if(error) {
                throw error;
            }

            setPosts(data);
        } catch (error) {
            console.error("There was an error getting all posts from DB: ", error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>This is the Home page.</h1>
            <div>
                {posts.map((post) => {
                    return(
                        <Post 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            image={post.image}
                            created={post.created_at}
                            upvotes={post.upvotes}
                        ></Post>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage;