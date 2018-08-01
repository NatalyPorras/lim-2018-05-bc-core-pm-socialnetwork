global.window = global;
global.assert = require('chai').assert;
global.jestExpect = global.expect;
require('../src/js/app');

const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth
);
require('./app.spec.js');
