import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ITodo } from '../todo.d';

const API_URL = 'http://localhost:8000';

export const TodoContext = createContext<any>(null);

const TodoContextProvider: React.FC = ({ children }) => {
	const initialState: ITodo[] = [];
	const [todos, setTodos] = useState<ITodo[]>(initialState);
	const url: string = `${API_URL}/todos/`;

	useEffect(() => {
		function fetchData() {
			axios
				.get(url)
				.then((response) => response.data)
				.then((data) => {
					setTodos(data);
				});
		}
		fetchData();
	}, [url]);

	const addTodo = (todo: ITodo) => {
		axios.post(url, todo).then(() => {
			setTodos((prevTodos) => [...prevTodos, todo]);
		});
	};

	const toggleTodo = (id: string) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				const newTodo = { ...todo, completed: !todo.completed };
				axios.put(`${url}/${todo.id}`, newTodo).then(() => {});
				return newTodo;
			} else {
				return todo;
			}
		});
		setTodos((prevTodos) => newTodos);
	};

	return (
		<TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;
