module.exports = (app) => {
    let serviceList = require('../controllers/serviceController');
    let tariffList = require('../controllers/tariffController');
    let hourlyList = require('../controllers/hourlyStatsController');
    let inboundList = require('../controllers/inboundController');
    let hourlyViewList = require('../controllers/hourlyViewController');

    // our Routes
    app.route('/inbound')
       .post(inboundList.processTask);

    app.route('/service')
        .get(serviceList.getTasks) 
        .post(serviceList.upsertTask);
    
    app.route('/service/:serviceId')
        .get(serviceList.readTask)
        .put(serviceList.updateTask);

    app.route('/tariff')
        .get(tariffList.getTasks) 
        .post(tariffList.upsertTask);
    
    app.route('/tariff/:tariffId')
        .get(tariffList.readTask)
        .put(tariffList.updateTask);

    app.route('/stats/hourly')
        .get(hourlyList.getTasks);

    app.route('/view/hourly')
        // .get(hourlyViewList.getTasks)
        .post(hourlyViewList.processTask);
        // .put(hourlyViewList.updateTask);
}