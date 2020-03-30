
var room = HBInit();

room.pluginSpec = {
  name: `rub/autoAdmin`,
  author: `ruben`,
  version: `1.0.0`,
};

function updateAdmins () {
  // Get all players except the host (id = 0 is always the host)
  let players = room.getPlayerList().filter( ( player ) => player.id != 0 );
  if ( players.length == 0 ) return; // No players left, do nothing.
  if ( players.find( ( player ) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin( players[0].id, true ); // Give admin to the first non admin player in the list
}

function onPlayerJoinHandler () {
  updateAdmins();
}

function onPlayerLeaveHandler () {
  updateAdmins();
}

room.onRoomLink = function onRoomLink() {
  room.onPlayerJoin = onPlayerJoinHandler;
  room.onPlayerLeave = onPlayerLeaveHandler;
}
