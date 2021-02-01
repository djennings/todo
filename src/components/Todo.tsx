import React from 'react';
import { ITodo } from '../todo.d';

type MyProps = {
	item: ITodo;
};

const Todo = ({ item }: MyProps) => {
	return <li>{item.task}</li>;
};

export default Todo;
