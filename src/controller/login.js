const BaseRest = require('./rest.js');
const jwt = require('jsonwebtoken');

module.exports = class extends BaseRest {
    async postAction() {
        let user = this.mongoose('user')
        let data = await user.find({});
        if ('ok') {
            let p = { "uid": 42245, "exp": Date.now() + 10 * 60 * 1000 }
            let t = jwt.sign(p,'key')
            this.cookie('jwt', t)
        }

        return this.success('login action ok!')
    }
};
