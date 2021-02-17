import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoContextProvider from './contexts/TodoContext';
import setupMocks from './utils/mock';

const AllTheProviders = ({ children }: { children: ReactChild }) => {
	return <TodoContextProvider>{children}</TodoContextProvider>;
};

const customRender = (ui: any, options: any): void => {
	setupMocks();
	render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

const addNewTodo = async (taskLabel: string, dueDate: string = '') => {
	const newBtn = screen.getByRole('button', { name: /new/i });
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
		await screen.findByText(taskLabel);
	} catch (err) {}
};

export { addNewTodo };
