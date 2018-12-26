const logController = require('./controller');
const controller = new logController();

module.exports = (router) => {
  router.route('/today')
    .post(controller.logToday);
  // router.route('/date')
  //   .post(controller.logForDate);
  router.route('/between')
    .post(controller.logBetween);
  return router;
};