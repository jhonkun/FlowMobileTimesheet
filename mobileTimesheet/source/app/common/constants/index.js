export const PRODUCTION		= 'http://platemate.getenough.ca/';
export const STAGING		= 'http://platemate.twistimage.com/';
export const DEVELOPMENT	= 'http://platemate.twistimage.dev/';

export const PORTIONS		= {
	male: {
		'4-8': {
			tracker: { vegs: { limit: 5 }, grain: { limit: 4 }, milk: { limit: 2 }, meat: { limit: 1 } },
			display: { vegs: '5', grain: '4', milk: '2', meat: '1' }
		},
		'9-13': {
			tracker: { vegs: { limit: 6 }, grain: { limit: 6 }, milk: { limit: 4 }, meat: { limit: 2 } },
			display: { vegs: '6', grain: '6', milk: '3-4', meat: '1-2' }
		},
		'14-18': {
			tracker: { vegs: { limit: 8 }, grain: { limit: 7 }, milk: { limit: 4 }, meat: { limit: 3 } },
			display: { vegs: '8', grain: '7', milk: '3-4', meat: '3' }
		},
		'19-50': {
			tracker: { vegs: { limit: 10 }, grain: { limit: 8 }, milk: { limit: 2 }, meat: { limit: 3 } },
			display: { vegs: '8-10', grain: '8', milk: '2', meat: '3' }
		},
		'51+': {
			tracker: { vegs: { limit: 7 }, grain: { limit: 7 }, milk: { limit: 3 }, meat: { limit: 3 } },
			display: { vegs: '7', grain: '7', milk: '3', meat: '3' }
		},
	},

	female: {
		'4-8': {
			tracker: { vegs: { limit: 5 }, grain: { limit: 4 }, milk: { limit: 2 }, meat: { limit: 1 } },
			display: { vegs: '5', grain: '4', milk: '2', meat: '1' }
		},
		'9-13': {
			tracker: { vegs: { limit: 6 }, grain: { limit: 6 }, milk: { limit: 4 }, meat: { limit: 2 } },
			display: { vegs: '6', grain: '6', milk: '3-4', meat: '1-2' }
		},
		'14-18': {
			tracker: { vegs: { limit: 7 }, grain: { limit: 6 }, milk: { limit: 4 }, meat: { limit: 2 } },
			display: { vegs: '7', grain: '6', milk: '3-4', meat: '2' }
		},
		'19-50': {
			tracker: { vegs: { limit: 8 }, grain: { limit: 7 }, milk: { limit: 2 }, meat: { limit: 2 } },
			display: { vegs: '7-8', grain: '6-7', milk: '2', meat: '2' }
		},
		'51+': {
			tracker: { vegs: { limit: 7 }, grain: { limit: 6 }, milk: { limit: 3 }, meat: { limit: 2 } },
			display: { vegs: '7', grain: '6', milk: '3', meat: '2' }
		}
	}
};
