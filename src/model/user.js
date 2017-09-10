const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtKey = 'myHeartWillGoOn'
const pwdSecret = 'justwaiting'

function getToken(val) {
	let jwtPayload = {
		id: val._id,
		userName: val.userName,
		iat: Date.now()
	}
	return jwt.sign(jwtPayload, jwtKey)
}

function setPwd(val) {
	let secret = 'justwaiting'
	return crypto.createHmac('sha1', secret).update(val).digest('hex')
}

module.exports = class extends think.Mongoose {
	get schema() {
		return {
			account: {
				type: String,
				readonly: true,
				required: true,
				unique: true
			},
			password: {
				type: String,
				required: true
			},
			userName: {
				type: String
			},
			mobilePhone: {
				type: Number
			},
			trueName: {
				type: String
			},
			token: {
				type: String
			},
			createTime: {
				type: Date
			},
			updatedTime: {
				type: Date,
				default: Date.now
			}
		}
	}
	add(val) {
		return new Promise((resolve, reject) => {
			let User = this.mongoose('user')
			val.password = setPwd(val.password)
			val.userName = val.account.split('@')[0]
			val.createTime = Date.now()
			let newUser = new User(val)
			newUser.save((err, res) => {
				if (err) {
					let e = {}
					switch (err.code) {
						case 11000:
							e = {
								errno: 1000,
								errmsg: val.account + ' 用户已注册'
							}
							break
						default:
							e = err
							break
					}
					reject(e)
				} else {
					resolve(res.account + ' 注册成功')
				}
			})
		})
	}
	login(val) {
		return new Promise(async (resolve, reject) => {
			let User = this.mongoose('user')
			let password = await setPwd(val.password)
			let data = await User.findOne({ account: val.account })
			if (think.isEmpty(data)) {
				reject({
					errno: 1000,
					errmsg: '用户不存在'
				})
			} else {
				if (password == data.password) {
					data.__v = undefined
					data.password = undefined
					data.token = getToken(data)
					resolve(data)
				} else {
					reject({
						errno: 1000,
						errmsg: '密码错误'
					})
				}
			}
		})
	}
	getInfo(val) {
		return new Promise(async (resolve, reject) => {
			let User = this.mongoose('user')
			User.findById(val, (err, res) => {
				if (err) {
					reject({
						errno: 1000,
						errmsg: '用户不存在'
					})
				} else {
					res.password = undefined
					res.__v = undefined
					resolve(res)
				}
			})
		})
	}
}
