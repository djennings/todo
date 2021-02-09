import fetchMock from 'fetch-mock';
const setupMocks = () => {
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
};

export default setupMocks;
