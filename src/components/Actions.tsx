import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import styles from './Actions.module.css';

const Actions: React.FC = () => {
	const { toggleAddingNew } = useContext(TodoContext);
	const handleAddNew = () => {
		toggleAddingNew();
	};
	return (
		<div className={`${styles.actions}`}>
			<button onClick={handleAddNew} className={`${styles.action}`}>
				New
			</button>
			<button className={`${styles.action}`}>Show Complete</button>
			<button className={`${styles.action}`}>Show Active</button>
		</div>
	);
};

export default Actions;
