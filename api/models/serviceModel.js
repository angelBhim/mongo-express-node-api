const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ServiceSchema = new Schema({
    group_id: {type: Number},
    group: {type: String},
    sid: {type: Number, unique: true},
    service: {type: String},
    ac: {type: Number},
    topline: {type: Number},
    gross: {type: Number},
    nsr: {type: Number},
    created_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Service', ServiceSchema);