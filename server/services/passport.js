const User = require('../models/user');
const config = require('../config');
const passport = require('passport');

//JWT Strategy 
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Local Strategy for email / password
const LocalStrategy = require('passport-local');




//Create local email, password strategy. Username as email.
const localLogin = new LocalStrategy({usernameField:'email'}, function(email,password,done){
	//Verify username and password, call done with the user
	//Otherwise, call done with false

	User.findOne({email:email}, function(err,user){
		if(err) { return done(err) }
		if(!user) { return done(null,false); }

		//Compare passwords - is password equal to user.password
		user.comparePassword(password, function(err, isMatch){
			if(err) { return done(err); }
			if(!isMatch){ return done(null,false) }

			return done(null,user)
		})
	})
});





//Setup JWT Strategy. Extract JWT from header with secret
const jwtOptions = {
	jwtFromRequest:ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//Create JWT Strategy for JWT
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//See if the user ID in the payload exists with the JWT
	User.findById(payload.sub, function(err,user){
		if(err) { return done(err,false); }

		//If it does, call done. If not, call done without a user
		if(user){
			done(null,user);
		} else {
			done(null,false);
		}
	})
});




//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


