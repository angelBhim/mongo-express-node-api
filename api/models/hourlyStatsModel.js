const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let HourlyStatsSchema = new Schema({
    uid: {type: String, unique : true}, // service_id + product_id + code + date + hour
    count: {type: Number, default: 0},
    ac: {type: Number, default: 0},
    service: [{
        name: String,
        sid: {type: Number}
    }],
    keyword: [{
        akeyword:  {type: String},
        skeyword:  {type: String},
        value:     {type: Number, default: 0},
        rev_share: {type: Number, default: 0}
    }],
    group: [{
        gid: {type: Number},
        name: {type: String},
        target: [{
            nsr:     {type: Number, default: 0},
            gross:   {type: Number, default: 0},
            topline: {type: Number, default: 0}
        }]
    }],
    description: [{
        code: {type: Number},
        error: {type: String},
        txn_type: {type: String},
        txn_time: {type: String}
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('StatsHourly', HourlyStatsSchema);