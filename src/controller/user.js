const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
	async getAction() {
		let User = this.mongoose('user')
		await User.getInfo(this.get('id')).then(res => {
			return this.success(res)
		}).catch(err => {
			return this.fail(err)
		})
	}
	postAction() {
		let d = this.post()
		console.log(d)
		return this.success('ok')
	}
};
