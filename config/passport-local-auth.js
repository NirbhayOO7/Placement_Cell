const passport = require('passport');
const Employee = require('../models/employee');

const LocalStrategy = require('passport-local').Strategy;

// configuring local authentication using passport which uses email and password present in the local database.

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
async function(req, email, password, done){
    try {
        let employee = await Employee.findOne({email: email});
        // console.log("user", user);
        if(employee!==null){
            employee.comparePassword(password, function(matchError, isMatch){
                if(matchError){
                    return done(matchError);
                }
                else if(!isMatch){
                    req.flash('error', 'Invalid email/password!');
                    return done(null, false);
                }
                else{
                    return done(null, employee);
                }
            });
        }else{
            req.flash('error', 'Email does not exist!');
            return done(null,false);
        }
    } catch (error) {
        return done(error);
    }
}
));

// serialized user is used to set the value in the session cookie 
passport.serializeUser(function(employee, done){
    done(null, employee._id);
});

// deserialize the user from the key in the session-cookies
passport.deserializeUser(async function(id, done){
    try {
        let employee = await Employee.findById(id);
        return done(null, employee);
    } catch (error) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

// funciton to check authenticated user 
passport.checkAuthentication = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/employee/sign-in');
};

// setting the authenticated use int he response locals 
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    
    next();
};

module.exports = passport;