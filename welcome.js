var room = HBInit();

room.pluginSpec = {
  name: `rub/welcome`,
  author: `ruben`,
  version: `1.0.0`,
};

var msg = " has joined";

function onPlayerJoinHandler ( player ) {
	room.getPlugin(`rub/displayMessage`).displayMessage( "Welcome " + player.name );
}

room.onRoomLink = function onRoomLink() {
  room.onPlayerJoin = onPlayerJoinHandler;
}
