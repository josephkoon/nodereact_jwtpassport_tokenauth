const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')



//Create JSON web token = User ID + secret string
//Authenticate request = JSON web token + secret string = User ID
//Generate token for user from the user id and timestamp
function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub:user.id, iat:timestamp }, config.secret)
}



exports.signin = function(req,res,next){
	//User already has email and password authed
	//We need to sign them in
	//Send a user with a new token from pasport user
	res.send({token:tokenForUser(req.user)})
}



exports.signup = function(req,res,next){
	const email = req.body.email;
	const password = req.body.password;

	//Require both email and password
	if(!email || !password){
		return res.status(422).send({error:'You must provide email and password'})
	}

	//See if a user with the email already existings
	User.findOne({email:email}, function(err, existingUser){
		if(err) { return next(err) }

		//if a user with email does exist, return an error
		if(existingUser){
			console.log('ERROR')
			return res.status(422).send({error:'Email is in use'})
		}
	});

	//If a user with email does not exist, create and save user record
	const user = new User({
		email:email,
		password:password
	});

	//Respond to request indicating the user was created with a token
	user.save(function(err){
		if(err) { return next(err) }

		//Generate a token
		res.json({token : tokenForUser(user)})
	});
}









