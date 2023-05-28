const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const path = require('path');
const fields = ['id', 'name', 'college', 'status', 'dsaScore', 'webDScore', 'reactScore', 'interviews'];
const Students = require('../models/student');


module.exports.download = async function(req, res){

    try {

        let students =await Students.find().populate('interviews.interview');
        let csv;

        csv = json2csv(students, {fields});
        const dateTime = moment().format('YYYYMMDDhhmmss');
        const filePath = path.join(__dirname, "..", "public", "downloads", `csv_${dateTime}` +".csv" );

        fs.writeFile(filePath, csv, function(err){
            if(err){
                console.log('error while writing file:', err);
                req.flash('error', err);
                return res.redirect('back');
            }
            else{

                setTimeout(function () {
                    fs.unlinkSync(filePath); // delete this file after 30 seconds
                  }, 30000);

                  res.download(filePath, 'report.csv', (err)=>{
                    if(err){
                        if (err) res.status(404).send("<h1>Not found: 404</h1>");
                    }
                  })
            }
        })
        
    } catch (error) {
        req.flash('error',`Error downloading csv file ${error}`);
        return res.redirect('back');
    }
}