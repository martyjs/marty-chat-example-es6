var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var NewRoom = require('./newRoom');
var RoomsStore = require('../stores/roomsStore');
var NavigationActionCreators = require('../actions/navigationActionCreators');

class Home extends Marty.Component {
  constructor(props, context) {
    super(props, context);
    this.listenTo = RoomsStore;
    this.renderRooms = _.bind(this.renderRooms, this);
    this.navigateToRoom = _.bind(this.navigateToRoom, this);
  }
  getState() {
    return {
      rooms: RoomsStore.for(this).getAll()
    };
  }
  render() {
    return (
      <div className="home">
        <NewRoom />
        {this.renderRooms()}
      </div>
    );
  }
  renderRooms() {
    var navigateToRoom = this.navigateToRoom;
    return this.state.rooms.when({
      pending() {
        return <div className='pending'>Loading rooms...</div>;
      },
      failed(error) {
        return <div className='error'>Failed to load rooms. {error.message}</div>;
      },
      done(rooms) {
        return (
          <ul className="rooms">
            {_.map(rooms, room => {
              return (
                <li className='room'>
                  <a href="#" onClick={_.partial(navigateToRoom, room.id)}>
                    {room.name}
                  </a>
                </li>
              );
            })}
          </ul>
        );
      }
    }, this);
  }
  navigateToRoom(roomId) {
    console.log('navigateToRoom')
    NavigationActionCreators.for(this).navigateToRoom(roomId);
  }
}

module.exports = Home;