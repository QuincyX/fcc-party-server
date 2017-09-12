const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.ctx.res.end('0')
    return this.success('ok')
  }
};