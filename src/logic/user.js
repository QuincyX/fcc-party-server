module.exports = class extends think.Logic {
  postAction() {
    let rules = {
      account: {
        string: true,
        required: true,
      },
      password: {
        string: true,
        required: true,
      }
    }
    let msgs = {
      account: {
        required: '账号不能为空'
      },
      password: {
        required: '密码不能为空'
      }
    }
    if (!new RegExp(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/).test(this.post().account)) {
      return this.fail('账号名必须是email地址')
    }
    if (this.post().password.length < 6) {
      return this.fail('密码长度不能小于6位')
    } else if (this.post().password.length > 16) {
      return this.fail('密码长度不能大于16位')
    }
    if (!this.validate(rules, msgs)) {
      return this.fail('数据校验失败', this.validateErrors)
    }
  }
  getAction() {

  }
};