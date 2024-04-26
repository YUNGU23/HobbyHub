import React, { useState } from "react";
import { supabase } from "../supabase.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../App.css";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "", img: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data, err } = await supabase
      .from("posts")
      .insert({
        title: post.title,
        content: post.content,
        img: post.img,
      })
      .select();

    if (err) {
      // alert(err);
      console.error(err);
    } else {
      alert("Post created!");
      navigate("/");
    }
  };

  return (
    <div>
      <Header />
      <div className="create">
        <h1>Create a new post</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Input the title of your post..."
          />
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            cols="30"
            rows="10"
            value={post.content}
            onChange={handleChange}
            placeholder="Input the content of your post..."
          ></textarea>
          <label htmlFor="img">Image:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={post.img}
            onChange={handleChange}
            placeholder="Input the image URL of your post..."
          ></input>
          <button type="submit" className="button">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
