import fetchMock from 'fetch-mock';

const requestPayload = (matcher: string) => {
	const lastOptions = fetchMock.lastOptions(matcher);
	return lastOptions && lastOptions.body ? lastOptions.body : {};
};

module.exports = requestPayload;
