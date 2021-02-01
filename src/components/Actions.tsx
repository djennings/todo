import React from 'react';
import TodoForm from './TodoForm';

const Actions: React.FC = () => {
	return (
		<div>
			<button>New</button>
			<button>Show Complete</button>
			<button>Show Active</button>
			<TodoForm />
		</div>
	);
};

export default Actions;
