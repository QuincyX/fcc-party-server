const BaseRest = require('../rest.js')

module.exports = class extends BaseRest {
  async postAction() {
    if (this.jwt) {
      if (this.getId()) {
        let Post = this.mongoose('post')
        let para = {
          postId: this.getId(),
          userId: this.jwt.id
        }
        await Post.checkin(para).then(res => {
          return this.success(res)
        }).catch(err => {
          return this.fail(err)
        })
      } else {
        return this.fail('参数不完整')
      }
    } else {
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
}