var uuid = require('uuid').v1;
var _ = require('lodash');

module.exports = {
  createMessage(text, roomId) {
    return {
      text: text,
      id: uuid(),
      roomId: roomId,
      cid: this.cid(),
      timestamp: new Date().toJSON()
    };
  },
  cid() {
    return _.uniqueId('message');
  }
};