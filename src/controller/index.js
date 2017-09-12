const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    let User = this.mongoose('user')
    let Post = this.mongoose('post')
    let a = await User.where({ }).count()
    this.assign({
      userNumber: await User.where({ }).count(), 
      postNumber: await Post.where({ }).count()
    }); 
    return this.display();
  }
};
