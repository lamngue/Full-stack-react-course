const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
//encode user's id inside of cookie
passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null,user);
	})
});
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(user => {
				if (user) {
					//we already have a record with given profile id
					done(null, user);
				} else {
					//we don't have an user record with this id, make a new record
					new User({
						googleId: profile.id
					}).save().then((user) => {
						done(null, user);
					});
				}
			});
		}
	)
);
