import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ITodo } from '../todo.d';

const API_URL = 'http://localhost:8000';

export const TodoContext = createContext<any>(null);

const TodoContextProvider: React.FC = ({ children }) => {
	const initialState: ITodo[] = [];

	const [todos, setTodos] = useState<ITodo[]>(initialState);
	const [addingNew, setAddingNew] = useState<boolean>(false);
	const [filterItems, setFilterItems] = useState<string>('all');
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
		return () => {};
	}, [url]);

	const addTodo = (todo: ITodo) => {
		axios.post(url, todo).then(() => {
			setTodos((prevTodos) => [...prevTodos, todo]);
		});
	};

	const deleteTodo = (id: string) => {
		const newTodos = todos.filter((todo) => {
			if (todo.id !== id) {
				return todo;
			} else {
				axios.delete(`${url}/${todo.id}`);
				return false;
			}
		});
		setTodos((prevTodos) => newTodos);
	};

	const setFilter = (value: string) => {
		setFilterItems(() => value);
	};

	const toggleAddingNew = () => {
		setAddingNew((prevAdding) => !prevAdding);
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
		<TodoContext.Provider
			value={{
				todos,
				addTodo,
				addingNew,
				deleteTodo,
				filterItems,
				setFilter,
				toggleAddingNew,
				toggleTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;
