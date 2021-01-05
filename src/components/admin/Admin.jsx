import React from "react";
import AdminPost from "./AdminPost";
import { useState, useEffect } from "react";
import axios from "axios";
import AddPost from "./AddPost";

const Admin = () => {
  const [post, setPost] = useState({
    postData: [],
  });

  // Display Post On Mount
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
  // Delete Post
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/posts/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Display single Post
  const handleClick = (id) => {
    console.log(id);
  };
  const data = post.postData
    .map((post) => {
      return (
        <AdminPost
          key={post._id}
          id={post._id}
          title={post.title}
          body={post.body}
          handleDelete={handleDelete}
          handleClick={handleClick}
        />
      );
    })
    .reverse();
  return (
    <div className=" admin">
      <AddPost />
      <div>
        {data.length > 0 ? (
          data
        ) : (
          <h4 className="postDefault">No post availeble</h4>
        )}
      </div>
    </div>
  );
};
export default Admin;
