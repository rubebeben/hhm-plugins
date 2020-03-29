var room = HBInit();

room.pluginSpec = {
  name: `rub/test2`,
  author: `ruben`,
  version: `1.0.0`,
};

function onPlayerJoinHandler ( player ) {
	room.sendAnnouncement( "[2] " + player.name + msg );
}

room.onPlayerJoin = onPlayerJoinHandler;
