const mongoose = require("mongoose");
const Task = mongoose.model("Tariff");
// get all tasks
exports.getTasks = (req, res) => {
    var qry = req.body;
    Task.find(qry, (err, tariff) => {
        if (err)
            res.send(err);
        
        res.json(tariff);
    });
};
// update / insert
exports.upsertTask = (req, res) => {
    Task.findOneAndUpdate({tid: req.body.tid}, {"$set" : req.body}, { upsert: true, new: true }, (err, tariff) => {
    if (err) 
        res.send(err);
    res.json(tariff);
  });
};

// create a task
exports.createTask = (req, res) => {
    let newTask = new Task(req.body);
    newTask.save( (err, tariff) => {
        if (err)
            res.send(err);
        
        res.json(tariff);
    });
};

// read a single task 
exports.readTask = (req, res) => {
    Task.findOne(req.params.id, (err, tariff) => {
        if (err)
            res.send(err);
        res.json(tariff);
    });
};

// update a particular task 
exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, tariff) => {
    if (err) 
        res.send(err);
    res.json(tariff);
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