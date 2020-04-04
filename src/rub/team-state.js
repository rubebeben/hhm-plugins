
var room = HBInit();

room.pluginSpec = {
  name: `rub/team-state`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};

let teams = [ [], [], [], ];

function removePlayerTeam ( player ) {
  for ( let i = 0 ; i < 3 ; i++ ) {
    let index = teams[i].indexOf( player.id );
    if ( index != -1 ) {
      teams[i].splice( index, 1 );
      break;
    }
  }
}

function onPlayerJoinHandler ( player ) {
  teams[player.team].push( player.id );
}

function onPlayerLeaveHandler ( player ) {
  removePlayerTeam( player );
}

function onPlayerTeamChangeHandler ( player ) {
  removePlayerTeam( player );
  teams[player.team].push( player.id );
}

function getTeamState () {
  return teams;
}

room.onRoomLink = function onRoomLink () {
  room.onPlayerTeamChange = onPlayerTeamChangeHandler;
  room.onPlayerLeave = onPlayerLeaveHandler;
  room.onPlayerJoin = onPlayerJoinHandler;
}
