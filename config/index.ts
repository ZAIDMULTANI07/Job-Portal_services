import app from './app';
import db from './database';
import settings from './settings';
import services from './services';
import jwt from './jwt';
import queue from './queue';
import mailman from './mailman';
import cache from './cache';

export default [app, db, cache, mailman, settings, jwt, queue, services];
