import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  let navigate = useNavigate();

  const goToHome = () => {
    navigate(`/`);
  };

  const goToNew = () => {
    navigate(`/new`);
  };

  return (
    <div className="header-bar">
      <div className="header">
        <h1>Morning Mojo</h1>
      </div>
      <div className="nav">
        <div className="search-bar">
          <LuSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <h2 onClick={goToHome} className="nav-home">
          Home
        </h2>
        <h2 onClick={goToNew} className="nav-newPost">
          NewPost
        </h2>
        <FaRegUser className="icon" />
      </div>
    </div>
  );
};

export default Header;
