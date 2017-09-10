module.exports = class extends think.Logic {
  postAction() {
    let rules = {
      account: {
        string: true,       // 字段类型为 String 类型
        required: true,     // 字段必填
        method: 'POST'      // 指定获取数据的方式
      },
      password: {
        string: true,       // 字段类型为 String 类型
        required: true, 
        method: 'POST'       // 指定获取数据的方式
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
    if(!this.validate(rules,msgs)){
      return this.fail('数据校验失败', this.validateErrors);
    }
  }
};
