
var room = HBInit();

room.pluginSpec = {
  name: `rub/choose-mode`,
  author: `ruben`,
  version: `1.0.0`,
  config: {
    enabled : false,
    allowedRoles : ['admin','host'],
  },
  dependencies: [
    `sav/commands`,
    `sav/roles`,
    `rub/team-state`,
  ],
  order: {},
  incompatible_with: [],
};

const config = room.getConfig();
const teams = room.getPlugin(`rub/team-state`).getTeamState();
let teamThatMustChoose;

function inChooseMode () {
  teamThatMustChoose = teams[1].length != teams[2].length ? ( teams[1].length < teams[2].length ? 1 : 2 ) : false;
  if ( !teamThatMustChoose ) return false;
  chooseMode = true;
  room.pauseGame( true );
  let players = ``;
  for ( let i = 0 ; i < teams[0].length ; i++ ) {
    let player = room.getPlayer( teams[0][i] );
    players += i != (teams[0].length - 1) ? `[${ i+1 }] ${ player.name } ` : `[${ i+1 }] ${ player.name }`; 
  }
  for ( let i = 0 ; i < teams[teamThatMustChoose].length ; i++ ) {
    room.sendAnnouncement( `${players}`, teams[teamThatMustChoose][i] );
  }
  return true;
}

function onPlayerChatHandler ( player, message ) {
  
  if ( !chooseMode || !config.enabled ) return;
  
  if ( player.team != 0 && player.team == teamThatMustChoose ) {
    if ( message > 0 && message <= teams[0].length ) {
      if ( teams[0][message] ) {
        room.setPlayerTeam( teams[0][message], teamThatMustChoose );
        chooseMode = false;
        if ( !inChooseMode() ) room.pauseGame( false );
      }
    }
  }
}

function onTeamStateChangeHandler ( playerId, newTeam, previousTeam, byPlayerId ) {
  if ( byPlayerId !== false || !config.enabled  ) return;
  if ( teams[1].length != teams[2].length ) inChooseMode();
}

function inChooseMode ( until = 3 ) {
  chooseMode = true;
  room.pauseGame( true );
  if ( until ) {}
  else {
  }
}

room.onRoomLink = () => {
  room.onPlayerChat = onPlayerChatHandler;
  room.onTeamStateChange = onTeamStateChangeHandler;
}

