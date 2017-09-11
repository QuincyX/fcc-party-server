module.exports = class extends think.Mongoose {
  get schema() {
    return {
      title: {
        type: String,
        required: true,
        trim: true
      },
      content: {
        type: String,
        require: true
      },
      auther: {
        type: think.Mongoose.Schema.Types.ObjectId,
        require: true
      },
      date: {
        type: Date,
        default () {
          return new Date((new Date() / 1000 + 86400 * 1) * 1000)
        }
      },
      location: {
        type: String
      },
      register: {
        type: Array
      },
      attendance: {
        type: Array
      },
      read: {
        type: Number
      },
      heart: {
        type: Number
      },
      close: {
        type: Boolean
      },
      createTime: {
        type: Date,
        readonly: true
      },
      updatedTime: {
        type: Date,
        default: Date.now
      }
    }
  }
  add(val) {
    return new Promise(async(resolve, reject) => {
      let Post = this.mongoose('post')
      val.createTime = Date.now()
      let newPost = new Post(val)
      newPost.save((err, res) => {
        if (err) {
          reject(err)
        } else {
          res.__v = undefined
          resolve(res)
        }
      })
    })

  }
  async getList(val) {
    let Post = this.mongoose('post')
    let data = await Post.find().limit(10).skip(0)
    data.forEach(o => {
      o.__v = undefined
    })
    return data
  }
  async getOne(val) {
    return new Promise(async(resolve, reject) => {
      let Post = this.mongoose('post')
      Post.findById(val, (err, res) => {
        if (err) {
          reject(err)
        } else if (!res) {
          reject({
            errno: 1000,
            errmsg: '找不到请求的资源'
          })
        } else {
          res.__v = undefined
          resolve(res)
        }
      })
    })
  }
  async register(val) {
    return new Promise(async(resolve, reject) => {
      let Post = this.mongoose('post')
      Post.findById(val.postId, (err, res) => {
        if (err) {
          reject(err)
        } else if (!res) {
          reject({
            errno: 1000,
            errmsg: '找不到请求的资源'
          })
        } else {
          let newData = res
          if (newData.register.indexOf(val.userId) === -1) {
            newData.register.push(val.userId)
            res.update(newData, (err, newRes) => {
              if (err) {
                reject(err)
              } else {
                resolve(newRes)
              }
            })
          } else {
            reject({
              errno: 1000,
              errmsg: '您已经报过名'
            })
          }

        }
      })
    })
  }
}