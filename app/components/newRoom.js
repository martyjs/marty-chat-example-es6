var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var RoomActionCreators = require('../actions/roomActionCreators');

class NewRoom extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onKeyDown = _.bind(this.onKeyDown, this);
    this.createRoom = _.bind(this.createRoom, this);
    this.updateRoomName = _.bind(this.updateRoomName, this);
    this.state = {
      name: ''
    };
  }
  render() {
    var name = this.state.name;

    return (
      <form className='new-room form-inline'>
        <div className='form-group'>
          <input
               ref='name'
               name='name'
               type='text'
               value={name}
               placeholder='Room name'
               className='form-control'
               onKeyDown={this.onKeyDown}
               onChange={this.updateRoomName} />
        </div>
        <button className='btn btn-default' ref='createRoom' onClick={this.createRoom}>
          Create room
        </button>
      </form>
    );
  }
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.createRoom(e);
    }
  }
  updateRoomName(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }
  createRoom(e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.state.name.trim() !== "") {
      this.context.app.roomActionCreators.createRoom(this.state.name);
      this.setState({
        name: ''
      });
    }
  }
}

NewRoom.contextTypes = Marty.contextTypes;

module.exports = NewRoom;