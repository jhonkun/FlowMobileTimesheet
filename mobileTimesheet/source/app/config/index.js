import localStorage from './localStorage';
//import translations from './translations';
import routes from './routes';

import injectDatabaseService from './../common/services/database';
import injectMomentService from './../common/services/moment';
//import injectTranslationService from './../common/services/translations';
//import injectModalService from './../common/services/modals';
import injectUserService from './../common/services/users';
import injectRouteService from './../common/services/route';
import injectNetworkService from './../common/services/network';
import injectCordovaService from './../common/services/cordova';

export default module => {
	// define a few API constants
	
	module.config(localStorage);
	//module.config(translations);
	module.config(routes);
console.log("CONFIG");

	injectMomentService(module);
	injectDatabaseService(module);
//	injectTranslationService(module);
//	injectModalService(module);
	injectUserService(module);
	injectRouteService(module);
	injectNetworkService(module);
	injectCordovaService(module);
};
