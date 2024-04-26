import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import Header from "../components/Header.jsx";
import "../App.css";

const UpdatePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "", img: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .update({
        title: post.title,
        content: post.content,
        img: post.img,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      alert("Post updated!");
      navigate(`/details/${id}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="create">
        <h1>Update the post</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            cols="30"
            rows="10"
            value={post.content}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="img">Image:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={post.img}
            onChange={handleChange}
          />
          <button type="submit" className="button">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;