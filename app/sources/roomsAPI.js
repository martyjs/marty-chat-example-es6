var _ = require('lodash');
var Marty = require('marty');

class RoomHttpAPI extends Marty.HttpStateSource {
  getAllRooms() {
    return this.get('/api/rooms');
  }
  getRoom(id) {
    return this.get('/api/rooms/' + id);
  }
  createRoom(room) {
    return this.post({
      url: '/api/rooms',
      body: _.omit(room, 'cid')
    });
  }
}

module.exports = RoomHttpAPI;