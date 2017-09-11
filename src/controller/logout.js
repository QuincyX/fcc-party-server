const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  getAction() {
    if (this.jwt) {
      this.cookie('token', null)
      this.success('登出成功')
    } else {
      this.fail('没有登录信息')
    }
  }
};