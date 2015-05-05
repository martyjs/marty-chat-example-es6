var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var RoomsAPI = require('../sources/roomsAPI');
var RoomConstants = require('../constants/roomConstants');

class RoomQueries extends Marty.Queries {
  getAllRooms() {
    return this.app.roomsAPI.getAllRooms().then(res => {
      return this.dispatch(RoomConstants.RECIEVE_ROOMS, res.body);
    });
  }
  getRoom(id) {
    return this.app.roomsAPI.getRoom(id).then(res => {
      this.dispatch(RoomConstants.RECIEVE_ROOMS, res.body);
    });
  }
}

module.exports = RoomQueries;