const BaseRest = require('../rest.js')

module.exports = class extends BaseRest {
  async postAction() {
    if (this.jwt) {
      
      return this.success('test post ok!')
    }else{
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
}