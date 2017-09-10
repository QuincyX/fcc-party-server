const BaseRest = require('./rest.js');
const jwt = require('jsonwebtoken');
const jwtKey = 'myHeartWillGoOn'

module.exports = class extends BaseRest {
    async postAction() {
        await this.mongoose('user').login(this.post()).then(res => {
            this.cookie('token', res.token)
            return this.success(res)
        }).catch(err => {
            return this.fail(err)
        })
    }
    getAction() {
        let info = jwt.verify(this.cookie('token'), jwtKey)
        console.log('info>>>')
        console.log(info)
        return this.success(info)
    }
};
