const apiRouter = require('express').Router();
const feedbackRouter = require('./feedbacks/feedback.router');
const userRouter = require('./users/user.router');

apiRouter.use('/feedbacks', feedbackRouter);

apiRouter.use('/users', userRouter);

module.exports = {
  apiRouter,
};
