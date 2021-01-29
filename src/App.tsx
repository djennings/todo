import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000';
interface Task {
	id: number;
	task: string;
	completed: boolean;
	dueDate: string;
}

type TaskRead = Omit<Task, 'completed' | 'dueDate'>;

const App: React.FC = () => {
	const [state, setState] = useState([]);

	useEffect(() => {
		const url: string = `${API_URL}/todos/`;
		axios
			.get(url)
			.then((response) => response.data)
			.then((data) => {
				setState(data);
			});
	}, []);

	const todoList = () =>
		state.map<JSX.Element>((item: TaskRead) => (
			<li key={item.id}>{item.task}</li>
		));

	return (
		<div className="App">
			<ul>{todoList()}</ul>
		</div>
	);
};

export default App;
