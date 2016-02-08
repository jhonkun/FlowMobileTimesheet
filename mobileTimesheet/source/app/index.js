import angular from 'angular';
import FastClick from 'fastclick';

export default {
	initialize() {
		document.getElementById('timesheetApp').style.height = window.innerHeight + 'px';
		console.log("____-------Initialize");

		this.bindEvents();
	},
	bindEvents() {
		if (typeof cordova !== 'undefined') {
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		} else {
			document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
		}
	},
	onDeviceReady() {
		this.languageCheck();
		FastClick.attach(document.body);
		angular.bootstrap(document, ['mobileTimesheetApp']);
	},
	languageCheck() {
		// if activeLanguage already set on local storage, return
		if (window.localStorage.getItem('timesheetApp.activeLanguage')) return;

		// desktop can access language from navigator.language
		let defaultLanguage = navigator.language.substring(0, 2).toLowerCase();

		// mobile devices
		if (navigator.globalization) {
			navigator.globalization.getPreferredLanguage(
				language => { defaultLanguage = language.value.substring(0, 2).toLowerCase(); },
				error => { console.error('Error trying to set default language...'); }
			);
		}

		// defaultLanguage should be either en or fr and default to 'en'
		defaultLanguage = defaultLanguage.match(/fr|en/g) ? defaultLanguage : 'en';

		// set activeLanguage on localStorage with the defaultLanguage
		window.localStorage.setItem('timesheetApp.activeLanguage', defaultLanguage);
	}
};
