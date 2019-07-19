/**
 *  Plan:
 *    1) Simple Express app with dev workflow (Webpack etc)
 *    2) Fancy stuff
 *    3) Security
 *    4) Optimization
 *
 *    Gold: https://github.com/i0natan/nodebestpractices
 *
 *    (discarded) Use dotenv! Configure dev and prod
 *  TODO:
 *    Add good error handling
 *    Compartimentalize server
 *    Use **router.use**('/v1', v1ApiController) to set up routing
 *    Serve all static files from S3
 *    Upload content (photos from blog etc) to S3 as well
 *    Notify me of ANY type of error (server down, 4**, 5**, Error thrown etc.)
 *    Use a great logger like Winston (https://github.com/winstonjs/winston/tree/master/examples), Bunyan (highly popular) or Pino
 *    Prevent bruteforce attacks https://www.npmjs.com/package/rate-limiter-flexible
 *
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const Routes = require('./routes');
const app = express();

const chalk = require('chalk');
const dotenv = require('dotenv');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');
const errorhandler = require('errorhandler');

const isProduction = process.env.NODE_ENV === 'production';
/**
 * View engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Various middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routing
 */
app.use('/', Routes);

/**
 * Error Handling
 */
app.use((req, res, next) => {
  next(createError(404));
});

if (!isProduction) {
  // only use in development
  app.use(errorhandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500)
      .send('Server Error');
  });
}

module.exports = app;
