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

// delete students and associated interviews. 
module.exports.delete = async function(req, res){
    try {
        // find the student which user requested for delete and populate the list of interview attached to that student 
        let student = await Students.findById(req.params.id).populate('interviews.interview');
        if(!student){
            req.flash('error', 'Student does not exits!');
            return res.redirect('back');
        }

        let studentId = student._id;
        let interviewList = student.interviews;

        for(let i=0; i<interviewList.length; i++){
            await interviewList[i].interview.populate('students.student');

            interviewList[i].interview.students = interviewList[i].interview.students.filter((tempStudent)=>{
                return (tempStudent.student.id != studentId)
            });

            await interviewList[i].interview.save();
        }

        await Students.deleteOne({_id: req.params.id});
        req.flash('success', 'Student deleted!');
        return res.redirect('back');

    } catch (error) {
        console.log('Error deleting student', error);
        return res.redirect('back');
    }
}