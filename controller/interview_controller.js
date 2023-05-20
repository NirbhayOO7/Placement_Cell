const Interviews = require('../models/interview');
const Students = require('../models/student');

module.exports.home = async function(req, res){

    try {

        let interviews = await Interviews.find().populate('students.student');
        
        return res.render('interviews',{
            title: "Interviews | Homepage",
            interviews: interviews
        });
        
    } catch (error) {
        console.log('Error rendering interviews', error);
        return res.redirect('back');
    }

}

module.exports.create =async function(req, res){
    try {
        let interview =await Interviews.findOne({company: req.body.company, date: req.body.date});
        if(interview){
            req.flash('error','Interview with same company and date already exist!');
            return res.redirect('back');
        }
        else{
            interview = await Interviews.create(req.body);
            // console.log('Interviews:',interview);
            req.flash('success','Interview details saved!');
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error creating interview', error);
        return res.redirect('back');
    }
}

module.exports.addStudent = async function(req, res){
    try {
        let student = await Students.findById(req.body.studentId);
        // console.log('student', student);
        if(!student){
            req.flash('error','Enter valid Student id!');
            return res.redirect('back');
        }
        // console.log('params', req.params);
        let interview = await Interviews.findById(req.params.id).populate('students.student');
        // console.log('interview', interview);
        for(stud of interview.students){
            if(stud.student.id === student.id){
                req.flash('error', 'student already added in interview list!');
                return res.redirect('back');
            }
        }
        if(!interview){
            req.flash('error', 'Interview does not exist!');
            return res.redirect('back');
        }

        interview.students.push({
            student: student,
            result: req.body.result
        });

        interview.save();

        student.interviews.push({
            interview: interview,
            result: req.body.result
        });

        student.save();

        req.flash('success', 'Student added to interview!');
        return res.redirect('back');

    } catch (error) {
        console.log('Error adding student to interview', error);
        return res.redirect('back');
    }
}