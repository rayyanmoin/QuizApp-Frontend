import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { NameFilter, ScoreFilter } from "ag-grid-react";

import "./QuizHistory.css";

const QuizHistory = () => {
	const [quizHistory, setQuizHistory] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/quiz/allQuizScores");
				setQuizHistory(response.data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);


	const columnDefs = [
		{ headerName: "S.no", field: "id", width: 100 },
		{ headerName: "Name", field: "name", width: 150, filter: "NameFilter" },
		{ headerName: "Score", field: "score", width: 150, filter: "ScoreFilter" },
		{
			headerName: "Total Score",
			field: "totalscore",
			flex: 1,
			cellStyle: { whiteSpace: "normal" }, // Enable text wrapping
			autoHeight: true, // Auto-adjust row height based on content
		},
		{
			headerName: "Attempted On",
			field: "attemptedon",
			flex: 1,
			cellStyle: { whiteSpace: "normal" }, // Enable text wrapping
			autoHeight: true,
			valueFormatter: ({ value }) => {
				// Format the date using JavaScript Date object
				const formattedDate = new Date(value).toLocaleString();
				return formattedDate;
			}, // Auto-adjust row height based on content
		},
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Quiz History</h1>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={quizHistory}
				pagination={true}
				paginationPageSize={20}
				frameworkComponents={{ NameFilter: NameFilter, ScoreFilter: ScoreFilter}}
			/>
		</div>
	);
};

export default QuizHistory;
