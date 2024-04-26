import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase.js";
import UpdatePost from "./UpdatePost.jsx";
import Header from "../components/Header.jsx";
import { calculateTimeAgo } from "../components/calculateTimeAgo.jsx";
import { LuThumbsUp } from "react-icons/lu";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [timeAgo, setTimeAgo] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching posts:", error.message);
        }
        setPost(data);
        setUpvotes(data.upvotes);
        setTimeAgo(calculateTimeAgo(data.created_at));
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("post_id", id);
      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, comments, upvotes]);

  const submitComment = async (e) => {
    const { data, error } = await supabase.from("comments").insert({
      post_id: id,
      content: newComment,
    });
    setNewComment("");
    if (error) {
      console.error("Error submitting comment", error);
    } else if (data) {
      alert("Comment created!");
      setComments((prevComments) => [...prevComments, data[0]]);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditedComment(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    const { data, error } = await supabase
      .from("comments")
      .update({ content: editedComment })
      .eq("id", commentId);

    if (error) {
      console.error("Error updating comment", error);
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedComment }
            : comment
        )
      );
      setEditingComment(null);
      setEditedComment("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Error deleting comment", error);
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleUpvotes = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error updating upvotes:", error.message);
    } else if (data) {
      setUpvotes(upvotes + 1);
    }
  };

  const deletePost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error fetching posts:", error.message);
      }

      alert("Post deleted!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="postPage">
        <h1>{post.title}</h1>
        <div className="timeAgo">Posted {timeAgo}</div>
        <p>{post.content}</p>
        <img src={post.img} alt={post.title} />
        <div className="icon-container">
          <div className="align-left">
            <LuThumbsUp className="icon" onClick={handleUpvotes} />
            <p className="upvote-count">{upvotes} upvotes</p>
          </div>
          <div className="align-right">
          <MdEdit className="icon" onClick={() => navigate(`/edit/${post.id}`)} />
            <MdDeleteOutline className="icon" onClick={deletePost} />
          </div>
        </div>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {editingComment?.id === comment.id ? (
              <>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <div className="comment-update-buttons">
                  <button
                    className="comment-update-button"
                    onClick={() => handleUpdateComment(comment.id)}
                  >
                    Update
                  </button>
                  <button
                    className="comment-update-button"
                    onClick={() => setEditingComment(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="icon-container">
                <div className="align-left">
                  <FaRegUser className="icon" />
                <p>{comment.content}</p>
                </div>
                <div className="align-right">
                  <MdEdit className="icon-2" 
                    onClick={() => handleEditComment(comment)}
                  />
                  <MdDeleteOutline className="icon-2"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button className="details-submit-button" onClick={submitComment}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PostPage;
