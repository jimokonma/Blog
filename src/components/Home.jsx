import React from "react";
import Post from "./Post";
import axios from "axios";
import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";

const Home = () => {
  // Post State
  const [post, setPost] = useState({
    postData: [],
  });
  // Curent Post State
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    body: "",
    comments: [],
  });

  // Display Post on click
  const [postOpacity, setPostOpacity] = useState(false);
  // Display Post on Mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPost({ postData: res.data });
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [post.postData]
      );
  });
  // Handle Post Visibility
  let singlePostStyle = {
    visibility: postOpacity ? "visible" : "hidden",
  };
  let postStyle = {
    visibility: postOpacity ? "hidden" : "visible",
  };
  // Handle post Close
  const handleClosePost = () => {
    setPostOpacity(false);
    setCurrentPost({
      id: "",
      title: "",
      body: "",
      comments: [],
    });
  };

  // Handle Post Click
  const handlePostClick = (id) => {
    setPostOpacity(true);
    axios
      .get("http://localhost:5000/posts/" + id)
      .then((res) => {
        setCurrentPost({
          id: res.data._id,
          title: res.data.title,
          body: res.data.body,
          comments: res.data.comments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Map Post Data
  const data = post.postData
    .map((post) => {
      return (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          body={post.body}
          handleClick={handlePostClick}
        />
      );
    })
    .reverse();

  // Map comments
  const newComment = currentPost.comments
    .map((com) => {
      return (
        <p key={com._id} id={com._id} className="comment">
          {com.body}
        </p>
      );
    })
    .reverse();
  return (
    <div className="home">
      <div className="container" style={postStyle}>
        {data.length > 0 ? (
          data
        ) : (
          <h4 className="postDefault">No post availeble</h4>
        )}
      </div>

      <div style={singlePostStyle}>
        <SinglePost
          title={currentPost.title}
          body={currentPost.body}
          id={currentPost.id}
          comments={newComment}
          closePost={handleClosePost}
        />
      </div>
    </div>
  );
};
export default Home;
