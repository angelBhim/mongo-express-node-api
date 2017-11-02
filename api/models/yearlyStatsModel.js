const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let YearlyStatsSchema = new Schema({
    uid: {type: String}, // service_id + product_id + code + year
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
            nsr:     {type: Number, default: 0},
            gross:   {type: Number, default: 0},
            topline: {type: Number, default: 0}
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
module.exports = mongoose.model('stats_yearly', YearlyStatsSchema);
