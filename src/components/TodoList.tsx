import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import Todo from './Todo';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
	const { todos } = useContext(TodoContext);
	return (
		<div className={`${styles.listContainer}`}>
			<h1 className={`${styles.title}`}>Todo's:</h1>
			<div className={`${styles.wrapper}`}>
				<ul className={`${styles.todoList}`}>
					{todos.map((todo: ITodo) => {
						return <Todo key={todo.id} item={todo} />;
					})}
				</ul>
			</div>
		</div>
	);
};

export default TodoList;
