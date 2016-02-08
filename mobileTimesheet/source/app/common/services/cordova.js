// for now, this service will expose
// all cordova related functionality

export default module => {
	module.service('CordovaService', function() {

		// inAppBrowser
		this.openUrl = url => {
			if (typeof cordova === 'undefined') return;

			let options = {
				toolbar: { color: '#256A7D' },
				transitionstyle: 'fliphorizontal',
				closeButton: { image: 'back', align: 'left', event: 'closePressed' },
				title: { color: '#ffffff', staticText: 'Back to Get Enough Helper App' },
			};

			window.cordova.ThemeableBrowser.open(url, '_blank', options)
				.addEventListener('closePressed', event => { window.cordova.ThemeableBrowser.close(); });
		};

		// social share
		this.share = () => {
			if (typeof cordova === 'undefined') return;

			window.plugins.socialsharing.share(
				'geApp message...',
				'geApp title...',
				'https://www.dairygoodness.ca/bundles/tigetenough/img/nav_icon.png'
			);
		};
	});
};
