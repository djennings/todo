import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders new (add), show complete and show active buttons', () => {
	render(<App />);
	expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument();
	expect(
		screen.getByRole('button', { name: /show complete/i })
	).toBeInTheDocument();
	expect(
		screen.getByRole('button', { name: /show active/i })
	).toBeInTheDocument();
});
