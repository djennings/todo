import React, { useContext } from 'react';
import { ITodo } from '../todo.d';
import { TodoContext } from '../contexts/TodoContext';
import classnames from 'classnames';
import styles from './todo.module.css';
import deleteIcon from '../delete.svg';
import checkmark from '../checkmark.svg';

type MyProps = {
	item: ITodo;
};

const Todo: React.FC<MyProps> = ({ item }: MyProps) => {
	const { deleteTodo, toggleTodo } = useContext(TodoContext);

	const handleCompleted = () => {
		toggleTodo(item.id);
	};

	const handleDelete = () => {
		deleteTodo(item.id);
	};

	console.log(item.completed);
	return (
		<li className={`${styles.lineItem}`}>
			<span
				className={classnames(`${styles.todo}`, {
					[styles.completed]: item.completed,
				})}
			>
				{item.task}
			</span>
			<img
				onClick={handleDelete}
				className={`${styles.deleteIcon}`}
				src={deleteIcon}
				alt="delete"
			/>

			<img
				onClick={handleCompleted}
				className={`${styles.checkmarkIcon}`}
				src={checkmark}
				alt="completed"
			/>
		</li>
	);
};

export default Todo;
