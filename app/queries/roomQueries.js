var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var RoomsAPI = require('../sources/roomsAPI');
var RoomConstants = require('../constants/roomConstants');

class RoomQueries extends Marty.Queries {
  getAllRooms() {
    return RoomsAPI.for(this).getAllRooms().then(res => {
      return this.dispatch(RoomConstants.RECIEVE_ROOMS, res.body);
    });
  }
  getRoom(id) {
    return RoomsAPI.for(this).getRoom(id).then(res => {
      this.dispatch(RoomConstants.RECIEVE_ROOMS, res.body);
    });
  }
}

module.exports = Marty.register(RoomQueries);