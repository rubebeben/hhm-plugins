
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

let players = [];

room.triggerEvent("chooseMode", {...scores}, {...goalkeepers});

function chooseModeHandler () {
  
}

let teamThatMustChoose = teams[1].length != teams[2].length ? ( teams[1].length < teams[2].length ? 1 : 2 ) : false;

function onPlayerChatHandler ( player, message ) {
  
  if ( player.team != 0 && player.team == teamThatMustChoose )
  if ( message > 0 && message <= teams[0].length )
}

// !room.getPlayerList().some( (e) => e.admin )

function onPlayerLeaveHandler ( player ) {
  if ( player.team != 0 ) room.triggerEvent("chooseMode", [...args]);
}

room.onRoomLink = () => {
  room.onPlayerLeave = onPlayerLeaveHandler;
  room.onPlayerChat = onPlayerChatHandler;
  room.onPlayerTeamChange = onPlayerTeamChangeHandler;
  room.chooseMode = chooseModeHandler;
}

