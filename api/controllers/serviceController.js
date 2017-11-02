const mongoose = require("mongoose");
const Task = mongoose.model("Service");
// get all tasks
exports.getTasks = (req, res) => {
    Task.find({}, (err, service) => {
        if (err)
            res.send(err);
        
        res.json(service);
    });
};
// update / insert
exports.upsertTask = (req, res) => {
    Task.findOneAndUpdate({sid: req.body.sid}, {"$set" : req.body}, { upsert: true, new: true }, (err, service) => {
    if (err) 
        res.send(err);
    res.json(service);
  });
};

// create a task
exports.createTask = (req, res) => {
    let newTask = new Task(req.body);
    newTask.save( (err, service) => {
        if (err)
            res.send(err);
        
        res.json(service);
    });
};

// read a single task 
exports.readTask = (req, res) => {
    Task.findOne(req.params.id, (err, service) => {
        if (err)
            res.send(err);
        res.json(service);
    });
};

// update a particular task 
exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, service) => {
    if (err) 
        res.send(err);
    res.json(service);
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