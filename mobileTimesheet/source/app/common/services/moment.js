import moment from 'moment';

export default module => {
	module.service('MomentService', function(localStorageService) {
		let language = localStorageService.get('activeLanguage');

		let rawFormat = 'YYYY-MM-DD';
		let displayFormat = language === 'en' ? 'dddd, MMM. D' : 'dddd, MMM. D';

		return {
			isToday: date => moment().format(rawFormat) === date,
			previousDay: date => moment(date).subtract(1, 'days').format(rawFormat),
			initialDate: () => moment().subtract(7, 'days').format(rawFormat), // DEBUG .substract(7, 'days')
			historyLength: initialDate => moment().diff(initialDate, 'days') + 1,
			relativeDate: numOfDays => moment().subtract(numOfDays, 'days').format(rawFormat),

			format: {
				raw: date => moment(date).format(rawFormat),
				display: date => moment(date).format(displayFormat)
			}
		};
	});
};
