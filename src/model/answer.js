module.exports = class extends think.Mongoose {
  get schema() {
    return {
      content: {
        type: String
      },
      image: {
        type: String
      },
      poll: {
        type: Number,
        default: 0
      },
      userContent: {
        type: Array
      },
      type: {
        type: String,
        default: 'text'
      },
      question: {
        type: think.Mongoose.Schema.Types.ObjectId,
        require: true
      },
    }
  }
  add(val) {
    return new Promise((resolve, reject) => {
      let Answer = this.mongoose('answer')
      let newAnswer = new Answer(val)
      newAnswer.save((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
  addAll(val) {
    return new Promise((resolve, reject) => {
      let Answer = this.mongoose('answer')
      Answer.create(val, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
  getAll(id) {
    return new Promise((resolve, reject) => {
      let Answer = this.mongoose('answer')
      Answer.find({
        question: id
      }, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          console.log(docs)
          docs.forEach(o => {
            o.__v = undefined
          })
          resolve(docs)
        }
      })
    })
  }
  update(val) {

    return new Promise((resolve, reject) => {
      let Answer = this.mongoose('answer')
      Answer.findById(val.id, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          if (doc.type === 'text' || doc.type === 'image') {
            doc.poll++
          } else if (doc.type === 'user') {
            doc.userContent.push(val.content)
          }
          doc.save((derr, ddoc) => {
            if (err) {
              reject(derr)
            } else {
              resolve(ddoc)
            }
          })
        }
      })
    })
  }
  updateAll(val) {
    console.log('>>>>>>>>>>')
    console.log(val)
    return new Promise((resolve, reject) => {
      let Answer = this.mongoose('answer')
      val.forEach(async a => {
        await this.update(a).catch(err => {
          reject(err)
        })
      })
      resolve('提交问卷成功')
    })
  }
}