var room = HBInit();

room.pluginSpec = {
  name: `rub/test`,
  author: `ruben`,
  version: `1.0.0`,
};

var msg = " has joined";

function onPlayerJoinHandler ( player ) {
	room.sendAnnouncement( "[1] " + player.name + msg );
}

room.onRoomLink = function onRoomLink() {
  room.onPlayerJoin = onPlayerJoinHandler;
}
