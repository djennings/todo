const todoTask_1 = 'Sample task #1';
const todoDate_1 = '2021/12/31';

const addNewTodo = async (taskLabel, dueDate = '') => {
	cy.openNew();
	cy.get('input[name="task"]').type(taskLabel);
	if (dueDate.length) {
		cy.get('input[name="dueDate"]').type(dueDate);
	}
	cy.getButton('add').click();
};

describe('The action bar', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.intercept('GET', 'todos/', { fixture: 'get_empty_todos.json' });
		cy.intercept('POST', 'todos/', { fixtures: 'post_response.json' });
	});
	it('contains the new button and the filter options', () => {
		cy.get('input[value="ALL"]').should('be.checked');
		cy.get('input[value="COMPLETED"]').should('not.be.checked');
		cy.get('input[value="INCOMPLETE"]').should('not.be.checked');
		cy.openNew();
		cy.get('[role="dialog"]');
	});
});

describe('Given that the new todo form loads', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.intercept('GET', 'todos/', { fixture: 'get_empty_todos.json' });
		cy.intercept('POST', 'todos/', { fixtures: 'post_response.json' });
	});

	it('loads the new task form correctly', () => {
		cy.openNew();
		cy.getButton('add').should('be.disabled');
		cy.getButton('clear').should('be.disabled');
		cy.getButton('cancel').should('not.be.disabled');
	});

	it('enables the buttons correctly', () => {
		cy.openNew();
		cy.get('input[name="task"]').type(todoTask_1);
		cy.getButton('add').should('not.be.disabled');
		cy.getButton('clear').should('not.be.disabled');
		cy.getButton('cancel').should('not.be.disabled');
	});
});

describe('Given that the new form loads correctly', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.intercept('GET', 'todos/', { fixture: 'get_empty_todos.json' });
		cy.intercept('POST', 'todos/', { fixtures: 'post_response.json' });
	});
	it('adds a new todo with no date', () => {
		addNewTodo(todoTask_1);
		cy.contains(todoTask_1);
	});

	it('adds a new todo with a date', () => {
		addNewTodo(todoTask_1, todoDate_1);
		cy.contains(todoTask_1);
		cy.contains(todoDate_1);
	});

	it('does not add a new todo with an invalid date', () => {
		addNewTodo(todoTask_1, 'xxxxxx');
		cy.get('[role="dialog"]').contains(/invalid date/i);
	});
});

describe('Given that todos are added correctly', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.intercept('GET', 'todos/', { fixture: 'get_empty_todos.json' });
		cy.intercept('POST', 'todos/', { fixtures: 'post_response.json' });
		cy.intercept('PUT', 'todos/', { fixtures: 'post_response.json' });
		cy.intercept('DELETE', 'todos/', {});
	});

	it('updates the complete status when complete button is clicked', () => {
		addNewTodo(todoTask_1);
		cy.getButtonByTitle('Mark to do as completed').click();
		cy.getButtonByTitle('Mark to do as not completed').click();
		cy.getButtonByTitle('Mark to do as completed');
	});

	it('deletes a todo when delete button is clicked', () => {
		addNewTodo(todoTask_1);
		cy.getButtonByTitle('Delete to do').click();
		cy.contains(todoTask_1).should('not.exist');
	});
});
