const mongoose = require("mongoose");
const sh = require("shorthash");
const Task = mongoose.model("StatsHourly");
// get all tasks
exports.getTasks = (req, res) => {
    Task.find({}, (err, statsHourly) => {
        if (err)
            res.send(err);
        
        res.json(statsHourly);
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
// create a task
exports.createTask = (req, res) => {
    let newTask = new Task(req.body);
    newTask.save( (err, statsHourly) => {
        if (err)
            res.send(err);
        
        res.json(statsHourly);
    });
};
// update a particular task 
exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, statsHourly) => {
    if (err) 
        res.send(err);
    res.json(statsHourly);
  });
};
// read a single task 
exports.readTask = (req, res) => {
    Task.findOne(req.params.id, (err, statsHourly) => {
        if (err)
            res.send(err);
        res.json(statsHourly);
    });
};
// read list of services
exports.readServiceTask = (req, res) => {
    Task.find({"service.sid": req.params.serviceId}, (err, statsHourly) => {
        if (err)
            res.send(err);
        res.json(statsHourly);
    });
};
// read list of product id per service
exports.readServiceKeywordTask = (req, res) => {
    Task.find({"service.sid": req.params.serviceId, $and:[{"keyword.akeyword": req.params.akeyword}]}, (err, statsHourly) => {
        if (err)
            res.send(err);  
        res.json(statsHourly);
    });
};

// delete a single task 
// exports.deleteTask = (req, res) => {
//     Task.remove({
//         _id: req.params.id
//     }, (err, stats_hourly) => {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task deleted!!' });
//     });
// };