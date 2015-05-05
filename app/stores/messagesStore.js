var _ = require('lodash');
var Marty = require('marty');
var MessageUtils = require('../utils/messageUtils');
var MessageQueries = require('../queries/messageQueries');
var MessageConstants = require('../constants/messageConstants');

class MessagesStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.state = {};
    this.handlers = {
      addMessages: MessageConstants.RECIEVE_MESSAGES,
      updateMessage: MessageConstants.UPDATE_MESSAGE
    };
  }

  getMessagesForRoom(roomId) {
    return this.fetch({
      id: roomId,
      locally() {
        return this.state[roomId];
      },
      remotely() {
        return this.app.messageQueries.getMessagesForRoom(roomId);
      }
    });
  }
  getMessage(messageId, roomId) {
    var messages = this.state[roomId];

    if (messages) {
      return _.findWhere(messages, {
        id: messageId
      });
    }
  }
  updateMessage(cid, message) {
    var oldMessage = _.findWhere(this.state[message.roomId], {
      cid: cid
    });

    if (oldMessage) {
      _.extend(oldMessage, message);
      this.hasChanged();
    }
  }
  addMessages(roomId, messages) {
    if (!_.isArray(messages)) {
      messages = [messages];
    }

    _.each(messages, (message) => {
      if (!message.cid) {
        message.cid = MessageUtils.cid();
      }
    });

    this.state[roomId] = _.union(messages, this.state[roomId]);
    this.hasChanged();
  }
}

module.exports = MessagesStore;