import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/PostId.css";
import { useParams } from "react-router-dom";
const PostId = () => {
  const { postId } = useParams();
  console.log("postID", postId);

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  // const [favourite, setFavourite] = useState(false);
  const handlePost = async () => {
    setLoading(true);
    try {
      let res = await axios(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      console.log("resID", res.data);
      setLoading(false);
      setPost(res.data);
    } catch (err) {
      console.log("err", err);
      setError(true);
    }
  };
  const handleComments = async () => {
    setLoading(true);
    try {
      let res = await axios(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      console.log("resComments", res.data);
      setLoading(false);
      setComments(res.data);
    } catch (err) {
      console.log("err", err);
      setError(true);
    }
  };
  // const handleLike = () => {
  //   setIsLiked((prev) => !prev);
  // };
  // const handleFavourite=()=>{
  //   setFavourite((prev)=>!prev)
  // }
  useEffect(() => {
    handlePost();
    handleComments();
  }, [postId]);
  return (
    <div>
      {
        <div>
          <br />
          <br />
          {loading || error ? (
            <h1>{loading ? "Loading..." : "Error..."}</h1>
          ) : (
            <div className="postIDValue">
              <h2>{postId}</h2>
              <h3>{post.title}</h3>
              <p className="body_id">{post.body}</p>
            </div>
          )}
        </div>
      }
      {/* <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <button onClick={handleFavourite}>
        {favourite ? "unfavourite" : "favourite"}
      </button> */}
      <h1>Some of the comments on the posts</h1>
      <div className="comments_css">
        {comments &&
          comments.map((el) => {
            return (
              <div className="comments_id" key={el.id}>
                <h3>{el.name}</h3>
                <h4>{el.email}</h4>
                <h5>{el.body}</h5>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostId;
