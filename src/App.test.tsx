import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import TodoContextProvider from './contexts/TodoContext';
import setupMocks from './utils/mock';

const todoLabel1 = 'Sample Task 1';
const todoLabel2 = 'Sample Task 2';
const todoDate1 = '2021/12/31';

const addNewTodo = async (
	env: any,
	taskLabel: string,
	dueDate: string = ''
) => {
	const newBtn = env.getByRole('button', { name: /new/i });
	userEvent.click(newBtn);

	const taskName = screen.getByRole('textbox', {
		name: /new task label:/i,
	});

	userEvent.type(taskName, taskLabel);

	if (dueDate.length) {
		const dateInput = screen.getByRole('textbox', {
			name: /due date \(optional\):/i,
		});
		userEvent.type(dateInput, dueDate);
	}

	const addBtn = screen.getByRole('button', { name: /add/i });
	userEvent.click(addBtn);

	try {
		await env.findByText(taskLabel);
	} catch (err) {}
};

describe('Given that the main container is rendered', () => {
	beforeEach(async () => {
		setupMocks();
		render(
			<TodoContextProvider>
				<App />
			</TodoContextProvider>
		);

		await screen.findByRole(/listitem/i);
	});
	it(`renders 'new' button (add) and filter controls`, () => {
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
		await addNewTodo(screen, todoLabel1);

		const newItemText = await screen.findByText(todoLabel1);
		expect(newItemText).toBeInTheDocument();
	});

	it('adds a new task with date', async () => {
		await addNewTodo(screen, todoLabel1, todoDate1);

		const newItemText = await screen.findByText(todoLabel1);
		expect(newItemText).toBeInTheDocument();

		const newItemDueDate = await screen.findByText(todoDate1);
		expect(newItemDueDate).toBeInTheDocument();
	});

	it('catches the error for an invalid date', async () => {
		await addNewTodo(screen, todoLabel1, 'xxxxxx');

		const dateErrorMessage = await screen.findByText(/invalid date/i);
		expect(dateErrorMessage).toBeInTheDocument();
	});

	it('deletes an existing task', async () => {
		await addNewTodo(screen, todoLabel1);

		const deleteButton = screen.getByRole('button', { name: /delete to do/i });
		userEvent.click(deleteButton);

		expect(
			await waitFor(() => {
				screen.queryByText(/Sample Task 1/i);
			})
		).not.toBeTruthy();
	});

	it('updates the completed status', async () => {
		await addNewTodo(screen, todoLabel1);

		const completeButton = screen.getByRole('button', {
			name: /mark to do as completed/i,
		});

		expect(completeButton).toBeTruthy();

		userEvent.click(completeButton);
		const unCompleteButton = screen.getByRole('button', {
			name: /Mark to do as not completed/i,
		});
		expect(unCompleteButton).toBeTruthy();

		userEvent.click(unCompleteButton);
		expect(
			screen.getByRole('button', {
				name: /mark to do as completed/i,
			})
		).toBeTruthy();
	});

	it('shows the filtered rows', async () => {
		await addNewTodo(screen, todoLabel1);

		const completeButton = screen.getByRole('button', {
			name: /mark to do as completed/i,
		});
		userEvent.click(completeButton);

		await addNewTodo(screen, todoLabel2, todoDate1);

		let todoList = screen.getAllByRole(/listitem/i);
		expect(todoList.length).toBe(2);
		expect(screen.getByText(/Sample Task 1/i)).toBeInTheDocument();
		expect(screen.getByText(/Sample Task 2/i)).toBeInTheDocument();

		const showCompleted = screen.getByRole('radio', {
			name: /completed/i,
		});
		userEvent.click(showCompleted);
		todoList = screen.getAllByRole(/listitem/i);

		expect(todoList.length).toBe(1);
		expect(screen.getByText(/Sample Task 1/i)).toBeInTheDocument();
		expect(screen.queryByText(/Sample Task 2/i)).not.toBeInTheDocument();

		const showNotCompleted = screen.getByText(/not complete/i);
		userEvent.click(showNotCompleted);
		todoList = screen.getAllByRole(/listitem/i);

		expect(todoList.length).toBe(1);
		expect(screen.queryByText(/Sample Task 1/i)).not.toBeInTheDocument();
		expect(screen.getByText(/Sample Task 2/i)).toBeInTheDocument();
	});

	it('will cancel an add when cancel button clicked', () => {
		const newBtn = screen.getByRole('button', { name: /new/i });
		userEvent.click(newBtn);

		expect(screen.getByRole('dialog')).toBeTruthy();

		userEvent.click(screen.getByRole('button', { name: /cancel/i }));

		expect(screen.queryByRole('dialog')).not.toBeTruthy();
	});

	it('will clear all fields when reset button clicked', () => {
		const newBtn = screen.getByRole('button', { name: /new/i });
		userEvent.click(newBtn);

		const clearBtn = screen.getByRole('button', { name: /clear/i });

		expect(clearBtn).toBeDisabled();

		const taskName = screen.getByRole('textbox', {
			name: /new task label:/i,
		});

		userEvent.type(taskName, todoLabel1);

		expect(clearBtn).not.toBeDisabled();

		const dateInput = screen.getByRole('textbox', {
			name: /due date \(optional\):/i,
		});
		userEvent.type(dateInput, todoDate1);

		expect(screen.getByDisplayValue(todoLabel1)).toBeTruthy();
		expect(screen.getByDisplayValue(todoDate1)).toBeTruthy();

		userEvent.click(screen.getByRole('button', { name: /clear/i }));

		expect(screen.queryByDisplayValue(todoLabel1)).not.toBeTruthy();
		expect(screen.queryByDisplayValue(todoDate1)).not.toBeTruthy();
	});
});
