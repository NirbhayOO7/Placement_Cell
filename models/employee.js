const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');   // install bcryptjs to save hashed password in db rather than orginal password.
// open below link to get more info on bcryptjs usage https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt


// user schema for holding data about users present in web_auth application 
const EmployeeSchema = new mongoose.Schema({
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    name:{
        type : String,
        required: true
    }
},{
    timestamps: true
}
);

//pre is a mongoose middleware which calls the callback function before changing/updating a document in user collection.
EmployeeSchema.pre("save", function(next){
    const employee = this;  //this will hold the current instance of userSchema

    if(this.isModified("password") || this.isNew){
        bcrypt.genSalt(10, function(saltError, salt){
            if(saltError){
                return next(saltError);
            }
            else{
                bcrypt.hash(employee.password, salt, function(hashError, hash){
                    if(hashError){
                        return next(hashError);
                    }
                    else{
                        employee.password = hash;
                        next();
                    }
                });
            }
        });
    }
    else{
        return next();
    }
});

// function to authenticate the user by comparing the decrypting th password present in database and the matching it with input password
EmployeeSchema.methods.comparePassword = async function(password, callback){
    try {
        const isMatched = await bcrypt.compare(password, this.password);
        return callback(null, isMatched);
    } catch (error) {
        return callback(error);        
    }
};

const Employees = mongoose.model('Employees', EmployeeSchema);

module.exports = Employees;