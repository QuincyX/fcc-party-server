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
    if (this.jwt) {
      let para = this.post()
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
  async putAction() {
    // if (this.jwt) {
    //   if (this.getId()) {
    //     let Post = this.mongoose('post')
    //     let para = this.post()
    //     para.id = this.getId()
    //     await Post.checkin(para).then(res => {
    //       return this.success(res)
    //     }).catch(err => {
    //       return this.fail(err)
    //     })
    //   } else {
    //     return this.fail('参数不完整')
    //   }
    // } else {
    //   return this.ctx.throw(401, '当前未授权，请重新登录')
    // }
  }
  async deleteAction() {
    // if (this.jwt) {
    //   if (this.getId()) {
    //     let Post = this.mongoose('post')
    //     await Post.delete(this.getId()).then(res => {
    //       return this.success(res)
    //     }).catch(err => {
    //       return this.fail(err)
    //     })
    //   } else {
    //     return this.fail('参数不完整')
    //   }
    // } else {
    //   return this.ctx.throw(401, '当前未授权，请重新登录')
    // }
  }
}