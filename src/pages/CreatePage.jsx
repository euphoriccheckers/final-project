import { useState } from "react";
import Navbar from "../components/Navbar";
import supabase from "../client/client";

const CreatePage = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        image: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const createNewPost = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.from("posts").insert([post]);
            
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }

        window.alert("Post Created!");
        window.location = "/";
    };

    return (
        <div>
            <Navbar />
            <h2>Create a New Post</h2>
            <form onSubmit={createNewPost}>
                <div>
                    <label>Title*</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={post.image}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePage;
