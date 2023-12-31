import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Dashboard = () => {
	const [subjectCounts, setSubjectCounts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8080/question/categorycount"); // Update the API endpoint
				setSubjectCounts(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const options = {
		chart: {
			type: "bar",
		},
		title: {
			text: "Subject Counts",
		},
		xAxis: {
			categories: subjectCounts.map(([count]) => count),
			title: {
				text: "Subject",
			},
		},
		yAxis: {
			title: {
				text: "Count",
			},
		},
		series: [
			{
				name: "Count",
				data: subjectCounts.map(([, subject]) => subject),
			},
		],
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<HighchartsReact highcharts={Highcharts} options={options} />
            // Add more components as needed Difficulty Level Chart
		</div>
	);
};

export default Dashboard;
