const Students = require('../models/student');

module.exports.home = async function(req, res){

    try {
        let students =await Students.find();
        
        // console.log(students.interviews.result);
        return res.render('students',{
            title: "Students | Homepage",
            students: students
        });
    } catch (error) {
        console.log('Error loading student home', error);
        return res.redirect('back');
    }
}

module.exports.create =async function(req, res){
    try {
        // console.log('inside student create');
        let student = await Students.findOne({name: req.body.name});
        if(student){
            req.flash('error','Student already exist!');
            return res.redirect('back');
        }
        else{
            student = await Students.create(req.body);
            // console.log("students:",student);
            req.flash('success','Students details saved!');
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error creating student', error);
        req.flash('error','Error creating student', error);
        return res.redirect('back');
    }
}