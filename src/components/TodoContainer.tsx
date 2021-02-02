import React, { useContext } from 'react';
import TodoList from './TodoList';
import Actions from './Actions';
import TodoForm from './TodoForm';
import { TodoContext } from '../contexts/TodoContext';
import styles from './TodoContainer.module.css';

import '../App.css';

const TodoContainer: React.FC = () => {
	const { addingNew } = useContext(TodoContext);
	return (
		<div className={`${styles.container}`}>
			<Actions />
			{addingNew ? <TodoForm /> : null}
			<div className="App">
				<TodoList />
			</div>
		</div>
	);
};

export default TodoContainer;
