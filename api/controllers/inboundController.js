const mongoose = require("mongoose");
const sh = require("shorthash");

let StatsHourly = mongoose.model("StatsHourly");
let Tariff = mongoose.model("Tariff");
let Service = mongoose.model("Service");

//process all request
exports.processTask = (req, res) => {
    var file = JSON.parse(req.body.json);
    var source = req.body.source;
    var list = [];
    file.forEach(function(element) {
        var uid = sh.unique("'"+
            element.sid +
            element.akeyword +
            element.skeyword +
            element.ac +
            element.timestamp +
            element.code +
            element.type +
            element.err +'"');
        
        element["uid"] = uid;
        element["description"] = {
            code:element.code,
            type:element.type,
            err:element.err,
            timestamp:element.timestamp
        };

        // process Tariff
        var promiseTariff = Tariff.findOne({"akeyword": element.akeyword, $and:[{"skeyword": element.skeyword}]}).exec();
        promiseTariff.then(function(tariff) {
            return tariff; // returns a promise
        })
        .then(function(tariff) {
            // console.log(tariff);
            element["keyword"] = (!tariff)?{akeyword:element.akeyword,skeyword:element.skeyword}:tariff;

            // process Service
            var promiseService = Service.findOne({"sid": element.sid}).exec();
            promiseService.then(function(service) {
              return service; // returns a promise
            })
            .then(function(service) {
                // console.log(service);
                element["service"] = (!service)?{sid:element.sid}:{name:service.service,sid:element.sid};
                element["group"] = (!service)?service:{
                    gid:service.group_id,
                    name:service.group,
                    target:{
                    topline:service.topline,
                    gross:service.gross,
                    nsr:service.nsr}
                };

                // remove unwanted fields
                var extraOpts = ["sid","akeyword","skeyword","code","err","type","timestamp"];
                for (index in extraOpts) { delete element[extraOpts[index]]; }

                // save or update
                var promiseStatsHourly = StatsHourly.findOneAndUpdate(
                    {uid: element.uid},
                    {"$set" : element},
                    { upsert: true, new: true }
                );
                promiseStatsHourly.then(function(stats){
                    return stats;
                });

                console.log(element);

            });

        })
        .catch(function(err){
          // just need one of these
          console.log('error:', err);
        });
    });
    
    res.json("200:success");

};
