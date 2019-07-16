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
 *    Find Nodemon thingy, figure out if PM2 is good https://pm2.io/doc/en/runtime/reference/ecosystem-file/
 *    Use stuff like connection.on('error', blabla)?
 *
 *
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const dotenv = require('dotenv');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');
const errorhandler = require('errorhandler');
const helmet = require('helmet');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Create Express server.
 */
const app = express();

/**
 * View engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Various middleware
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use(require('./controllers'));

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

/**
 * Start Express server.
 */
app.use(helmet.hidePoweredBy()); // Remove the X-Powered-By header

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
