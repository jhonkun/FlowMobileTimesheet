export default module => {
	module.service('RouteService', function($state, localStorageService) {
	
		this.checkRoute = () => {

			console.log("sadsadsafsaasd");
		 $state.go('login');  

			

			
		};
	});
};
