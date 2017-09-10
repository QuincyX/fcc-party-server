const BaseRest = require('./rest.js');
const jwt = require('jsonwebtoken');

module.exports = class extends BaseRest {
	async postAction() {
		await this.mongoose('user').add(this.post()).then(res => {
			return this.success(res)
		}).catch(err => {
			return this.fail(err)
		})
	}
};
