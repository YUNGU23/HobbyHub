import React, { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import "../App.css";
import Card from "../components/Card.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select()
          .order(sortBy, { ascending: sortOrder === "asc" });

        if (error) {
          throw error;
        }

        // Filter the fetched posts based on the search term
        const filteredPosts = data.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, [sortBy, sortOrder, searchTerm]);

  const handleSortByCreatedTime = () => {
    if (sortBy === "created_at") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("created_at");
      setSortOrder("asc");
    }
  };

  const handleSortByUpvotes = () => {
    if (sortBy === "upvotes") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("upvotes");
      setSortOrder("desc");
    }
  };

  // if (!posts.length) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Header onSearch={handleSearch} />
      <h1 className="head">Unlock the Secret to a Perfect Day!</h1>
      <p className="content-2">
        Discover the transformative power of a nutritious breakfast and learn
        how to fuel your body and mind for a successful day ahead with Breakfast
        Boost.
      </p>
      <div className="sort">
        <div className="orderBy">Order By:</div>
        <button onClick={handleSortByCreatedTime}>
          Created Time{" "}
          {sortBy === "created_at" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </button>
        <button onClick={handleSortByUpvotes}>
          Upvotes Count{" "}
          {sortBy === "upvotes" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </button>
      </div>
      <div className="cardContainer">
        {posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            img={post.img}
            upvotes={post.upvotes}
            created_at={post.created_at}
            content={post.content}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
