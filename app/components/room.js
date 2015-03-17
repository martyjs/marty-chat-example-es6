var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var NewMessage = require('./newMessage');
var RoomsStore = require('../stores/roomsStore');
var MessagesStore = require('../stores/messagesStore');

class Room extends Marty.Component {
  constructor(props, context) {
    super(props, context);
    this.listenTo = [RoomsStore, MessagesStore];
  }
  getState() {
    return {
      room: RoomsStore.for(this).getRoom(this.props.id),
      messages: MessagesStore.for(this).getMessagesForRoom(this.props.id)
    };
  }
  render() {
    var body = this.state.room.when({
      pending() {
        return <div className='loading'>Loading...</div>;
      },
      failed(error) {
        return <div className='error'>Failed to load room. {error.message}</div>;
      },
      done(room) {
        return (
          <div className='room-body'>
            <h1 className='room-name'>{room.name}</h1>
            {this.renderMessages()}
            <NewMessage roomId={room.id} />
          </div>
        );
      }
    }, this);

    return <div className='room'>{body}</div>;
  }
  renderMessages() {
    return this.state.messages.when({
      pending() {
        return <div className='messages-loading'>Loading messages...</div>
      },
      failed(error) {
        return <div className='messages-error'>Failed to load messages. {error.message}</div>
      },
      done(messages) {
        messages = _.sortBy(messages, message => new Date(message.timestamp));

        return (
          <ul className='messages'>
            {_.map(messages, message => {
              return (
                <li className='message'>
                  <div className='message-text'>
                    {message.text}
                  </div>
                </li>
              );
            })}
          </ul>
        );
      }
    });
  }
}

module.exports = Room;