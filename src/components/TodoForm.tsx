import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import { v4 as uuid } from 'uuid';

type NewTodo = Omit<ITodo, 'id'>;

const AddTodo = () => {
	const initialState: NewTodo = { task: '', completed: false, dueDate: '' };
	const { addTodo } = useContext(TodoContext);
	const [newTodo, setNewTodo] = useState<NewTodo>(initialState);

	const handleAdd = (e: any) => {
		e.preventDefault();
		addTodo({ ...newTodo, id: uuid() });
		console.log('adding');
	};

	const handleChange = (e: any) => {
		setNewTodo((prevTodo) =>
			Object.assign({}, prevTodo, { [e.target.name]: e.target.value })
		);
	};

	return (
		<form onSubmit={handleAdd}>
			<div>
				<label>
					Task:
					<input value={newTodo.task} name="task" onChange={handleChange} />
				</label>
			</div>
			<div>
				<button type="submit">Add</button>
			</div>
		</form>
	);
};

export default AddTodo;
