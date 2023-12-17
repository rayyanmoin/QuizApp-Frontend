import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./QuizList.css";

const QuizList = () => {
	const [quiz, setQuiz] = useState([]);
	const [question, setQuestion] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/quiz/allQuiz");
				setQuiz(response.data);
			} catch (error) {
				console.error("Error fetching quiz:", error);
			}
		};

		fetchQuestions();
	}, []);

	useEffect(() => {
		console.log("question", question);
	}, [question]);

	const handleViewQuestion = async (rowId) => {
		try {
			const response = await axios.get(`http://localhost:8080/quiz/get/${rowId}`);
			console.log("response", response.data);
			setQuestion(response.data);
			console.log("row Id :-", rowId);
            // HW
            // Open Modal and view the questions
            // state to be used is question
		} catch (error) {
			console.error("Error fetching question:", error);
		}
	};

	const columnDefs = [
		{ headerName: "S.no", field: "id", width: 100 },
		{
			headerName: "Title",
			field: "title",
			flex: 1,
			cellStyle: { whiteSpace: "normal" }, // Enable text wrapping
			autoHeight: true, // Auto-adjust row height based on content
		},
		{
			headerName: "Actions",
			width: 120,
			cellRenderer: (params) => (
				<button className="button-quiz-list" onClick={() => handleViewQuestion(params.data.id)}>
					View
				</button>
			),
			colId: "actions", // Add a colId for the column
		},
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Quiz List</h1>
			<AgGridReact columnDefs={columnDefs} rowData={quiz} pagination={true} paginationPageSize={20} />
		</div>
	);
};

export default QuizList;
