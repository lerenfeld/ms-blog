import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");
    setPosts(res.data);

  };

  useEffect(() => {
    fetchPosts()
  }, []);

const renderedPost = Object.values(posts).map((post ,i)=>{
    return <div key={i} className="card" style={{width: '30%' , marginBottom: '20px'}}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentsList comments = {post.comments}/>
                <CommentCreate postId={post.id}/>
                
            </div>

            
    </div>
})

  return <div className="d-flex flex-row flex-wrap justify-content-between">
    {renderedPost}
  </div>;
};

export default PostList;
