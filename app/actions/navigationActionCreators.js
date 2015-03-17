var Marty = require('marty');
var Router = require('../router');

class NavigationActionCreators extends Marty.ActionCreators {
  navigateHome() {
    navigateTo('home');
  }
  navigateToRoom(id) {
    navigateTo('room', { id: id });
  }
}

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

module.exports = Marty.register(NavigationActionCreators);