const BaseRest = require('../rest.js')

module.exports = class extends BaseRest {
  async postAction() {
    if (this.jwt) {
      let Post = this.mongoose('post')
      let para = {
        postId: this.getId(),
        userId: this.jwt.id
      }
      await Post.register(para).then(res => {
        return this.success(res)
      }).catch(err => {
        return this.fail(err)
      })
    } else {
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
}