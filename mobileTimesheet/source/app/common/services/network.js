export default module => {
	module.service('NetworkService', function($rootScope) {
		['online', 'offline'].forEach(event => window.addEventListener(event, () => {
			$rootScope.$broadcast('NETWORK_STATE_CHANGED', navigator.onLine);
		}));

		return { getState: () => navigator.onLine };
	});
};

