const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const errorHandler = require('./middlewares/error-handler.middleware');
const asyncHandler = require('./middlewares/async-handler.middleware');
const { apiRouter } = require('./resources/api.router');
const { feedbacksService } = require('./resources/feedbacks/feedback.service');
const { hasToken } = require('./middlewares/auth.middleware');
const { JWT_SECRET_KEY } = require('./common/config');
const { MONGO_CONNECTION_STRING } = require('./common/config');

const sessionStore = new MongoStore({
  collection: 'sessions',
  uri: MONGO_CONNECTION_STRING,
});

const app = express();

app.use(express.json());

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'src/pages');
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session(
    {
      secret: JWT_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    },
  ),
);

app.get(
  '/',
  (req, res) => {
    if (req.originalUrl === '/') {
      res.redirect('/feedback');
    }
  },
);

app.get(
  '/feedback/',
  (req, res) => {
    res.render('feedback');
  },
);

app.get(
  '/login',
  (req, res) => {
    if (req.session.token) {
      res.redirect('/admin');
      return;
    }
    res.render('login');
  },
);

app.get(
  '/admin',
  asyncHandler(hasToken),
  asyncHandler(async (req, res) => {
    const fbs = await feedbacksService.getAll();
    res.render('admin', { feedbacks: fbs, isAuth: !!req.user });
  }),
);

app.get(
  '/admin/:id',
  asyncHandler(hasToken),
  asyncHandler(async (req, res) => {
    const fb = await feedbacksService.getById(req.params.id);
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
    });

    fb.changeLog = fb.changeLog.map((rec) => {
      const newRec = { userId: rec.userId, date: rec.date, user: rec.user };
      newRec.date = formatter.format(newRec.date);
      console.log(rec.user);
      return newRec;
    });
    res.render('admin-feedback', { feedback: fb, isAuth: !!req.user });
  }),
);

app.use('/api', apiRouter);

app.use(errorHandler);

module.exports = app;
