// Not being used ATM'use strict';const server = require('./server')();// const config = require('./config');const db = require('./config');const lala = require('./config');server.create(config, db);server.start();