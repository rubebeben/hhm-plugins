var room = HBInit();

room.pluginSpec = {
  name: `rub/test2`,
  author: `ruben`,
  version: `1.0.0`,
};

function onPlayerJoinHandler ( player ) {
	room.kickPlayer( player.id, "testing 2", false);
}

room.onPlayerJoin = onPlayerJoinHandler;
