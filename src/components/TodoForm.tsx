import React, { ReactNode, useCallback, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import styles from './TodoForm.module.css';
import classnames from 'classnames';

type NewTodo = Omit<ITodo, 'id'>;
interface IFormData {
	task: string;
	dueDate: string;
}

const AddTodo = () => {
	const initialState: NewTodo = { task: '', completed: false, dueDate: '' };
	const { addingNew, addTodo, toggleAddingNew } = useContext(TodoContext);
	const [newTodo, setNewTodo] = useState<NewTodo>(initialState);
	const { errors, handleSubmit, register, reset } = useForm();
	const nameRef = useCallback((node) => {
		if (node !== null) {
			node.focus();
		}
	}, []);

	const handleAdd = (e: IFormData) => {
		addTodo({ ...newTodo, id: uuid() });
		toggleAddingNew();
		setNewTodo(() => initialState);
		reset();
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleAddingNew();
		setNewTodo(() => initialState);
		reset();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodo((prevTodo) =>
			Object.assign({}, prevTodo, { [e.target.name]: e.target.value })
		);
	};

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setNewTodo(() => initialState);
		reset();
	};

	const mergeRefs = (...refs: Array<any>) => {
		const filteredRefs = refs.filter(Boolean);
		if (!filteredRefs.length) return null;
		if (filteredRefs.length === 0) return filteredRefs[0];
		return (inst: any) => {
			for (const ref of filteredRefs) {
				if (typeof ref === 'function') {
					ref(inst);
				} else if (ref) {
					ref.current = inst;
				}
			}
		};
	};

	const validateDate = (date: string) => {
		if (!date.length) {
			return true;
		}
		if (date.length !== 10) {
			return false;
		}
		if (date.length === 10) {
			const parts = date.split('/');
			if (
				parts.length !== 3 ||
				isNaN(parseInt(parts[0])) ||
				isNaN(parseInt(parts[1])) ||
				isNaN(parseInt(parts[2]))
			) {
				return false;
			} else {
				const d = new Date(
					parseInt(parts[0]),
					parseInt(parts[1]),
					parseInt(parts[2])
				);
				if (isNaN(d.getTime())) {
					return false;
				}
			}
		}
		return true;
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
						ref={mergeRefs(register, nameRef)}
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
