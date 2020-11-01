const userRouter = require('express').Router();
const loginService = require('../../common/login.service');
const BadLoginError = require('../../errors/bad-login.error');
const asyncHandler = require('../../middlewares/async-handler.middleware');
const { hasToken } = require('../../middlewares/auth.middleware');
const { usersService } = require('./user.service');

userRouter.route('/').get(
  asyncHandler(hasToken),
  asyncHandler(
    async (req, res) => {
      const users = await usersService.getAllByBoardId(req.params.boardId);
      delete users.password;
      res.json(users);
    },
  ),
);

userRouter.route('/login').post(
  asyncHandler(
    async (req, res) => {
      const { username, password } = req.body;
      const token = await loginService.login(username, password);
      if (!token) {
        throw new BadLoginError();
      }
      req.session.token = token;
      req.session.isAuthorized = true;
      req.session.save((err) => {
        if (err) throw new Error();
        res.json(token);
      });
    },
  ),
);

userRouter.route('/logout').get(
  asyncHandler(
    async (req, res) => {
      req.session.destroy(() => {
        res.redirect('/login');
      });
    },
  ),
);

module.exports = userRouter;
