import moment from 'moment';

export default class {
	/* @ngInject */
	constructor($state, localStorageService, UserService, RouteService) {
		RouteService.checkRoute();
		
		let today = moment().format('L');


		this.mon=today;
		this.tue="";
		this.wed="";
		this.thur="";
		this.fri="";
		this.sat="";
		this.sun="";



		//this.isReturningUser = UserService.isLegacyProfile();
		//this.openModal = modal => ModalService.open(modal);
		//this.setLanguage = language => TranslationService.use(language);
		//this.localStorageService = localStorageService;
		this.state = $state;



		// Check campaignStatus to know where to direct the user to
		
		 

	}

	
}
