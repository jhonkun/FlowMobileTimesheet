import login from '../views/login/login.route.js';

export default

/* @ngInject */
function router($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {
	// $locationProvider.html5Mode({ enabled: true, requireBase: false });

	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};

console.log("WE ARE ON ROUTE");

	$stateProvider
		.state('login', login);

	$urlRouterProvider.otherwise('/login');
}
