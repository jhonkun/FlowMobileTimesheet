
export default

/* @ngInject */
function translations($translateProvider) {
	$translateProvider
		.preferredLanguage(window.localStorage.getItem('geApp.activeLanguage'))
		.useSanitizeValueStrategy('escapeParameters');
}
