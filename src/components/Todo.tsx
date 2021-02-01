import React, { useContext } from 'react';
import { ITodo } from '../todo.d';
import { TodoContext } from '../contexts/TodoContext';
import classnames from 'classnames';

type MyProps = {
	item: ITodo;
};

const Todo: React.FC<MyProps> = ({ item }: MyProps) => {
	const { toggleTodo } = useContext(TodoContext);

	const handleCompleted = () => {
		toggleTodo(item.id);
	};
	return (
		<li
			className={classnames('todo', { completed: item.completed })}
			onClick={handleCompleted}
		>
			{item.task}
		</li>
	);
};

export default Todo;
