import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { Strategy } from 'passport-jwt';
import { join } from 'path';
import { readFileSync } from 'fs';
import Routes from './src/api/routes';
import { Crontab, JwtOptions } from './src/api/utils';
import { DBUser } from './src/api/db';

// Enable dotenv configuration
dotenv.config();

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// MongoDB connection
(<any>mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});
mongoose.connection.on('error', () => {
  console.error('*** MongoDB *** connection error. Please make sur MongoDB is running.');
  process.exit();
});
mongoose.connection.on('open', () => {
  console.log('*** MongoDB *** connection is open.');
});

// JWT Strategy
const strategy = new Strategy(JwtOptions, (payload: any, next: any) => {
  DBUser.findOne({ _id: payload.id })
    .then(user => {
      if (!user) {
        return next(null, false);
      }
      return next(null, user);
    })
    .catch(err => {
      return next(err, false);
    });
});
passport.use(strategy);

// Crontab
Crontab.executeAll();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rest API
app.use('/api/', Routes);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`*** Express *** server listening on http://localhost:${PORT}`);
});
