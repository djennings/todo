import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import TodoContainer from './components/TodoContainer';

import './App.css';

const App: React.FC = () => {
	return (
		<TodoContextProvider>
			<TodoContainer />
		</TodoContextProvider>
	);
};

export default App;
