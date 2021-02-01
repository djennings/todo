import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ITodo } from '../todo.d';
import Todo from './Todo';

const TodoList = () => {
	const { todos } = useContext(TodoContext);
	return (
		<ul>
			{todos.map((todo: ITodo) => {
				return <Todo key={todo.id} item={todo} />;
			})}
		</ul>
	);
};

export default TodoList;
