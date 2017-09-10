const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    async getAction() {
        let user = this.mongoose('user')
        let data = await user.find({});
        return this.success(this.get('id'))
    }
    postAction() {
        let d = this.post()
        console.log(d)
        return this.success('ok')
    }
};
