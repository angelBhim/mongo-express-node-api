const mongoose = require("mongoose");
const sh = require("shorthash");

let ViewHourly = mongoose.model("ViewHourly");
// let StatsHourly = mongoose.model("StatsHourly");
let Tariff = mongoose.model("Tariff");
let Service = mongoose.model("Service");

//process all request
exports.processTask = (req, res) => {
    var json = JSON.parse(req.body.json);
    // var list = {};
    // group raw data
    list = json.reduce(function (r, a) {
        r[a.sid] = r[a.sid] || [];
        r[a.sid].push(a);
        return r;
    }, Object.create(null));
 	// process grouped data
 	var finalList = {};
 	var hourly = {};
 	var services = [];
 	var date;

 	for (var key in list) {
	    var partialList = {};
	    var description = [];
	
	    list[key].forEach(function(element) {
	    	// get required fields

	    	date = element.timestamp;

	    	var des = {
	    		code:element.code,
            	type:element.type,
            	err:element.err,
            	timestamp:element.timestamp,
            	akeyword: element.akeyword,
            	skeyword: element.skeyword,
            	value: element.value,
            	rev_share: element.rev_share
	    	};

	    	description.push(des);
	    	partialList = {
	    		sid : element.sid,
	    		sname: element.sname,
	    		gid: element.gid,
	    		gname: element.gname,
	    		ac  : element.ac,
	    		description : description	
	    	};
	    });
	    // console.log(partialList);
	    services.push(partialList);
	}

	hourly = {
		uid : date,
		services: services
	};

	finalList = {
		uid : date,
		list : hourly
	};

    res.json(finalList);
};