import terms from './../../modals/terms.js'; import termsTpl from './../../modals/terms.html';
import moving from './../../modals/moving.js'; import movingTpl from './../../modals/moving.html';
import report from './../../modals/report.js'; import reportTpl from './../../modals/report.html';
import sizing from './../../modals/sizing.js'; import sizingTpl from './../../modals/sizing.html';
import privacy from './../../modals/privacy.js'; import privacyTpl from './../../modals/privacy.html';
import serving from './../../modals/serving.js'; import servingTpl from './../../modals/serving.html';
import partners from './../../modals/partners.js'; import partnersTpl from './../../modals/partners.html';
import tipsRecipes from './../../modals/tipsRecipes.js'; import tipsRecipesTpl from './../../modals/tipsRecipes.html';

import causes from './../../views/causes/causes.js'; import causesTpl from './../../views/causes/causes.html';
import profiles from './../../views/profile/profile.js'; import profilesTpl from './../../views/profile/profile.html';

// modal service : this is a wrapper around angular-ui-bootstrap modal
// exposes an 'open' method that accepts the name of the modal ie.: 'serving'
export default module => {
	module.service('ModalService', function($uibModal, $uibModalStack) {
		let activeModal, renderedModal;

		let modalList = {
			terms: { template: termsTpl, controller: terms, controllerAs: 'vm', windowClass: 'terms' },
			moving: { template: movingTpl, controller: moving, controllerAs: 'vm', windowClass: 'moving' },
			report: { template: reportTpl, controller: report, controllerAs: 'vm', windowClass: 'report' },
			sizing: { template: sizingTpl, controller: sizing, controllerAs: 'vm', windowClass: 'sizing' },
			privacy: { template: privacyTpl, controller: privacy, controllerAs: 'vm', windowClass: 'privacy' },
			serving: { template: servingTpl, controller: serving, controllerAs: 'vm', windowClass: 'serving' },
			partners: { template: partnersTpl, controller: partners, controllerAs: 'vm', windowClass: 'partners' },
			tipsRecipes: { template: tipsRecipesTpl, controller: tipsRecipes, controllerAs: 'vm', windowClass: 'tips-recipes' },

			causes: { template: causesTpl, controller: causes, controllerAs: 'vm', windowClass: 'causes' },
			profiles: { template: profilesTpl, controller: profiles, controllerAs: 'vm', windowClass: 'profiles' },
		};

		function getActiveModal() { return activeModal; }

		this.open = name => {
			// modal is rendered and the same modal gets called again : return
			if (!!$uibModalStack.getTop() && activeModal === name) { return false; }

			// modal is rendered but a different one gets called
			// close the previous rendered modal before creating a new one
			if (renderedModal) { renderedModal.close(); }

			// render new modal
			activeModal = name;
			return renderedModal = $uibModal.open(modalList[name]);
		};

		this.isActiveModal = modal => activeModal === modal;
	});
};
