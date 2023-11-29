import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Addpost.css";
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const handleAdd = async () => {
    let payload = {
      id: Date.now(),
      userID: Math.floor(Math.random() * 6),
      title,
      body,
    };
    try {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, payload);
      alert("data", "successfull Added");
      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div>
      <h1>Add New Post Here</h1>
      <h1>👇👇</h1>
      <div className="add">
        <label className="label">Enter the Title</label>
        <br />
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          type="text"
        />
        <br />
        <label className="label">Enter the Data</label>
        <br />
        <input
          className="input"
          type="text"
          onChange={(e) => setBody(e.target.body)}
        />
        <br />
        <br />
        <button onClick={handleAdd} className="btn">
          Add Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
