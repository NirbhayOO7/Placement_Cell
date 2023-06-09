const Interviews = require('../models/interview');
const Students = require('../models/student');


// render interviews-homepage
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

// create new interviews 
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

// add students to interviews 
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

//delete interview and its related fields from student db.

module.exports.delete = async function(req, res){
    try {
        // find interview by id and then populate the list of students associated to that interview
        let interview = await Interviews.findById(req.params.id).populate('students.student');
        if(!interview){
            req.flash('error', 'Interview does not exits!');
            return res.redirect('back');
        }

        let interviewId = interview.id;
        let studentsList = interview.students;

        for(let i=0; i<studentsList.length; i++){
            // populate the interview attached in Student model
            await studentsList[i].student.populate('interviews.interview');
            studentsList[i].student.interviews = studentsList[i].student.interviews.filter((tempInterview, index, tempInterviewList)=>{

                return (tempInterview.interview.id != interviewId);
            });

            await studentsList[i].student.save();

        }
        await Interviews.deleteOne({_id: req.params.id});

        req.flash('success', 'Interview deleted!');
        return res.redirect('back');

    } catch (error) {
        console.log('Error deleting interview:', error);
        return res.redirect('back');
    }
}
