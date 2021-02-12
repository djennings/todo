const todoTask_1 = 'Sample task #1';

describe('The action bar', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.intercept('GET', 'todos/', { fixture: 'get_all_todos.json' });
		cy.intercept('POST', 'todos/', { fixtures: 'post_response.json' });
	});
	it('contains the new button and the filter options', () => {
		cy.get('input[value="ALL"]').should('be.checked');
		cy.get('input[value="COMPLETED"]').should('not.be.checked');
		cy.get('input[value="INCOMPLETE"]').should('not.be.checked');
		cy.openNew();
		cy.get('[role="dialog"]');
	});

	it('loads the new task form correctly', () => {
		cy.openNew();
		cy.getButton('add').should('be.disabled');
		cy.getButton('clear').should('be.disabled');
		cy.getButton('cancel').should('not.be.disabled');
	});

	it('test add new form with no date', () => {
		cy.openNew();
		cy.get('input[name="task"]').type(todoTask_1);
		cy.getButton('add').click();
		cy.contains(todoTask_1);
	});
});
