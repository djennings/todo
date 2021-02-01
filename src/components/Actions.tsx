import React from 'react';
import TodoForm from './TodoForm';
import styles from './Actions.module.css';

const Actions: React.FC = () => {
	return (
		<div>
			<button className={`${styles.action}`}>New</button>
			<button className={`${styles.action}`}>Show Complete</button>
			<button className={`${styles.action}`}>Show Active</button>
			<TodoForm />
		</div>
	);
};

export default Actions;
