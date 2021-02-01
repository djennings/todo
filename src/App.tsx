import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = () => {
	return (
		<TodoContextProvider>
			<div className="App">
				<TodoList />
			</div>
		</TodoContextProvider>
	);
};

export default App;
