const controller = require('./controller');

module.exports = (router) => {
  router.route('/today')
    .post(controller.logToday);
  return router;
};