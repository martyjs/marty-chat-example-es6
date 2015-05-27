var Marty = require('marty');

class Application extends Marty.Application {
  constructor(options) {
    super(options);

    this.register(require('./stores'));
    this.register(require('./actions'));
    this.register(require('./queries'));
    this.register(require('./sources'));
    this.router = require('./router');
  }
}

module.exports = Application;