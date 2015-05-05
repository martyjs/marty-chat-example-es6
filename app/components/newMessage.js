var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var MessageActionCreators = require('../actions/messageActionCreators');

class NewMessage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onKeyDown = _.bind(this.onKeyDown, this);
    this.updateText = _.bind(this.updateText, this);
    this.sendMessage = _.bind(this.sendMessage, this);
    this.state = {
      text: ''
    };
  }
  render() {
    return (
      <div className='new-message'>
        <textarea
          rows="3"
          value={this.state.text}
          className="form-control"
          onKeyDown={this.onKeyDown}
          onChange={this.updateText}/>
        <button className='btn btn-primary' onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }
  updateText(e) {
    this.setState({
      text: e.currentTarget.value
    });
  }
  sendMessage() {
    this.context.app.messageActionCreators.sendMessage(
      this.state.text,
      this.props.roomId
    );
    this.setState(this.getInitialState());
    return false;
  }
}

NewMessage.contextTypes = Marty.contextTypes;

module.exports = NewMessage;