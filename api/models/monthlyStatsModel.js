const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let MonthlyStatsSchema = new Schema({
    uid: {type: String}, // service_id + product_id + code + yearMonth
    count: {type: Number, default: 0},
    ac: {type: Number, default: 0},
    service: [{
        name: String,
        id: {type: Number, unique : true}
    }],
    keyword: [{
        akeyword:  {type: String},
        skeyword:  {type: String},
        value:     {type: Number, default: 0},
        rev_share: {type: Number, default: 0}
    }],
    group: [{
        id: {type: Number},
        name: {type: String},
        target: [{
            nsr:     {type: Number},
            gross:   {type: Number},
            topline: {type: Number}
        }]
    }],
    description: [{
        code: {type: Number},
        error: {type: String},
        txn_type: {type: String}
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('stats_monthly', MonthlyStatsSchema);
