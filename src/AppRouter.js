import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import 'Routes' instead of 'Switch'
import QuestionList from "./QuestionList";
import NavBar from "./NavBar";
import AddQuestion from "./AddQuestion";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateQuiz from "./CreateQuiz";
import QuizList from "./QuizList";
import QuizHistory from "./QuizHistory";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";

const AppRouter = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);

	const handleLogin = (user) => {
		setLoggedInUser(user);
	};
	return (
		<Router>
			<ToastContainer />
			<NavBar loggedInUser={loggedInUser} /> {/* Include the NavBar component */}
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Login onLogin={handleLogin} />} />
				<Route path="/home" element={<Home />} />
				{/* Use 'Routes' instead of 'Switch' */}
				<Route path="/questionlist" element={<QuestionList />} />
				<Route path="/addquestion" element={<AddQuestion />} />
				<Route path="/createquiz" element={<CreateQuiz />} />
				<Route path="/quizlist" element={<QuizList loggedInUser={loggedInUser} />} />
				<Route path="/quizhistory" element={<QuizHistory />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
