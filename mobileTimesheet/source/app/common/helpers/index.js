// simply output db errors to the console as errors
export const localDbErrorHandler = (query, error) => {
	console.error(`
		Error querying local DB
		Original query: ${query}
		Error: ${error.message}
	`);
};

