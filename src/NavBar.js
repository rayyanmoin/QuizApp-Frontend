// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ loggedInUser }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/home">Home</Link>
				</li>
				<li>
					<Link to="/questionlist">Question List</Link>
				</li>
				<li>
					<Link to="/addquestion">Add Question</Link>
				</li>
				<li>
					<Link to="/createquiz">Create Quiz</Link>
				</li>
				<li>
					<Link to="/quizlist">Quiz List</Link>
				</li>
				<li>
					<Link to="/quizhistory">Quiz History</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				{loggedInUser && (
					<li>
						<span className="username">Welcome, {loggedInUser.username} !</span>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
