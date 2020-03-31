
var room = HBInit();

room.pluginSpec = {
  name: `rub/auto-admin`,
  author: `ruben`,
  version: `1.0.0`,
  config: {
    allowedRoles : ['voxero'], // ['voxero', 'user']
  },
  dependencies: [
    `sav/roles`,
  ],
  order: {},
  incompatible_with: [],
};

const config = room.getConfig();

room.onPlayerRoleAdded_voxero ( player ) {
  let roles = room.getPlugin(`sav/roles`);
  if ( !roles ) return;
  let players = room.getPlayerList().filter( ( player ) => player.id != 0 );
  if ( players.length == 0 ) return; 
  if ( players.find( ( player ) => player.admin) != null ) return;
  if ( roles.ensurePlayerRoles( player.id, config.allowedRoles, room ) ) room.setPlayerAdmin( player.id, true );
}

