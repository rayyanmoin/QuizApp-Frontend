import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import 'Routes' instead of 'Switch'
import QuestionList from "./QuestionList";
import NavBar from "./NavBar"; 
import AddQuestion from "./AddQuestion";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateQuiz from "./CreateQuiz";
import QuizList from "./QuizList";

const AppRouter = () => {
	return (
		<Router>
			<ToastContainer />
			<NavBar /> {/* Include the NavBar component */}
			<Routes>
				{" "}
				<Route path="/" element={<Home />} />
				{/* Use 'Routes' instead of 'Switch' */}
				<Route path="/questionlist" element={<QuestionList />} />
				<Route path="/addquestion" element={<AddQuestion />} />
				<Route path="/createquiz" element={<CreateQuiz />} />
				<Route path="/quizlist" element={<QuizList />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
