import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "../Pages/Posts";
import PostId from "../Pages/PostId";
import AddPost from "../Pages/AddPost";
const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/post/:postId" element={<PostId />} />
      <Route path='/add' element={<AddPost/>} />
    </Routes>
  );
};

export default AllRouter;
