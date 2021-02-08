import React, { createContext, useEffect, useState } from 'react';
import { Filter, ITodo } from '../todo.d';

const API_URL = 'http://localhost:8000';

export const TodoContext = createContext<any>(null);

const TodoContextProvider: React.FC = ({ children }) => {
	const initialState: ITodo[] = [];

	const [todos, setTodos] = useState<ITodo[]>(initialState);
	const [addingNew, setAddingNew] = useState<boolean>(false);
	const [filterItems, setFilterItems] = useState<string>(Filter.All);
	const [loading, setLoading] = useState(true);
	const url: string = `${API_URL}/todos/`;

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(url);
			const data = await response.json();
			setTodos(() => data);
		}
		fetchData();
		setLoading(false);
		return () => {};
	}, [url]);

	const addTodo = async (todo: ITodo) => {
		const body = JSON.stringify(todo);
		await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});
		setTodos((prevTodos) => [...prevTodos, todo]);
	};

	const doDelete = async (id: string) => {
		await fetch(`${url}/${id}`, {
			method: 'DELETE',
		});
	};

	const deleteTodo = async (id: string) => {
		const newTodos = todos.filter((todo) => {
			if (todo.id !== id) {
				return todo;
			} else {
				doDelete(todo.id);
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
				fetch(`${url}/${todo.id}`, {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
					body: JSON.stringify(newTodo),
				});
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
				loading,
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
