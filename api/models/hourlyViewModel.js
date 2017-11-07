const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// let ContentServiceSchema = new Schema({
//     count: {type: Number, default: 0},
//     ac: {type: Number, default: 0},
//     keyword: [{akeyword: String, skeyword: String}],
//     service: [{name: String,sid: {type: Number}}],
//     group: [{ name: String, gid: {type: Number}}]
// });
// let ContentSchema = new Schema({
//     date_time: {type: String,unique: true},
//     service: [ContentServiceSchema]
// });
// let HourlyViewSchema = new Schema({
//     uid: {type: String, unique : true},
//     list: [ContentSchema],
//     created_date: {
//         type: Date,
//         default: Date.now
//     }
// });


let HourlyViewSchema = new Schema({
    uid : {type: String, unique : true},
    list: [{
        timestamp : {type: String, unique: true},
        service: [{
            ac: {type: Number, default: 0},
            sname: {type: String},
            sid: {type: Number},
            gname: {type: String},
            gid: {type: Number},
            description: [{
                akeyword: {type: String},
                skeyword: {type: String},
                code: {type: Number},
                err: {type: String},
                count: {type: Number}
            }]
        }]
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('ViewHourly', HourlyViewSchema);