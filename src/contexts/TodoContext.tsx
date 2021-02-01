import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
	task: string;
}
const API_URL = 'http://localhost:8000';

export const TodoContext = createContext<any>(null);

const TodoContextProvider: React.FC = ({ children }) => {
	const initialState: Todo[] = [];
	const [todos, setTodos] = useState<Todo[]>(initialState);

	useEffect(() => {
		function fetchData() {
			const url: string = `${API_URL}/todos/`;
			axios
				.get(url)
				.then((response) => response.data)
				.then((data) => {
					setTodos(data);
				});
		}
		fetchData();
	}, []);

	const addTodo = (todo: Todo) => {
		setTodos((prevTodos) => [...todos, todo]);
		console.log(todo);
	};

	return (
		<TodoContext.Provider value={{ todos, addTodo }}>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;
