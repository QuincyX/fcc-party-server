const path = require('path')
const assert = require('assert')
const jwt = require('jsonwebtoken')
const jwtKey = require('../config/key.js')

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
    assert(think.isFunction(this.model), 'this.model must be a function');
    this.modelInstance = this.mongoose(this.resource);
    if (this.cookie('token')) {
      this.jwt = jwt.verify(this.cookie('token'), jwtKey)
    }
  }
  __before() {

  }
  getResource() {
    const filename = this.__filename || __filename;
    const last = filename.lastIndexOf(path.sep);
    return filename.substr(last + 1, filename.length - last - 4);
  }
  getId() {
    const id = this.get('id');
    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }
    const last = this.ctx.path.split('/').slice(-1)[0];
    if (last !== this.resource) {
      return last;
    }
    return '';
  }
  async getAction() {

  }

  async postAction() {

  }
  async deleteAction() {

  }
  async putAction() {

  }
  __call() {

  }
};