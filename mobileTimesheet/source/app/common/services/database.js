import { localDbErrorHandler } from './../helpers';
import db from './../db';

export default module => {
	module.service('DatabaseService', function() {

		// profiles
		this.insertProfile = ({ name, age, gender, language }, callback) => {
			db.transaction(tx => { // function(query, result){ result.insertId }
				tx.executeSql('INSERT INTO TblProfile (profile_name, profile_gender, profile_ageGroup, profile_lang) VALUES (?, ?, ?, ?)', [name, gender, age, language], callback, localDbErrorHandler);
			});
		};

		this.deleteProfile = id => {
			db.transaction(tx => {
				tx.executeSql('DELETE FROM TblProfile WHERE profile_id=?', [id], null, null);
			});
		};

		this.updateProfile = ({ name, age, gender, language, id }) => {
			db.transaction(tx => {
				tx.executeSql('UPDATE TblProfile set profile_name = ?, profile_gender = ?, profile_ageGroup = ?, profile_lang = ? where  profile_id = ?', [name, age, gender, language, id], null, localDbErrorHandler);
			});
		};

		// daily data (portions, donations, etc...)
		this.insertUserPortions = (profile_id, portion_date) => {
			db.transaction(tx => {
				tx.executeSql('INSERT INTO TblDailyPortion (portion_date, portion_milk, portion_meat, portion_grain, portion_vegs, did_save, profile_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [ portion_date, null, null, null, null, 0, profile_id ], null, localDbErrorHandler);
			});
		};

		this.updateUserPortions = (profile_id, portion_date, portion_type, portion_value) => {
			db.transaction(tx => {
				tx.executeSql('UPDATE TblDailyPortion SET portion_' + portion_type + ' = ? WHERE portion_date = ? and profile_id = ?', [ portion_value, portion_date, profile_id ], null, localDbErrorHandler);
			});
		};

		this.getUserDailyData = (profile_id, portion_date, callback) => {
			db.transaction(tx => {
				tx.executeSql('SELECT t.portion_date, t.portion_milk, t.portion_meat, t.portion_grain, t.portion_vegs, e.did_donate , t.did_save from TblDailyPortion t left outer join TblDonation e on t.portion_date=e.donation_date WHERE t.portion_date = ? and t.profile_id = ? ', [ portion_date, profile_id ], callback, localDbErrorHandler);
			});
		};

		// donation
		this.updateDonation = (portion_date, did_donate) => {
			db.transaction(tx => {
				tx.executeSql('INSERT INTO TblDonation (did_donate,donation_date,profile_id) values ( ?,?,1)', [ did_donate, portion_date ], null, localDbErrorHandler);
			});
		};

		this.getDonation = (callback) => {
			db.transaction(tx => {
				tx.executeSql('SELECT COUNT (*) as "donations" FROM TblDonation', [], callback, localDbErrorHandler);
			});
		};

		// tips
		this.insertTip = (profile_id, { id, date, text, group }) => {
			db.transaction(tx => {
				tx.executeSql('INSERT INTO TblTipOfTheDay (tip_id, tip_date, tip_text_en, tip_text_fr, tip_food_group, profile_id, tip_new) VALUES (?, ?, ?, ?, ?, ?, ?)', [ id, date, text.en, text.fr, group, profile_id, 1 ], null, localDbErrorHandler);
			});
		};

		this.getAllTips = (profile_id, callbackFn) => {
			db.transaction(tx => {
				tx.executeSql('SELECT tip_food_group as "group", tip_text_en as "text_en", tip_text_fr as "text_fr", tip_new as "new" FROM TblTipOfTheDay WHERE profile_id = ? ORDER BY rowid DESC', [ profile_id ], callbackFn, localDbErrorHandler);
			});
		};

		this.getTipIds = (profile_id, callback) => {
			db.transaction(tx => {
				tx.executeSql('SELECT tip_food_group as "group", tip_id as "id" FROM TblTipOfTheDay WHERE profile_id = ?', [ profile_id ], callback, localDbErrorHandler);
			});
		};

		this.updateTipsNewFlag = profile_id => {
			db.transaction(tx => {
				tx.executeSql('update TblTipOfTheDay set tip_new = 0 WHERE profile_id = ?', [ profile_id ], null, localDbErrorHandler);
			});
		};

		// recipes
		this.insertRecipe = (profile_id, date, message, { id, title, url, image, group }) => {
			db.transaction(tx => {
				tx.executeSql('INSERT INTO TblRecipeTracker (recipe_id, recipe_title_fr, recipe_title_en, recipe_url_fr, recipe_url_en, recipe_image_url, recipe_food_group, profile_id, recipe_new, message_type, message_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ id, title.fr, title.en, url.fr, url.en, image, group, profile_id, 1, message, date], null, localDbErrorHandler);
			});
		};

		this.getAllRecipes = (profile_id, callback) => {
			db.transaction(tx => {
				tx.executeSql('SELECT recipe_food_group as "group", recipe_image_url as "image", recipe_title_en as "title_en", recipe_title_fr as "title_fr", recipe_url_en as "url_en", recipe_url_fr as "url_fr", recipe_new as "new", message_type as "message" FROM TblRecipeTracker WHERE profile_id = ? ORDER BY rowid DESC', [ profile_id ], callback, localDbErrorHandler);
			});
		};

		this.getPreviousDayGroup = (profile_id, previousDay, callback) => {
			db.transaction(tx => {
				tx.executeSql('SELECT recipe_food_group as "group", message_type as "message" FROM TblRecipeTracker WHERE profile_id = ? AND message_date = ?', [ profile_id, previousDay ], callback, localDbErrorHandler);
			});
		};

		this.getRecipeIds = (profile_id, callback) => {
			db.transaction(tx => {
				tx.executeSql('SELECT recipe_food_group as "group", recipe_id as "id" FROM TblRecipeTracker WHERE profile_id = ?', [ profile_id ], callback, localDbErrorHandler);
			});
		};

		this.updateRecipesNewFlag = profile_id => {
			db.transaction(tx => {
				tx.executeSql('update TblRecipeTracker set recipe_new = 0 WHERE profile_id = ?', [ profile_id ], null, localDbErrorHandler);
			});
		};

		// save the day
		this.updateSaveState = (profile_id, portion_date) => {
			db.transaction(tx => {
				tx.executeSql('UPDATE TblDailyPortion SET did_save = ? WHERE portion_date = ? and profile_id = ?', [ true, portion_date, profile_id ], null, localDbErrorHandler);
			});
		};

	});
};
















// var updateTblDonation = function (db, date, did_donate, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('UPDATE TblDailyPortion SET did_donate = ? WHERE portion_date = ? and profile_id = ?', [ did_donate, date, profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };

// var updateTblProfile = function(db, t, callbackFn, agegroup, gender, languageActive, profile_id) {
// 	db.transaction(function(tx) {
// 		t.executeSql('update TblProfile set profile_name = ?, profile_gender = ?, profile_ageGroup = ?, profile_lang = ? where  profile_id = ?', [ null, gender, agegroup, languageActive, profile_id], callbackFn, localDbErrorHandler);
// 	});
// };

// var emptyDatabase = function (db) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('TRUNCATE TABLE TblDailyPortion', null, null, null);
// 	});
// };

// var allTblDailyPortion = function (db, callbackFn) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('SELECT * FROM TblDailyPortion ', [], callbackFn, localDbErrorHandler);
// 	});
// };


// // Removed the tip_lang as we are not currently proceeding with saving both languages, we may add in later.
// var getTblTipOfTheDay = function (db, tip_id, tip_date, tip_lang, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('SELECT tip_id, tip_date, tip_lang, tip_text FROM TblTipOfTheDay WHERE tip_date = ? and profile_id = ?', [ tip_id, tip_date, profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };

// var getTblDailyPortionWeek = function(db, start_date, end_date, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('SELECT portion_milk, portion_meat, portion_cereal, portion_vegetable, did_complete FROM TblDailyPortion WHERE portion_date BETWEEN ? AND ? AND did_complete=1 and profile_id = ?', [ start_date, end_date, profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };

// var getDonationsThisWeek = function(db, start_date, end_date, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('SELECT SUM(did_donate) AS weekcount FROM TblDailyPortion WHERE portion_date BETWEEN ? AND ? and profile_id = ?', [ start_date, end_date, profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };

// var getDonationsUserTotal = function(db, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('SELECT SUM(did_donate) AS totalcount FROM TblDailyPortion where profile_id = ? ', [ profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };

// var updateTblComplete = function (db, date, did_complete, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('UPDATE TblDailyPortion SET did_complete = ? WHERE portion_date = ? and profile_id = ?', [ did_complete, date, profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };


// var updateTblResetDonation = function (db, callbackFn, profile_id) {
// 	db.transaction(function (tx) {
// 		tx.executeSql('UPDATE TblDailyPortion SET did_donate = 0 where profile_id = ?', [ profile_id ], callbackFn, localDbErrorHandler);
// 	});
// };
