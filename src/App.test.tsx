import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import TodoContextProvider from './contexts/TodoContext';
import fetchMock from 'fetch-mock';

// (global as any).fetch = () =>
// 	Promise.resolve({
// 		json: () => Promise.resolve([]),
// 	});

describe('Given that the main container is rendered', () => {
	beforeEach(async () => {
		fetchMock.reset();
		fetchMock.get(
			'http://localhost:9000/todos/',
			'[{"task": "test2", "completed": false,"dueDate": "","id": "228aab0b-8823-4dfb-97a6-9e84db0ede13"}]'
		);
		fetchMock.get('http://localhost:8000/todos/', '[]');
		fetchMock.post('http://localhost:8000/todos/', {
			task: 'test',
			completed: false,
			dueDate: '',
			id: '36850f6f-558d-4c6c-83c7-9cbf79a66da8',
		});
		fetchMock.put('*', {
			task: 'test',
			completed: false,
			dueDate: '',
			id: '36850f6f-558d-4c6c-83c7-9cbf79a66da8',
		});
		fetchMock.delete('*', {});
		render(
			<TodoContextProvider>
				<App />
			</TodoContextProvider>
		);

		await screen.findByRole(/listitem/i);
	});
	it('renders new (add), show complete and show active controls', () => {
		expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/not complete/i)).toBeInTheDocument();
	});
	it('renders the header', () => {
		expect(
			screen.getByRole('heading', { name: /todo's:/i })
		).toBeInTheDocument();
	});

	it('renders no initial tasks', () => {
		expect(screen.getByText(/No Todo's available/i)).toBeInTheDocument();
	});
});

describe('Actions', () => {
	beforeEach(async () => {
		jest.clearAllMocks();
		render(
			<TodoContextProvider>
				<App />
			</TodoContextProvider>
		);

		await screen.findByRole(/listitem/i);
	});

	it('adds a new task with no date', async () => {
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		const newBtn = screen.getByRole('button', { name: /new/i });
		userEvent.click(newBtn);

		expect(screen.queryByRole('dialog')).toBeInTheDocument();

		const taskName = screen.getByRole('textbox', {
			name: /new task label:/i,
		});

		userEvent.type(taskName, 'Sample Task 1');

		const addBtn = screen.getByRole('button', { name: /add/i });
		userEvent.click(addBtn);

		const newItemText = await screen.findByText('Sample Task 1');
		expect(newItemText).toBeInTheDocument();
	});

	it('adds a new task with date', async () => {
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		const newBtn = screen.getByRole('button', { name: /new/i });
		userEvent.click(newBtn);

		expect(screen.queryByRole('dialog')).toBeInTheDocument();

		const taskName = screen.getByRole('textbox', {
			name: /new task label:/i,
		});
		userEvent.type(taskName, 'Sample Task 1');

		const taskDate = screen.getByRole('textbox', {
			name: /due date \(optional\):/i,
		});
		userEvent.type(taskDate, '2021/12/31');

		const addBtn = screen.getByRole('button', { name: /add/i });
		userEvent.click(addBtn);

		const newItemText = await screen.findByText('Sample Task 1');
		expect(newItemText).toBeInTheDocument();

		const newItemDueDate = await screen.findByText('2021/12/31');
		expect(newItemDueDate).toBeInTheDocument();
	});

	it('deletes an existing task', async () => {
		userEvent.click(screen.getByRole('button', { name: /new/i }));
		userEvent.type(
			screen.getByRole('textbox', {
				name: /new task label:/i,
			}),
			'Sample Task 1'
		);
		userEvent.click(screen.getByRole('button', { name: /add/i }));
		expect(await screen.findByText(/Sample Task 1/i)).toBeInTheDocument();
		const newItemText = await screen.findByRole('listitem');
		expect(newItemText).toBeTruthy();

		const deleteButton = screen.getByRole('button', { name: /delete to do/i });
		userEvent.click(deleteButton);

		expect(
			await waitFor(() => {
				screen.queryByText(/Sample Task 1/i);
			})
		).not.toBeTruthy();
	});

	it('updates the completed status', async () => {
		userEvent.click(screen.getByRole('button', { name: /new/i }));
		userEvent.type(
			screen.getByRole('textbox', {
				name: /new task label:/i,
			}),
			'Sample Task 1'
		);
		userEvent.click(screen.getByRole('button', { name: /add/i }));
		expect(await screen.findByText(/Sample Task 1/i)).toBeInTheDocument();
		const newItemText = await screen.findByRole('listitem');
		expect(newItemText).toBeTruthy();

		const completeButton = screen.getByRole('button', {
			name: /mark to do as completed/i,
		});

		expect(completeButton).toBeTruthy();

		userEvent.click(completeButton);
		const unCompleteButton = screen.getByRole('button', {
			name: /Mark to do as not completed/i,
		});
		expect(unCompleteButton).toBeTruthy();
	});
});
