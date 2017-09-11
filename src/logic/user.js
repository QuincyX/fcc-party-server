module.exports = class extends think.Logic {
  postAction() {
    let rules = {
      account: {
        string: true,
        required: true,
        method: 'POST'
      },
      password: {
        string: true,
        required: true,
        method: 'POST'
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
    if (!this.validate(rules, msgs)) {
      return this.fail('数据校验失败', this.validateErrors);
    }
  }
};