import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Filter, ITodo } from '../todo.d';
import Todo from './Todo';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
	const { filterItems, loading, todos } = useContext(TodoContext);
	const buildList = () => {
		const list = todos.reduce((filtered: JSX.Element[], todo: ITodo) => {
			if (filterItems === Filter.All) {
				filtered.push(<Todo key={todo.id} item={todo} />);
			} else if (filterItems === Filter.Completed && todo.completed) {
				filtered.push(<Todo key={todo.id} item={todo} />);
			} else if (filterItems === Filter.Incomplete && !todo.completed) {
				filtered.push(<Todo key={todo.id} item={todo} />);
			}
			return filtered;
		}, []);
		if (!list.length) {
			return <li>No Todo's available</li>;
		}
		return list;
	};
	return (
		<div className={`${styles.listContainer}`}>
			<h1 className={`${styles.title}`}>Todo's:</h1>
			<div className={`${styles.wrapper}`}>
				<ul className={`${styles.todoList}`}>
					{loading ? <li>Loading...</li> : buildList()}
				</ul>
			</div>
		</div>
	);
};

export default TodoList;
