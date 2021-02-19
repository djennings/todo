import React from 'react';
import { addNewTodo, render, screen, waitFor } from './test-utils';
import userEvent from '@testing-library/user-event';
import App from './App';
import { requestPayload } from './utils/testUtils';

const todoDate1 = '2021/12/31';
const todoDate2 = '2020/9/1';

const todo1 = {
	task: 'Sample Task 1',
	dueDate: '',
	completed: false,
	id: expect.anything(),
};

const todo2 = {
	task: 'Sample Task 2',
	dueDate: '',
	completed: false,
	id: expect.anything(),
};

describe('Given that the main container is rendered', () => {
	beforeEach(async () => {
		render(<App />, {});

		await screen.findByRole(/listitem/i);
	});

	afterEach(() => {});
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
		render(<App />, {});

		await screen.findByRole(/listitem/i);
	});

	it('adds a new task with no date1', async () => {
		await addNewTodo(todo1.task);

		expect(JSON.parse(requestPayload('end:/todos/', 'POST'))).toMatchObject(
			todo1
		);

		const newItemText = await screen.findByText(todo1.task);
		expect(newItemText).toBeInTheDocument();
	});

	it('adds a new task with date', async () => {
		await addNewTodo(todo1.task, todoDate1);

		expect(JSON.parse(requestPayload('end:/todos/', 'POST'))).toMatchObject({
			...todo1,
			dueDate: todoDate1,
		});

		const newItemText = await screen.findByText(todo1.task);
		expect(newItemText).toBeInTheDocument();

		const newItemDueDate = await screen.findByText(todoDate1);
		expect(newItemDueDate).toBeInTheDocument();
	});

	it('catches the error for an invalid date', async () => {
		await addNewTodo(todo1.task, 'xxxxxx');

		const dateErrorMessage = await screen.findByText(/invalid date/i);
		expect(dateErrorMessage).toBeInTheDocument();
	});

	it('deletes an existing task', async () => {
		await addNewTodo(todo1.task);
		await addNewTodo(todo2.task);

		const deleteButton = screen.getAllByRole('button', {
			name: /delete to do/i,
		});
		userEvent.click(deleteButton[0]);

		expect(requestPayload('express:/todos//:id', 'DELETE')).toEqual('');

		expect(
			await waitFor(() => {
				screen.queryByText(todo1.task);
			})
		).not.toBeTruthy();
	});

	it('updates the completed status', async () => {
		await addNewTodo(todo1.task);
		expect(JSON.parse(requestPayload('end:/todos/', 'POST'))).toMatchObject(
			todo1
		);
		await addNewTodo(todo2.task);
		expect(JSON.parse(requestPayload('end:/todos/', 'POST'))).toMatchObject(
			todo2
		);

		const completeButton = screen.getAllByRole('button', {
			name: /mark to do as completed/i,
		});

		expect(completeButton.length).toEqual(2);

		userEvent.click(completeButton[0]);

		expect(
			JSON.parse(requestPayload('express:/todos//:id', 'PUT'))
		).toMatchObject({ ...todo1, completed: true });

		const unCompleteButton = screen.getByRole('button', {
			name: /Mark to do as not completed/i,
		});
		expect(unCompleteButton).toBeTruthy();

		userEvent.click(unCompleteButton);

		expect(
			JSON.parse(requestPayload('express:/todos//:id', 'PUT'))
		).toMatchObject({ ...todo1, completed: false });

		expect(
			screen.getAllByRole('button', {
				name: /mark to do as completed/i,
			}).length
		).toEqual(2);
	});

	it('shows the filtered rows', async () => {
		await addNewTodo(todo1.task);

		const completeButton = screen.getByRole('button', {
			name: /mark to do as completed/i,
		});
		userEvent.click(completeButton);

		await addNewTodo(todo2.task, todoDate2);

		let todoList = screen.getAllByRole(/listitem/i);
		expect(todoList.length).toBe(2);
		expect(screen.getByText(todo1.task)).toBeInTheDocument();
		expect(screen.getByText(todo2.task)).toBeInTheDocument();

		const showCompleted = screen.getByRole('radio', {
			name: /completed/i,
		});
		userEvent.click(showCompleted);
		todoList = screen.getAllByRole(/listitem/i);

		expect(todoList.length).toBe(1);
		expect(screen.getByText(todo1.task)).toBeInTheDocument();
		expect(screen.queryByText(todo2.task)).not.toBeInTheDocument();

		const showNotCompleted = screen.getByText(/not complete/i);
		userEvent.click(showNotCompleted);
		todoList = screen.getAllByRole(/listitem/i);

		expect(todoList.length).toBe(1);
		expect(screen.queryByText(todo1.task)).not.toBeInTheDocument();
		expect(screen.getByText(todo2.task)).toBeInTheDocument();
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

		userEvent.type(taskName, todo1.task);

		expect(clearBtn).not.toBeDisabled();

		const dateInput = screen.getByRole('textbox', {
			name: /due date \(optional\):/i,
		});
		userEvent.type(dateInput, todoDate1);

		expect(screen.getByDisplayValue(todo1.task)).toBeTruthy();
		expect(screen.getByDisplayValue(todoDate1)).toBeTruthy();

		userEvent.click(screen.getByRole('button', { name: /clear/i }));

		expect(screen.queryByDisplayValue(todo1.task)).not.toBeTruthy();
		expect(screen.queryByDisplayValue(todoDate1)).not.toBeTruthy();
	});
});
