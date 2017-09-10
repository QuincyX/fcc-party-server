const crypto = require('crypto');

function setPwd(val) {
    let secret = 'justwaiting'
    return crypto.createHmac('md5', secret).digest('hex')
}

module.exports = class extends think.Mongoose {
    get schema() {
        return {
            account: {
                type: String,
                unique: true
            },
            password: String
        }
    }
    getList() {
        // return this.find();
        return 'model ok'
    }
    add(val) {
        return new Promise((resolve, reject) => {
            let User = this.mongoose('user')
            val.password = setPwd(val.password)
            let newUser = new User(val)
            newUser.save((err, res) => {
                if (err) {
                    let e = {}
                    switch (err.code) {
                        case 11000:
                            e = {
                                errno: 100,
                                errmsg: val.account + ' 用户已注册'
                            }
                            break
                        default:
                            e = err
                            break
                    }
                    reject(e)
                } else {
                    resolve(res.account+' 注册成功')
                }
            })
        })

    }
}