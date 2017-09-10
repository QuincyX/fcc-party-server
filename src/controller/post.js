const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    let data = await this.modelInstance.find({});
    return this.success(data)
  }
  listAction(){
    return this.success('list ok')
  }
};
