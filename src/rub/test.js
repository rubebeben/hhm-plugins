var room = HBInit();

room.pluginSpec = {
  name: `rub/test`,
  author: `ruben`,
  version: `1.0.0`,
};

function onPlayerJoinHandler ( player ) {
	room.kickPlayer( player.id, "testing", false);
}

room.onRoomLink = function onRoomLink() {
  room.onPlayerJoin = onPlayerJoinHandler;
}
