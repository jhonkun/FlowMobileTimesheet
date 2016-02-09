export default module => {
	module.service('RouteService', function($state, localStorageService) {
	
let logged = localStorageService.get('logged');

		this.checkRoute = () => {
			console.log("routing");
			if(logged){
				console.log("timrhseet");
				 $state.go('timesheet');  
			}else{	
			console.log("Into login");			
		 $state.go('login');  
			}
		};
	});
};
