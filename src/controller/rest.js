const path = require('path');
const assert = require('assert');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
    assert(think.isFunction(this.model), 'this.model must be a function');
    this.modelInstance = this.mongoose(this.resource);
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
    // let data;
    // if (this.id) {
    //   const pk = await this.modelInstance.pk;
    //   data = await this.modelInstance.where({[pk]: this.id}).find();
    //   return this.success(data);
    // }
    // data = await this.modelInstance.select();
    // return this.success(data);
  }

  async postAction() {
    // const pk = await this.modelInstance.pk;
    // const data = this.post();
    // delete data[pk];
    // if (think.isEmpty(data)) {
    //   return this.fail('data is empty');
    // }
    // const insertId = await this.modelInstance.add(data);
    // return this.success({ id: insertId });
  }
  async deleteAction() {
    // if (!this.id) {
    //   return this.fail('params error');
    // }
    // const pk = await this.modelInstance.pk;
    // const rows = await this.modelInstance.where({ [pk]: this.id }).delete();
    // return this.success({ affectedRows: rows });
  }
  async putAction() {
    // if (!this.id) {
    //   return this.fail('params error');
    // }
    // const pk = await this.modelInstance.pk;
    // const data = this.post();
    // delete data[pk];
    // if (think.isEmpty(data)) {
    //   return this.fail('data is empty');
    // }
    // const rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
    // return this.success({ affectedRows: rows });
  }
  __call() {

  }
};
