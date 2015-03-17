var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;

class MessageHttpAPI extends Marty.HttpStateSource {
  getMessagesForRoom(roomId) {
    return this.get(format('/api/rooms/%s/messages', roomId));
  }
  createMessage(message) {
    return this.post({
      body: _.omit(message, 'cid'),
      url: format('/api/rooms/%s/messages', message.roomId)
    });
  }
}

module.exports = Marty.register(MessageHttpAPI);