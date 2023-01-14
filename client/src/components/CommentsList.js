import React from "react";

const CommentsList = ({ comments }) => {
  const renderedComments = comments.map((comment, i) => {
    let content;

    if (comment.status === "approve") {
      content = comment.content;
    } else if (comment.status === "pending") {
      content = "This comment is awaiting moderation...";
    } else if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={i}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
