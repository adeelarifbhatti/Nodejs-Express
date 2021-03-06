var passport = require('passport');

var passFunction = function (app){
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done){
		done(null, user);
	});
	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	require('./strategies/local.strategy')();
return passport;
};

module.exports = passFunction;