const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    students: [
        {
            student:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Students"
            },
            result:{
                type: String,
                enum: ['PASS', 'FAIL', 'ON HOLD', 'DID NOT ATTEMPT']
            }
        }
    ]
},{
    timestamps: true
});

const Interviews = mongoose.model("Interviews", InterviewSchema);

module.exports = Interviews;