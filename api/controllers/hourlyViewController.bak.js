const mongoose = require("mongoose");
let Task = mongoose.model("ViewHourly");

// get all tasks
// exports.getTasks = (req, res) => {
// 	var sortType = req.params.id;
// 	var date = req.query.date;

//     Task.find({"description.timestamp" : {'$regex': date}}, (err, stats) => {
//         if (err)
//             res.send(err);
        
//         res.json(stats);
//     });
// };

exports.getTasks = (req, res) => {
    
    var qry = req.query;

    Task.find(qry, (err, statsHourly) => {
        if (err)
            res.send(err);
        
        res.json(statsHourly);
    });
};

exports.createTask = (req, res) => {
    let newTask = new Task(req.body);
    newTask.save( (err, viewHourly) => {
        if (err)
            res.send(err);
        
        res.json(viewHourly);
    });
};

// update / insert
exports.updateTask = (req, res) => {

	console.log(req.body.list.timestamp);
	// find root uid
	Task.findOne(
		{uid: req.body.uid},
		{list: {$elemMatch: {timestamp: req.body.list.timestamp}}}
	,(err, viewHourly) => {
        if (err)
            res.send(err);
        
        var list = viewHourly.list;
        
        list.forEach(function(element) {
        	var services = element.service;
        	services.forEach(function(service) {
        		descriptions = service.description;
        		descriptions.forEach(function(description) {
        			console.log(description);
        		});
        	});

        });

        res.json(viewHourly);
    });	
	// if not exist, insert all body
	// if exist , find list.timestamp
	// if not exist, push all body.list
	// if list.timestamp exist,
	//
	// update timely
  //   Task.findOneAndUpdate({
  //   	uid: "20171106",
  //   	"list.timestamp": "2017110610",
  //   	"list.service.sid":12
  //   }, {"$push" : {"list": req.body.list}}, { upsert: true, new: true }, (err, viewHourly) => {
  //   if (err) 
  //       res.send(err);
  //   res.json(viewHourly);
  // });
  // update per service
  // Task.findOneAndUpdate({
  //   	uid: "20171106",
  //   	"list.timestamp": "2017110610",
  //   	"list.service.sid":12
  //   }, {"$push" : {"list.$.service": req.body.list.service}}, { upsert: true, new: true }, (err, viewHourly) => {
  //   if (err) 
  //       res.send(err);
  //   res.json(viewHourly);
  // });
  // update per description
  // Task.findOneAndUpdate({
  //   	uid: "20171106",
  //   	"list.timestamp": "2017110610",
  //   	"list.service.sid":12},{
  //   		"description" : {"$elemMatch":{code:200}}
  //   }, {"$push" : {"list.$.service.description": req.body.list.service.description}}, { upsert: true, new: true }, (err, viewHourly) => {
  //   if (err) 
  //       res.send(err);
  //   res.json(viewHourly);
  // });
};