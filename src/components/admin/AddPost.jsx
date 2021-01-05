import React from "react";
import { useState } from "react";
import axios from "axios";

const AddPost = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const handleSubmite = (e) => {
    e.preventDefault();
    const post = {
      title: newPost.title,
      body: newPost.body,
    };
    axios
      .post("http://localhost:5000/posts", post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewPost({
      title: "",
      body: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  return (
    <div className="adminPostForm">
      <form onSubmit={handleSubmite}>
        <h2>Create Post</h2>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          cols="30"
          rows="10"
          value={newPost.body}
          placeholder="write something..."
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
