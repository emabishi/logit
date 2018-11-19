const controller = require('./controller');

module.exports = (router) => {
  router.route('/today')
    .post(controller.logToday);
  router.route('/date')
    .post(controller.logForDate);
  router.route('/between')
    .post(controller.logBetween);
  return router;
};