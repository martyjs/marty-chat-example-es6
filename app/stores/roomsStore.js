var _ = require('lodash');
var Marty = require('marty');
var RoomUtils = require('../utils/roomUtils');
var RoomQueries = require('../queries/roomQueries');
var RoomConstants = require('../constants/roomConstants');

class RoomStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.state = {};
    this.handlers = {
      updateRoom: RoomConstants.UPDATE_ROOM,
      addRooms: RoomConstants.RECIEVE_ROOMS
    };
  }
  getAll() {
    return this.fetch({
      id: 'all-rooms',
      locally() {
        if (this.hasAlreadyFetched('all-rooms')) {
          return _.values(this.state);
        }
      },
      remotely() {
        return RoomQueries.for(this).getAllRooms();
      }
    });
  }
  getRoom(id) {
    return this.fetch({
      id: id,
      dependsOn: this.getAll(),
      locally() {
        return _.findWhere(_.values(this.state), {
          id: id
        }) || null;
      }
    });
  }
  roomExists(id) {
    return _.findWhere(_.values(this.state), {
      id: id
    });
  }
  updateRoom(cid, room) {
    this.state[cid] = _.extend(room, this.state[cid]);
    this.hasChanged();
  }
  addRoom(room) {
    this.addRooms([room]);
  }
  addRooms(rooms) {
    if (!_.isArray(rooms)) {
      rooms = [rooms];
    }

    _.each(rooms, (room) => {
      if (!room.cid) {
        room.cid = RoomUtils.cid();
      }

      this.state[room.cid] = room;
    });

    this.hasChanged();
  }
}

module.exports = Marty.register(RoomStore);