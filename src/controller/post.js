const BaseRest = require('./rest.js')

module.exports = class extends BaseRest {
  async getAction() {
    if (this.getId()) {
      await this.modelInstance.getOne(this.getId()).then(res => {
        return this.success(res)
      }).catch(err => {
        return this.fail(err)
      })
    } else {
      let data = await this.modelInstance.getList()
      return this.success(data)
    }
  }
  async postAction() {
    let para = this.post()
    if (this.jwt) {
      para.auther = this.jwt.id
      await this.modelInstance.add(para).then(res => {
        return this.success(res)
      }).catch(err => {
        return this.fail(err)
      })
    } else {
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
}