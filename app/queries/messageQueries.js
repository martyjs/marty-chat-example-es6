var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var MessagesAPI = require('../sources/messagesAPI');
var MessageConstants = require('../constants/messageConstants');

class MessageQueries extends Marty.Queries {
  getMessagesForRoom(roomId) {
    return this.app.messagesAPI.getMessagesForRoom(roomId).then(messages => {
      this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, messages);
    });
  }
}

module.exports = MessageQueries;