var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var RoomsAPI = require('../sources/roomsAPI');
var RoomConstants = require('../constants/roomConstants');

class RoomQueries extends Marty.Queries {
  getAllRooms() {
    return this.app.roomsAPI.getAllRooms().then(rooms => {
      return this.dispatch(RoomConstants.RECIEVE_ROOMS, rooms);
    });
  }
  getRoom(id) {
    return this.app.roomsAPI.getRoom(id).then(room => {
      this.dispatch(RoomConstants.RECIEVE_ROOMS, room);
    });
  }
}

module.exports = RoomQueries;