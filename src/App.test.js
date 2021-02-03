import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import TodoContextProvider from './contexts/TodoContext';

describe('Given that the main container is rendered', () => {
	beforeEach(async () => {
		render(
			<TodoContextProvider>
				<App />
			</TodoContextProvider>
		);

		//  wait for the intial data load to occur before beginning tests
		await waitFor(() =>
			expect(screen.getByText(/finish this/i)).toBeInTheDocument()
		);
	});
	it('renders new (add), show complete and show active controls and the header', async () => {
		expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/not complete/i)).toBeInTheDocument();
	});
	it('renders new (add), show complete and show active controls and the header 2', async () => {
		expect(
			screen.getByRole('heading', { name: /todo's:/i })
		).toBeInTheDocument();
	});
});
