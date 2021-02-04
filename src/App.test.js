import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import TodoContextProvider from './contexts/TodoContext';
import axios from 'axios';

jest.mock('axios');

describe('Given that the main container is rendered', () => {
	beforeEach(async () => {
		axios.get.mockResolvedValue({
			data: [
				{
					task: 'Finish writing this app',
					completed: false,
					dueDate: '',
					id: '6587c285-10b7-41ee-8b2e-9e0cdc4ce62c',
				},
			],
		});
		render(
			<TodoContextProvider>
				<App />
			</TodoContextProvider>
		);

		await screen.findByText(/Finish writing this app/i);
	});
	it('renders new (add), show complete and show active controls and the header', () => {
		expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/not complete/i)).toBeInTheDocument();
	});
	it('renders new (add), show complete and show active controls and the header 2', () => {
		expect(
			screen.getByRole('heading', { name: /todo's:/i })
		).toBeInTheDocument();
	});
});
