const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  async postAction() {
    await this.mongoose('user').login(this.post()).then(res => {
      this.cookie('token', res.token)
      return this.success(res)
    }).catch(err => {
      return this.fail(err)
    })
  }
  getAction() {
    if (this.jwt) {
      return this.success(this.jwt)
    } else {
      return this.fail('当前没有登录信息')
    }
  }
};