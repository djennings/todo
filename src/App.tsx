import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import TodoList from './components/TodoList';
import Actions from './components/Actions';

import './App.css';

const App: React.FC = () => {
	return (
		<TodoContextProvider>
			<Actions />
			<div className="App">
				<TodoList />
			</div>
		</TodoContextProvider>
	);
};

export default App;
