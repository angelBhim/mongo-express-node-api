const mongoose = require("mongoose");
const sh = require("shorthash");

let Task = mongoose.model("StatsHourly");
let Tariff = mongoose.model("Tariff");
let Service = mongoose.model("Service");

//process all request
exports.processTask = (req, res) => {
    var file = JSON.parse(req.body.json);
    var source = req.body.source;

    file.forEach(function(element) {

        var uid = sh.unique("'"+element.sid+element.akeyword+element.skeyword+element.ac+element.timestamp+element.code+element.type+"'");
        element["uid"] = uid;

        // get tariff
        var resultTariff = Tariff.findOne({"akeyword": element.akeyword, $and:[{"skeyword": element.skeyword}]})
            .exec(function (err, result) {
                res.json(result);
            });

        res.json(resultTariff);
    });


};

// update / insert
exports.upsertTask = (req, res) => {
    Task.findOneAndUpdate({uid: req.body.uid}, {"$set" : req.body}, { upsert: true, new: true }, (err, statsHourly) => {
    if (err) 
        res.send(err);
    res.json(statsHourly);
  });
};
