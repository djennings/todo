import React, { useContext } from 'react';
import { ITodo } from '../todo.d';
import { TodoContext } from '../contexts/TodoContext';
import classnames from 'classnames';
import styles from './Todo.module.css';
import deleteIcon from '../delete.svg';
import checkmark from '../checkmark-solid.svg';

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

	const calcPastDue = (date: string) => {
		const d = new Date(date);
		const t = new Date();
		return d < t;
	};

	const pastDue = calcPastDue(item.dueDate);

	return (
		<li className={`${styles.lineItem}`}>
			<button
				className={`${styles.actionButton}`}
				onClick={handleDelete}
				tabIndex={0}
				title="Delete to do"
			>
				<img alt="delete" className={`${styles.deleteIcon}`} src={deleteIcon} />
			</button>
			<button
				className={`${styles.actionButton}`}
				onClick={handleCompleted}
				title={`Mark to do as ${
					item.completed ? 'not completed' : 'completed'
				}`}
			>
				<img
					alt="completed"
					className={classnames(`${styles.checkmarkIcon}`, {
						[styles.completed]: item.completed,
					})}
					src={checkmark}
				/>
			</button>
			<span
				className={classnames(`${styles.todo}`, {
					[styles.completed]: item.completed,
				})}
				tabIndex={0}
			>
				{item.task}
			</span>
			<span
				className={classnames({
					[styles.pastDue]: pastDue && !item.completed,
					[styles.completed]: item.completed,
				})}
			>
				{item.dueDate}
			</span>
		</li>
	);
};

export default Todo;
