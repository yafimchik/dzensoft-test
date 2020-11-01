const feedbackRouter = require('express').Router();
const asyncHandler = require('../../middlewares/async-handler.middleware');
const { hasToken } = require('../../middlewares/auth.middleware');
const { feedbacksService } = require('./feedback.service');
const { feedbackValidator } = require('./feedback.validator');

feedbackRouter.route('/').get(
  asyncHandler(hasToken),
  asyncHandler(
    async (req, res) => {
      const fbs = await feedbacksService.getAll();
      res.json(fbs);
    },
  ),
);

feedbackRouter.route('/').post(
  asyncHandler(feedbackValidator),
  asyncHandler(
    async (req, res) => {
      const fb = req.body;
      const result = await feedbacksService.create(fb);
      res.json(result);
    },
  ),
);

feedbackRouter.route('/:id').get(
  asyncHandler(hasToken),
  asyncHandler(
    async (req, res) => {
      const fb = await feedbacksService.getById(req.params.id);
      res.json(fb);
    },
  ),
);

feedbackRouter.route('/:id').put(
  asyncHandler(hasToken),
  asyncHandler(feedbackValidator),
  asyncHandler(
    async (req, res) => {
      const fb = req.body;
      fb.lastUser = req.user;
      let { changeLog } = await feedbacksService.getById(req.params.id);
      if (!changeLog) changeLog = [];
      // eslint-disable-next-line no-underscore-dangle
      changeLog.push({ userId: req.user._id, date: new Date() });
      fb.changeLog = changeLog;
      const result = await feedbacksService.update(req.params.id, fb);

      res.json(result);
    },
  ),
);

feedbackRouter.route('/:id').delete(
  asyncHandler(hasToken),
  asyncHandler(
    async (req, res) => {
      await feedbacksService.deleteById(req.params.id);
      res.json({ deleted: 'successfully' });
    },
  ),
);

module.exports = feedbackRouter;
