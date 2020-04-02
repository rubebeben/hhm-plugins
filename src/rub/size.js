var room = HBInit();

room.pluginSpec = {
  name: `rub/size`,
  author: `ruben`,
  version: `1.0.0`,
  config: {
    maxSize : 17,
    minSize : 12,
  },
  dependencies: [
    `sav/game-state`,
    `sav/commands`,
  ],
  order: {},
  incompatible_with: [],
};

const config = room.getConfig();
let playersDiscProperties = {};

let help = room.getPlugin(`sav/help`);
if (help) {
  help.registerHelp( `size`, ` SIZE_NUMBER`, { numArgs: 1 } );
}

room.onCommand1_size = function ( player, arguments, argumentString ) {
  createPlayerDiscProperties( player );
  let argument = parseInt( arguments[0] );
  if ( isNaN( argument ) ) return;
  else if ( argument < config.minSize || argument > config.maxSize ) return;
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

function createPlayerDiscProperties ( player ) {
  return !playersDiscProperties[player.id] ? (playersDiscProperties[player.id] = { radius : null, bCoeff : null, cMask : null, cGroup : null, invMass : null, damping : null}) : false;
}

function onPlayerLeaveHandler ( player ) {
  playersDiscProperties[player.id] ? (delete playersDiscProperties[player.id]) : false;
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
  room.onPositionsReset = onPositionsResetHandler;
  room.onGameStart = onGameStartHandler;
}
