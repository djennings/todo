import fetchMock from 'fetch-mock';
const setupMocks = () => {
	fetchMock.config.overwriteRoutes = true;
	fetchMock.reset();
	fetchMock.get(
		'http://localhost:9000/todos/',
		'[{"task": "test2", "completed": false,"dueDate": "","id": "228aab0b-8823-4dfb-97a6-9e84db0ede13"}]'
	);
	fetchMock.get('end:/todos/', '[]');
	fetchMock.post('end:/todos/', {
		task: 'test',
		completed: false,
		dueDate: '',
		id: '36850f6f-558d-4c6c-83c7-9cbf79a66da8',
	});
	fetchMock.put('express:/todos//:id', {
		task: 'test',
		completed: false,
		dueDate: '',
		id: '36850f6f-558d-4c6c-83c7-9cbf79a66da8',
	});
	fetchMock.delete('express:/todos//:id', {});
};

export default setupMocks;
