import login from '../views/login/login.route.js';
import timesheet from '../views/timesheet/timesheet.route.js';

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
		.state('login', login)
		.state('timesheet', timesheet);


	$urlRouterProvider.otherwise('/login');
}
