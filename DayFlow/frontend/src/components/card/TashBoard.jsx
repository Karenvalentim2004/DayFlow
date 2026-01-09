 import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import "./Card.css"; 
 
 const Cards = ({ tasks }) => {
  return (
    <div className="board">
      {tasks.map((task) => (
        <div key={task.id} className="card">
          <h3>{task.title}</h3>
          <p>📅 {task.dueDate}</p>
          <span>{task.status}</span>
        </div>
      ))}
    </div>
  );
};

export default Cards;