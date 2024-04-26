import React from "react";
import { Link } from "react-router-dom";
import { calculateTimeAgo } from "./calculateTimeAgo";

const Card = (props) => {
  return (
    <div className="card">
      <Link to={`/details/${props.id}`}>
        {props.img ? (
          <img src={props.img} alt={props.title} className="img" />
        ) : (
          <div className="placeholder-image"></div>
        )}
        <p className="timeAgo2">Posted {calculateTimeAgo(props.created_at)}</p>
        <div className="card-info">
          <h2>{props.title}</h2>
          <p>{props.content}</p>
        </div>
        <p className="timeAgo2">Upvotes: {props.upvotes}</p>
      </Link>
    </div>
  );
};

export default Card;
