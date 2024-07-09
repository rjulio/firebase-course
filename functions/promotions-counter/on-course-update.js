const { db } =  require('../init');
const { FieldValue } = require('firebase-admin/firestore');

const logger = require("firebase-functions/logger");

const courseUpdate = async (change, context) => {
	const id = context.params.courseId;
	if (id === 'stats') {
		return;
	}

	const newData = change.after.data();
	const oldData = change.before.data();

	let increment = 0;

	if (!oldData.promo && newData.promo) {
		increment = 1;
	} else if (oldData.promo && !newData.promo) {
		increment = -1;
	}

	if (increment === 0) {
		return;
	}

	return db.doc('courses/stats').update({
		totalPromo: FieldValue.increment(increment)
	});
};

module.exports = { courseUpdate };