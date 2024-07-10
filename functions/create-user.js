const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { db, auth } =  require('./init');
// const { FieldValue } = require('firebase-admin/firestore');

const logger = require("firebase-functions/logger");
const { getUserCredentialsMiddleware } = require('./auth.middleware');

const createUserApp = express();

createUserApp.use(cors({origin:true}));
createUserApp.use(bodyParser.json());
createUserApp.use(getUserCredentialsMiddleware);

createUserApp.post('/', async (req, res) => {
	logged.debug('Calling create user functions');
	try {

		if (!(req["uid"] && req["admin"])) {
			const message = 'Denied access';
			logger.debug(message);
			res.status(403).json(message);
			return;
		}

		const email = req.body.email;
		const password = req.body.password;
		const admin = req.body.admin;

		const user = await auth.createUser({
			email: email,
			password: password
		});

		await auth.setCustomUserClaims(user.uid, { admin: admin });

		db.doc(`users/${user.uid}`).set({});

		res.status(200).json({ message: 'User created' })
	} catch(err) {
		logger.error('Could not create user', err);
		res.status(500).json({ message: 'Could not create user' });
	}
});

module.exports = { createUserApp };