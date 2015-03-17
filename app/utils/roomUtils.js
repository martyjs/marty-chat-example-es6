var uuid = require('uuid').v1;
var _ = require('lodash');

module.exports = {
  createRoom(name) {
    return {
      id: uuid(),
      name: name,
      messages: [],
      cid: this.cid()
    };
  },
  cid() {
    return _.uniqueId('room');
  }
};