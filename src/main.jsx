import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "../routes/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "../routes/NewPost.jsx";
import PostDetail from "../routes/PostDetail.jsx";
import Home from "./pages/Home.jsx";
import EditPost from "../routes/EditPost.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route index={false} path="/new" element={<NewPost />} />
        <Route index={false} path="/details/:id" element={<PostDetail />} />
        <Route index={false} path="/edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
