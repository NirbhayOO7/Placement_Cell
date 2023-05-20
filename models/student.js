const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    status:{
        type:String,
        required: true,
        enum: ['placed', 'not_placed']
    },
    dsaScore:{
        type: Number,
        required: true,
        min:0,
        max:100
    },
    webDScore:{
        type: Number,
        required: true,
        min:0,
        max:100
    },
    reactScore:{
        type: Number,
        required: true,
        min:0,
        max:100
    },
    interviews: [
        {
            interview:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Interviews'
            },
            result:{
                type: String,
                enum: ['PASS', 'FAIL', 'ON HOLD', 'DID NOT ATTEMPT']
            }
        }
    ],
},{
    timestamps: true
});

const Students = mongoose.model('Students', StudentSchema);

module.exports = Students;