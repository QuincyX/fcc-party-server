const BaseRest = require('./rest.js')

module.exports = class extends BaseRest {
  async getAction() {
    if (this.jwt) {
      if (this.get('id')) {
        if (this.jwt.role === 'admin') {
          await this.modelInstance.getInfo(this.get('id')).then(res => {
            return this.success(res)
          }).catch(err => {
            return this.fail(err)
          })
        } else {
          return this.fail({
            errno: 401,
            errmsg: '当前用户权限不足'
          })
        }
      } else {
        await this.modelInstance.getInfo(this.jwt.id).then(res => {
          return this.success(res)
        }).catch(err => {
          return this.fail(err)
        })
      }
    } else {
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
  async postAction() {
    await this.modelInstance.add(this.post()).then(res => {
      return this.success(res)
    }).catch(err => {
      return this.fail(err)
    })
  }
  async putAction() {
    console.log('>>>>>')

    if (this.jwt) {
      if (this.get('id')) {
        if (this.jwt.role === 'admin') {
          let para = this.post()
          para.id = this.get('id')
          await this.modelInstance.update(para).then(res => {
            return this.success(res)
          }).catch(err => {
            return this.fail(err)
          })
        } else {
          return this.fail({
            errno: 400,
            errmsg: '当前用户权限不足'
          })
        }
      } else {
        let para = this.post()
        para.id = this.jwt.id
        await this.modelInstance.update(para).then(res => {
          return this.success(res)
        }).catch(err => {
          return this.fail(err)
        })
      }
    } else {
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
  async deleteAction() {
    if (this.jwt) {
      if (this.get('id')) {
        if (this.jwt.role === 'admin') {
          await this.modelInstance.delete(this.get('id')).then(res => {
            return this.success(res)
          }).catch(err => {
            return this.fail(err)
          })
        } else {
          return this.fail({
            errno: 400,
            errmsg: '当前用户权限不足'
          })
        }
      } else {
        return this.fail({
          errno: 400,
          errmsg: '参数不完整'
        })
      }
    } else {
      return this.ctx.throw(401, '当前未授权，请重新登录')
    }
  }
}