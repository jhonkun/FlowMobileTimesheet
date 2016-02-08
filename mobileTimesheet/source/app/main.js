// dependencies
import '../styles/main.scss';
import angular from 'angular';

import 'angular-animate';
import 'angular-local-storage';
import 'ngtouch';
import 'angular-swiper';
import 'swiper';
import 'angular-translate';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

// later we may move these imports into a new module too
import './views/login';
//import './views/profile';
//import './views/welcome';

const mobileTimesheet = angular.module('mobileTimesheetApp', [
	'login',
	//'profile',
	//'welcome',

	'LocalStorageModule',
	'pascalprecht.translate',
	'ngAnimate',
	'ngTouch',
	'ksSwiper',
	'ui.router',
	'ui.bootstrap'
]);
console.log("STARTING AT LEAST");
// app config and global service injections
import config from './config';
config(mobileTimesheet);

// app initialization
import cordova from './index.js';
cordova.initialize();
