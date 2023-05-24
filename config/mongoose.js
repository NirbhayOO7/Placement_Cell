const mongoose = require('mongoose');
let db;

main().catch(err => console.log('Error connecting to MongoDB Placement Cell',err));

// setting up mongoose configuration 
async function main(){

    await mongoose.connect(process.env.db);
    db = mongoose.connection;
    console.log('Connected to Database :: MongoDB');
} 

module.exports = db;
