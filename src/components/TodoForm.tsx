import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import { v4 as uuid } from 'uuid';
import styles from './TodoForm.module.css';

type NewTodo = Omit<ITodo, 'id'>;

const AddTodo = () => {
	const initialState: NewTodo = { task: '', completed: false, dueDate: '' };
	const { addTodo, toggleAddingNew } = useContext(TodoContext);
	const [newTodo, setNewTodo] = useState<NewTodo>(initialState);

	const handleAdd = (e: any) => {
		e.preventDefault();
		addTodo({ ...newTodo, id: uuid() });
		toggleAddingNew();
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleAddingNew();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodo((prevTodo) =>
			Object.assign({}, prevTodo, { [e.target.name]: e.target.value })
		);
	};

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setNewTodo(() => initialState);
	};

	const disabled = newTodo.task.length === 0;

	return (
		<div className={`${styles.form}`}>
			<h2>New Task</h2>
			<form onSubmit={handleAdd}>
				<div className={`${styles.lineItem}`}>
					<label className={`${styles.label}`} htmlFor="name">
						New Task Label:
					</label>
					<input
						className={`${styles.input}`}
						value={newTodo.task}
						id="name"
						name="task"
						onChange={handleChange}
					/>
				</div>
				<div className={`${styles.buttons}`}>
					<button disabled={disabled} type="submit">
						Add
					</button>
					<button disabled={disabled} onClick={handleReset}>
						Clear
					</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default AddTodo;
