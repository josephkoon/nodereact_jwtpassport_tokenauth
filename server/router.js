const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')


//Create middleware for authentication and sign in. Dont create a session.
const requireAuth = passport.authenticate('jwt',{session:false})
const requireSignin = passport.authenticate('local',{session:false})


module.exports = function(app){
	//Protected route. Get User with valid token Authentication.
	app.get('/', requireAuth, function(req,res){
		res.send({message:'Authenticated message from backend'})
	})

	//Sign In
	app.post('/signin', requireSignin, Authentication.signin)

	//Add User
	app.post('/signup', Authentication.signup)

	
}



