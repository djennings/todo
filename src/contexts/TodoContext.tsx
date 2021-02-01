import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ITodo } from '../todo.d';

const API_URL = 'http://localhost:8000';

export const TodoContext = createContext<any>(null);

const TodoContextProvider: React.FC = ({ children }) => {
	const initialState: ITodo[] = [];
	const [todos, setTodos] = useState<ITodo[]>(initialState);

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

	const addTodo = (todo: ITodo) => {
		setTodos((prevTodos) => [...prevTodos, todo]);
		console.log(todo);
	};

	const toggleTodo = ({ id }: ITodo) => {
		console.log(id);
	};

	return (
		<TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;
