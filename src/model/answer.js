module.exports = class extends think.Mongoose {
  get schema() {
    return {
      content: {
        type: String,
        required: true
      },
      poll: {
        type: Number,
        default: 0
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
}