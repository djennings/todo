import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import useMergedRef from '@react-hook/merged-ref';
import styles from './TodoForm.module.css';
import classnames from 'classnames';

type NewTodo = Omit<ITodo, 'id'>;

const AddTodo: React.FC = () => {
	const initialState: NewTodo = { task: '', completed: false, dueDate: '' };
	const { addingNew, addTodo, toggleAddingNew } = useContext(TodoContext);
	const [newTodo, setNewTodo] = useState<NewTodo>(initialState);
	const [fadeStyle, setFadeStyle] = useState({ opacity: 0 });
	const { clearErrors, errors, handleSubmit, register, reset } = useForm();

	const nameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		/* istanbul ignore next */
		if (nameRef && nameRef.current) {
			nameRef.current.focus();
		}
		setFadeStyle({ opacity: 1 });
	}, []);

	const registerNameRef = useMergedRef(nameRef, register);

	const formatDate = (date: string): string => {
		const newDate = new Date(date);
		const month = (newDate.getMonth() + 1).toString();
		const day = newDate.getDate().toString();
		const year = newDate.getFullYear();
		return `${year}/${month.length === 1 ? 0 + month : month}/${
			day.length === 1 ? 0 + day : day
		}`;
	};

	const handleAdd = () => {
		let dueDate = newTodo.dueDate;
		if (dueDate.length) {
			dueDate = formatDate(dueDate);
		}
		const data = { ...newTodo, dueDate };
		addTodo({ ...data, id: uuid() });
		toggleAddingNew();
		setNewTodo(initialState);
		reset();
		clearErrors();
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleAddingNew();
		setNewTodo(initialState);
		reset();
		clearErrors();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearErrors([e.target.name]);
		setNewTodo((prevTodo) =>
			Object.assign({}, prevTodo, { [e.target.name]: e.target.value })
		);
	};

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setNewTodo(() => initialState);
		reset();
		clearErrors();
	};

	const validateDate = (date: string): boolean => {
		if (!date.length) {
			return true;
		}
		if (isNaN(Date.parse(date))) {
			return false;
		}

		return true;
	};

	const disabled = newTodo.task.length === 0;

	return (
		<div
			aria-label="New Todo Dialog"
			className={classnames(
				`${styles.form}`,
				{ [styles.visible]: addingNew },
				{ [styles.hidden]: !addingNew }
			)}
			role="dialog"
			style={fadeStyle}
		>
			<h2>New Task</h2>
			<form onSubmit={handleSubmit(handleAdd)} autoComplete="off">
				<div className={`${styles.lineItem}`}>
					<label className={`${styles.label}`} htmlFor="name">
						New Task Label:
					</label>
					<input
						className={`${styles.input}`}
						defaultValue=""
						id="name"
						name="task"
						onChange={handleChange}
						ref={registerNameRef}
					/>
				</div>
				<div className={`${styles.lineItem}`}>
					<label className={`${styles.label}`} htmlFor="dueDate">
						Due Date (Optional):
					</label>
					<input
						className={`${styles.input}`}
						defaultValue=""
						id="dueDate"
						name="dueDate"
						onChange={handleChange}
						placeholder="YYYY/MM/DD"
						ref={register({ validate: validateDate })}
					/>
					{errors.dueDate && (
						<p className={`${styles.errorMessage}`}>Invalid date</p>
					)}
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
