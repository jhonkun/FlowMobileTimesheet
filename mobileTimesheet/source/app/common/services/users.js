import { PORTIONS } from './../constants';
import merge from 'lodash/object/merge';

export default module => {
	module.service('UserService', function(localStorageService, DatabaseService, MomentService) {
		return {
			getUsers: () => localStorageService.get('users'),

			getActiveUser,
			setActiveUser: userId => localStorageService.set('activeUser', userId),

			getUserHistory,
			getUserPortionLimits: ({ gender, age }) => PORTIONS[gender][age],

			getUserDailyData,
			setUserPortions: DatabaseService.updateUserPortions, // id, date, type, value

			generateDummyProfile,

			insertProfile,
			updateProfile: DatabaseService.updateProfile, // user object
			deleteProfile: DatabaseService.deleteProfile, // user id

			isLegacyProfile: () => localStorageService.get('isProfileSet'),
			cleanLegacyData: () => localStorageService.remove(
				'userAge', 'userGender', 'userAgeSpan', 'languageActive',
				'isProfileSet', 'isReturningUser', 'charityActive'
			),
		};

		function generateDummyProfile(legacyUser = {}) {
			return merge({
				name: null,
				language: null,
				gender: null,
				age: null,
				completeProfile: false,
				initialDate: MomentService.initialDate(),
				onboarding: {
					donations: false
				}
			}, legacyUser);
		}

		function getActiveUser() {
			let activeUserId = localStorageService.get('activeUser');
			return localStorageService.get('users').filter(user => user.id === activeUserId)[0];
		}

		function getUserHistory(initialDate) {
			let historyLength = MomentService.historyLength(initialDate);
			let dates = historyLength > 1
				? new Array(historyLength).slice(0, 2).join().split(',')
				: [ initialDate ]; // first time using the app, one day only

			return dates.map((date, index) => MomentService.relativeDate(index));
		}

		function getUserDailyData(id, date, callback) {
			DatabaseService.getUserDailyData(id, date, (query, { rows }) => {
				// data row not found, so create it and don't return any portion
				if (!rows.length) { DatabaseService.insertUserPortions(id, date); callback(false); return; }

				let data = rows.item(0);

				callback({ // return normalized data
					status: { saved: !!data.did_save, donated: !!data.did_donate },
					portions: {
						vegs: { value: data.portion_vegs }, grain: { value: data.portion_grain },
						milk: { value: data.portion_milk }, meat: { value: data.portion_meat }
					}
				});
			});
		}

		function insertProfile(profile, callback) {
			DatabaseService.insertProfile(profile, (select, result) => callback(result.insertId));
		}
	});
};
