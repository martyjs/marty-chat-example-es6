var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var MessagesAPI = require('../sources/messagesAPI');
var MessageConstants = require('../constants/messageConstants');

class MessageQueries extends Marty.Queries {
  getMessagesForRoom(roomId) {
    return this.app.messagesAPI.getMessagesForRoom(roomId).then(res => {
      this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, res.body);
    });
  }
}

module.exports = MessageQueries;