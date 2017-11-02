const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TariffSchema = new Schema({
	tid: {type: Number},
    akeyword: {type: String},
    skeyword: {type: String},
    value: {type: Number},
    rev_share: {type: Number},
    created_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Tariff', TariffSchema);