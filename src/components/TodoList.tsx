import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import Todo from './Todo';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
	const { todos } = useContext(TodoContext);
	return (
		<ul className={`${styles.todoList}`}>
			{todos.map((todo: ITodo) => {
				return <Todo key={todo.id} item={todo} />;
			})}
		</ul>
	);
};

export default TodoList;
