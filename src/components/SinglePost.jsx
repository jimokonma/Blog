import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const SinglePost = (props) => {
  const [commentInput, setCommentInput] = useState("");

  const [comment, setComment] = useState([]);

  // Comment input state handler
  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };
  useEffect(() => {
    setComment(props.comments);
  }, [props.comments]);
  // Handle Comment Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      body: commentInput,
    };
    Axios.patch(`http://localhost:5000/posts/comment/${props.id}`, newComment)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setCommentInput("");
  };

  return (
    <div className=" card post singlePost">
      <a onClick={props.closePost}>X</a>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <hr />
      {comment.length > 0 ? comment : "no comments"}
      <hr />
      <form onSubmit={handleSubmit} className="commentForm">
        <input
          type="text"
          placeholder="comment"
          value={commentInput}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          add
        </button>
      </form>
    </div>
  );
};
export default SinglePost;
