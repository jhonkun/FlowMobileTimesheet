export default class {
	/* @ngInject */
	constructor($state, localStorageService, UserService, RouteService) {
		RouteService.checkRoute();
		this.username="";
		this.password=";"
		//this.isReturningUser = UserService.isLegacyProfile();
		//this.openModal = modal => ModalService.open(modal);
		//this.setLanguage = language => TranslationService.use(language);
		//this.localStorageService = localStorageService;
		this.state = $state;



		// Check campaignStatus to know where to direct the user to
		
		 this.validateUser = function(){
			console.log("testefe ");
console.log(this.username);


		};

	}

	
}
