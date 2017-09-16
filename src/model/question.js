module.exports = class extends think.Mongoose {
  get schema() {
    return {
      title: {
        type: String,
        required: true,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'radio'
      },
      require: {
        type: think.Mongoose.Schema.Types.ObjectId
      },
      answer: {
        type: Array
      },
      survey: {
        type: think.Mongoose.Schema.Types.ObjectId,
        require: true
      },
    }
  }
  add(val) {
    let Question = this.mongoose('question')
    return new Promise((resolve, reject) => {
      let newQuestion = new Question(val)
      newQuestion.save((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
  addAll(val) {
    let Question = this.mongoose('question')
    let Answer = this.mongoose('answer')
    return new Promise((resolve, reject) => {
      Question.create(val, async (err, res) => {
        if (err) {
          reject(err)
        } else {
          res.forEach(async o => {
            console.log(o)
            o.answer.forEach(b => {
              b.question = o._id
            })
            await Answer.addAll(o.answer).then(ares => {
              resolve(res)
            }).catch(aerr => {
              reject(aerr)
            })
          })
        }
      })
    })
  }
  getAll(id) {
    let Question = this.mongoose('question')
    let Answer = this.mongoose('answer')
    return new Promise((resolve, reject) => {
      Question.find({
        survey: id
      }, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          docs.forEach(async o => {
            await Answer.getAll(o._id).then(res => {
              o.answer = res
              resolve(docs)
            })
          })
        }
      })
    })
  }
}