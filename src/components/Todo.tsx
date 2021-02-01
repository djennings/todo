import React from 'react';
import { ITodo } from '../todo.d';

type MyProps = {
	item: ITodo;
};

const Todo: React.FC<MyProps> = ({ item }: MyProps) => {
	return <li>{item.task}</li>;
};

export default Todo;
