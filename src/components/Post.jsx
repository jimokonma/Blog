import React from "react";

const Post = (props) => {
  return (
    <div className="card post">
      <h2 onClick={() => props.handleClick(props.id)}>{props.title}</h2>
      <p>{props.body}</p>
    </div>
  );
};
export default Post;
