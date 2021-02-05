import React, { useCallback, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import { v4 as uuid } from 'uuid';
import styles from './TodoForm.module.css';
import classnames from 'classnames';

type NewTodo = Omit<ITodo, 'id'>;

const AddTodo = () => {
	const initialState: NewTodo = { task: '', completed: false, dueDate: '' };
	const { addingNew, addTodo, toggleAddingNew } = useContext(TodoContext);
	const [newTodo, setNewTodo] = useState<NewTodo>(initialState);
	const nameRef = useCallback((node) => {
		if (node !== null) {
			node.focus();
		}
	}, []);

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
		if (e.target.name === 'dueDate') {
			const val = e.target.value;
			if (val.length > 10) {
				setNewTodo((prevTodo) => Object.assign({}, prevTodo, { dueDate: '' }));
				return;
			}
			if (val.length === 10) {
				const parts = val.split('/');
				if (
					parts.length !== 3 ||
					isNaN(parseInt(parts[0])) ||
					isNaN(parseInt(parts[1])) ||
					isNaN(parseInt(parts[2]))
				) {
					setNewTodo((prevTodo) =>
						Object.assign({}, prevTodo, { dueDate: '' })
					);
					return;
				} else {
					const d = new Date(
						parseInt(parts[0]),
						parseInt(parts[1]),
						parseInt(parts[2])
					);
					if (isNaN(d.getTime())) {
						setNewTodo((prevTodo) =>
							Object.assign({}, prevTodo, { dueDate: '' })
						);
						return;
					}
				}
			}
		}
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
		<div
			className={classnames(
				`${styles.form}`,
				{ [styles.visible]: addingNew },
				{ [styles.hidden]: !addingNew }
			)}
		>
			<h2>New Task</h2>
			<form onSubmit={handleAdd} autoComplete="off">
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
						ref={nameRef}
					/>
				</div>
				<div className={`${styles.lineItem}`}>
					<label className={`${styles.label}`} htmlFor="dueDate">
						Due Date (Optional):
					</label>
					<input
						className={`${styles.input}`}
						value={newTodo.dueDate}
						id="dueDate"
						name="dueDate"
						onChange={handleChange}
						placeholder="YYYY/MM/DD"
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
