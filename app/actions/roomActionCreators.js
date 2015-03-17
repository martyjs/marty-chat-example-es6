var Marty = require('marty');
var RoomUtils = require('../utils/roomUtils');
var RoomsAPI = require('../sources/roomsAPI')
var RoomConstants = require('../constants/roomConstants');
var NavigationActionCreators = require('./navigationActionCreators');

class RoomActionCreators extends Marty.ActionCreators {
  createRoom(name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(RoomConstants.RECIEVE_ROOMS, room);

    RoomsAPI.createRoom(room).then(res => {
      this.dispatch(RoomConstants.UPDATE_ROOM, room.cid, res.body);
    });
  }
  recieveRooms(rooms) {
    this.dispatch(RoomConstants.RECIEVE_ROOMS, rooms);
  }
}

module.exports = Marty.register(RoomActionCreators);