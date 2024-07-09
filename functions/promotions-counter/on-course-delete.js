const { db } =  require('../init');
const { FieldValue } = require('firebase-admin/firestore');

// const logger = require("firebase-functions/logger");

const courseDelete = async (snap, context) => {
	const course = snap.data();

	if (!course.promo) {
		return;
	}

	return db.doc('courses/stats').update({
		totalPromo: FieldValue.increment(-1)
	});
};

module.exports = { courseDelete };