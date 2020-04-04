
// room.onTeamStateChange = ( playerId, newTeam, previousTeam ) => {}

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

function removePlayerTeam ( playerID ) {
  for ( let i = 0 ; i < 3 ; i++ ) {
    let index = teams[i].indexOf( playerID );
    if ( index != -1 ) {
      teams[i].splice( index, 1 );
      return i;
    }
  }
  return false;
}

function onPlayerJoinHandler ( player ) {
  teams[player.team].push( player.id );
  room.triggerEvent("onTeamStateChange", player.id, player.team, false });
}

function onPlayerLeaveHandler ( player ) {
  let previousTeam = removePlayerTeam( player.id );
  room.triggerEvent("onTeamStateChange", player.id, false, previousTeam });
}

function onPlayerTeamChangeHandler ( player ) {
  let previousTeam = removePlayerTeam( player.id );
  teams[player.team].push( player.id );
  room.triggerEvent("onTeamStateChange", player.id, player.team, previousTeam });
}

function getTeamState () {
  return teams;
}

room.onRoomLink = function onRoomLink () {
  room.onPlayerTeamChange = onPlayerTeamChangeHandler;
  room.onPlayerLeave = onPlayerLeaveHandler;
  room.onPlayerJoin = onPlayerJoinHandler;
}
