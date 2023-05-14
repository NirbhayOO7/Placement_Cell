const Employee = require('../models/employee');

//render sing in page
module.exports.signin = function(req, res){
    if(req.isAuthenticated())
    {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/');
    }
    return res.render('signin', {
        title: "Sign In"
    });
}


// render sign up page
module.exports.signup = function(req, res){
    if(req.isAuthenticated())
    {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/');
    }
    return res.render('signup', {
        title: "Sign Up"
    });
}


//create employee in our local database 
module.exports.create = async function(req, res){

    if(req.body.password !== req.body.confirm_pass){
        // console.log('password and confirm password does not macth');
        req.flash('error', 'Password and Confirm Password does not match!');
        return res.redirect('back');
    }

    try{
        const employee = await Employee.findOne({email: req.body.email});

        if(!employee){
            const newEmployee = await Employee.create(req.body);
            // console.log('User created!');
            req.flash('success', 'User id created!');
            return res.redirect('/employee/sign-in');
        }
        else{
            // console.log("User already exist!");
            req.flash('error', 'User account already exist!');
            return res.redirect('/employee/sign-in');
        }
    }
    catch(err){
        console.log("Error creating user", err);
    }

}

//create-session(logged in) for employee 
module.exports.createSession = function(req, res){
    req.flash('success', 'Successfully logged In!');
    return res.redirect('/');
}

// employee logging out.
module.exports.destroySession = function(req, res){

    req.logout(function(err){
        if(err){
            console.log('Error while logging out of the session')
        }

        req.flash('success', 'You have logged out!')
        return res.redirect('/');
    });
}
