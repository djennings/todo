import fetchMock from 'fetch-mock';

export const requestPayload = (matcher: string, method: string): any => {
	let methodObj: object = {};
	if (method && method.length) {
		methodObj = { ...methodObj, method };
	}
	// const lastOptions = fetchMock.lastOptions(matcher);
	// return lastOptions && lastOptions.body ? lastOptions.body : {};
	const options: fetchMock.MockOptions | undefined = fetchMock.lastOptions(matcher, methodObj);

	return options && options.body ? options.body : '';
};
