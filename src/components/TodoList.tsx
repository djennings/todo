import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import Todo from './Todo';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
	const { filterItems, todos } = useContext(TodoContext);
	return (
		<div className={`${styles.listContainer}`}>
			<h1 className={`${styles.title}`}>Todo's:</h1>
			<div className={`${styles.wrapper}`}>
				<ul className={`${styles.todoList}`}>
					{todos.reduce((filtered: JSX.Element[], todo: ITodo) => {
						if (filterItems === 'all') {
							filtered.push(<Todo key={todo.id} item={todo} />);
						} else if (filterItems === 'completed' && todo.completed) {
							filtered.push(<Todo key={todo.id} item={todo} />);
						} else if (filterItems === 'incomplete' && !todo.completed) {
							filtered.push(<Todo key={todo.id} item={todo} />);
						}
						return filtered;
					}, [])}
				</ul>
			</div>
		</div>
	);
};

export default TodoList;
