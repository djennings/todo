import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import TodoContextProvider from './contexts/TodoContext';
// import TodoContainer from './components/TodoContainer';

describe('Given that the main container is rendered', () => {
	render(
		<TodoContextProvider>
			<App />
		</TodoContextProvider>
	);
	it('renders new (add), show complete and show active buttons', () => {
		expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/not complete/i)).toBeInTheDocument();
	});

	// it('renders the header', () => {
	// screen.debug();
	// const header = screen.getByRole('heading');
	// expect(header).toBeInTheDocument();
	// });
});
