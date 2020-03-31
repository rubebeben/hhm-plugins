var room = HBInit();

room.pluginSpec = {
  name: `rub/password`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [
    `sav/roles`,
    `sav/commands`,
  ],
  order: {},
  incompatible_with: [],
};

// Roles that can use the in room commands.
let allowedRoles = ['host'];

let help = room.getPlugin(`sav/help`);
if ( help ) {
  help.registerHelp( `password`, `PASSWORD`, { numArgs: 1, roles: allowedRoles } );
  help.registerHelp( `clearpassword`, ``, { numArgs: 0, roles: allowedRoles } );
}

room.onCommand1_password = function ( player, arguments, argumentString ) {
  let roles = room.getPlugin(`sav/roles`);
  if ( !roles ) return;
  if ( roles.ensurePlayerRoles( player.id, allowedRoles, room ) ) {
    room.setPassword( arguments[0] );
    return false;
  }
}

room.onCommand0_clearpassword = function ( player, arguments, argumentString ) {
  let roles = room.getPlugin(`sav/roles`);
  if ( !roles ) return;
  if ( roles.ensurePlayerRoles( player.id, allowedRoles, room ) ) {
    room.setPassword( null );
  }
}


