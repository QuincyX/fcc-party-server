const BaseRest = require('./rest.js');
const jwt = require('jsonwebtoken');

module.exports = class extends BaseRest {
    async postAction() {
        let user = this.mongoose('user')
        await user.add(this.post()).then(res => {
            return this.success(res)
        }).catch(err => {
            return this.fail(err);
        })
    }
};
