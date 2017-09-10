const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');
const mongoose = require('think-mongoose');

module.exports = [
  view, // make application support view
  mongoose(think.app),
  model(think.app),
  cache,
  session
];
