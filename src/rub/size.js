var room = HBInit();

room.pluginSpec = {
  name: `rub/size`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [
    `sav/game-state`,
  ],
  order: {},
  incompatible_with: [],
};

let help = room.getPlugin(`sav/help`);
if (help) {
  help.registerHelp( `size`, ` SIZE_NUMBER`, { numArgs: 1 } );
}

var playersDiscProperties = {};

room.onCommand1_size = function ( player, arguments, argumentString ) {
  let argument = parseInt( arguments[0] );
  if ( isNaN( argument ) ) return;
  else if ( argument < 12 || argument > 17 ) return;
  else {
    playersDiscProperties[player.id].radius = argument;
    let state = room.getPlugin(`sav/game-state`);
    if ( state && state.getGameState() == 1 ) room.setPlayerDiscProperties( player.id, { radius : argument } );
  }
}

function updateDiscProperties () {
  for ( let [key, value] of Object.entries( playersDiscProperties ) ) {
    room.setPlayerDiscProperties( key, value );
  }
}

function onPlayerJoinHandler ( player ) {
  playersDiscProperties[player.id] = { radius : null, bCoeff : null, cMask : null, cGroup : null, invMass : null, damping : null};
}

function onPlayerLeaveHandler ( player ) {
  delete playersDiscProperties[player.id];
}

function onPlayerTeamChangeHandler ( player ) {
  let state = room.getPlugin(`sav/game-state`);
  if ( !state ) return;
  state = state.getGameState();
  if ( state == 1 || state == 2  ) updateDiscProperties();
}

function onGameStartHandler () {
  updateDiscProperties();
}

function onPositionsResetHandler () {
  updateDiscProperties();
}

room.onRoomLink = function onRoomLink () {
  room.onPlayerTeamChange = onPlayerTeamChangeHandler;
  room.onPlayerLeave = onPlayerLeaveHandler;
  room.onPlayerJoin = onPlayerJoinHandler;
  room.onPositionsReset = onPositionsResetHandler;
  room.onGameStart = onGameStartHandler;
}
