module.exports.home = function(req, res){
    return res.render('interviews',{
        title: "Interviews | Homepage"
    });
}