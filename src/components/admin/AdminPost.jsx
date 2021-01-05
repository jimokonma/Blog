import React from "react";

const AdminPost = (props) => {
  return (
    <div className="card post">
      <p className="del" onClick={() => props.handleDelete(props.id)}>
        X
      </p>
      <h2 onClick={() => props.handleClick(props.id)}>{props.title}</h2>
      <p>{props.body}</p>
    </div>
  );
};
export default AdminPost;
