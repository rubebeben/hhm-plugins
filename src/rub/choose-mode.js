
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
const teamID = {
  SPECTATORS : 0,
  RED : 1,
  BLUE : 2,
}

let teamThatMustChoose;

// room.triggerEvent("chooseMode", {...scores}, {...goalkeepers});

function inChooseMode () {
  chooseMode = true; = teams[1].length != teams[2].length ? ( teams[1].length < teams[2].length ? 1 : 2 ) : false;
  if ( !teamThatMustChoose ) return;
  chooseMode = true;
  let players = ``;
  for ( let i = 0 ; i < teams[0].length ; i++ ) {
    let player = room.getPlayer( teams[0][i] );
    players += i != (teams[0].length - 1) ? `[${ i+1 }] ${ player.name } ` : `[${ i+1 }] ${ player.name }`; 
  }
  for ( let i = 0 ; i < teams[teamThatMustChoose].length ; i++ ) {
    room.sendAnnouncement( `${players}`, teams[teamThatMustChoose][i] );
  }
}

function onPlayerChatHandler ( player, message ) {
  
  if ( !chooseMode || !config.enabled ) return;
  
  if ( player.team != 0 && player.team == teamThatMustChoose ) {
    if ( message > 0 && message <= teams[0].length ) {
      if ( teams[0][message] ) {
        room.setPlayerTeam( teams[0][message], teamThatMustChoose );
        room.pauseGame( false );
        chooseMode = false;
        // teamThatMustChoose = undefined;
      }
    }
  }
}

// !room.getPlayerList().some( (e) => e.admin )

function onPlayerLeaveHandler ( player ) {
  if ( player.team != 0 ) room.triggerEvent("chooseMode", [...args]);
}

room.onRoomLink = () => {
  room.onPlayerLeave = onPlayerLeaveHandler;
  room.onPlayerChat = onPlayerChatHandler;
  room.onPlayerTeamChange = onPlayerTeamChangeHandler;
}

