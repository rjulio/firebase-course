const { db, auth } =  require('./init');

const getUserCredentialsMiddleware = (req, res, next) => {
	const jwt = req.headers.authorization;
	if (jwt) {
		auth.verifyIdToken(jwt)
			.then((jwtPayload) => {
				req["uid"] = jwtPayload.uid;
				req["admin"] = jwtPayload.admin;
				console.info(jwtPayload.uid, jwtPayload.admin);
				next();
			})
			.catch((err) => {
				console.error(err);
				next();
			});
	} else {
		next();
	}
};

module.exports = { getUserCredentialsMiddleware };