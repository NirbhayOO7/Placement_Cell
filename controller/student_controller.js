module.exports.home = function(req, res){
    return res.render('students',{
        title: "Students | Homepage"
    });
}