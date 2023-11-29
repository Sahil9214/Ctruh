import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Styles/Posts.css";
const Posts = () => {
  const [post, setPost] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  // const [likedPosts, setLikedPosts] = useState([]);
  // const [favoritePosts, setFavoritePosts] = useState([]);

  const isPrevButtonDisabled = page === 1;
  const handlePost = async (page = 1) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      console.log("res", res.data);
      setPost(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  //Liked;
  const likeArray = [];
  const favouriteArray = [];
  const handleLike = async (id) => {
    try {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      likeArray.push(res.data);
      localStorage.setItem("likedData", JSON.stringify(likeArray));
    } catch (err) {
      console.log(err);
    }
  };
  //Favourite

  const handleFavourite = async (id) => {
    try {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      favouriteArray.push(res.data);
      localStorage.setItem("favouriteData", JSON.stringify(favouriteArray));
    } catch (err) {
      console.log(err);
    }
  };
  //Filtering
  const handleSelect = async (e) => {
    let tet = e.target.value;
    if (tet === "lik") {
      let val = JSON.parse(localStorage.getItem("likedData"));
      setPost(val);
    }
    if (tet === "fav") {
      let val = JSON.parse(localStorage.getItem("favouriteData"));
      setPost(val);
    }
    if (tet === "") {
      try {
        let res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
        );
        console.log("res", res.data);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      handlePost(page);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    handlePost(page);
  }, [page]);
  return (
    <div>
      <div className='main_div'>
      <div id="nav">
        <div className="select_div">
          <select onChange={handleSelect} className="select_value">
            <option value="">Filter </option>
            <option value="lik">Liked Posts </option>
            <option value="fav">Favoruite page </option>
          </select>
        </div>
        {/* //Add New One */}
        <Link to="/add">
          <button className="btn">Add New Post</button>
        </Link>
      </div>
      <br />
      <br />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...</h1>}
      <div className="main">
        {post &&
          post.map((el) => {
            return (
              <div className="posts" key={el.id}>
                <h3>{el.title}</h3>
                <p>{el.body}</p>
                <div
                  style={{ justifyContent: "space-around", display: "flex" }}
                >
                  <Link to={`/post/${el.id}`}>
                    <button className="btn">See Detail</button>
                  </Link>
                  <button className="btn" onClick={() => handleLike(el.id)}>Liked</button>
                  <button className="btn" onClick={() => handleFavourite(el.id)}>
                    Favourite
                  </button>
                </div>
                <br />
                <br />
                <div className='update_delete'>
                  <button className="btn" onClick={() => handleDelete(el.id)}>Delete</button>
                  <button className="btn" onClick={() => handleUpdate(el.id)}>Update</button>
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <div className="pagination">
        <button
          disabled={isPrevButtonDisabled}
          className="btn"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button className="btn">{page}</button>
        <button className="btn" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default Posts;
