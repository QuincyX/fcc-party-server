module.exports = class extends think.Mongoose {
  get schema() {
    return {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String
      },
      auther: {
        type: think.Mongoose.Schema.Types.ObjectId,
        require: true
      },
      question: {
        type: Array,
        require: true
      },
      type: {
        type: Number,
        default: 1
      },
      close: {
        type: Boolean,
        default: false
      },
      endTime: {
        type: Date,
        default() {
          return new Date((new Date() / 1000 + 86400 * 1) * 3000)
        }
      },
      updatedTime: {
        type: Date,
        default: Date.now
      },
      createTime: {
        type: Date,
        default: Date.now,
        readonly: true
      }
    }
  }
  add(val) {
    return new Promise(async (resolve, reject) => {
      let Survey = this.mongoose('survey')
      let Question = this.mongoose('question')
      let newSurvey = new Survey(val)
      newSurvey.save(async (err, res) => {
        if (err) {
          reject(err)
        } else {
          val.question.forEach(o => {
            o.survey = res._id
          })
          await Question.addAll(val.question)
          res.question = undefined
          res.__v = undefined
          resolve(res)
        }
      })
    })
  }
  async getList(val) {
    let Survey = this.mongoose('survey')
    let data = await Survey.find().limit(10).skip(0)
    data.forEach(o => {
      o.__v = undefined
    })
    return data
  }
  getOne(id) {
    let Survey = this.mongoose('survey')
    let Question = this.mongoose('question')
    return new Promise((resolve, reject) => {
      Survey.findById(id, async (err, doc) => {
        if (err) {
          reject(err)
        } else {
          await Question.getAll(doc._id).then(res => {
            doc.question = res
            resolve(doc)
          })
        }
      })
    })
  }
}