var Marty = require('marty');
var MessageUtils = require('../utils/messageUtils');
var MessagesAPI = require('../sources/messagesAPI');
var MessageConstants = require('../constants/messageConstants');

class MessageActionCreators extends Marty.ActionCreators {
  sendMessage(text, roomId) {
    var message = MessageUtils.createMessage(text, roomId);

    this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, message);

    MessagesAPI.createMessage(message).then(res => {
      this.dispatch(MessageConstants.UPDATE_MESSAGE, message.cid, res.body);
    });
  }
  recieveMessages(roomId, messages) {
    this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, messages);
  }
}

module.exports = Marty.register(MessageActionCreators);
