import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <Link to={`post/${props.id}`}>
            <div>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                {props.image && props.image.length > 0
                    && (<img src={props.image} alt="Post" />)}
                <p>Upvotes: {props.upvotes}</p>
                <p>Created: {props.created}</p>
            </div>
        </Link>
    )
}

export default Post;