var room = HBInit();

room.pluginSpec = {
  name: `rub/test`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [
    `rub/match-info`,
  ],
  order: {},
  incompatible_with: [],
};

function onTeamScoresHandler ( team, goal ) {
  if ( goal.ownGoal ) {
    room.sendAnnouncement( `Scored by ${room.getPlayer( goal.scorer ).name} (own goal) ` );
  }
  else {
    room.sendAnnouncement( `Scored by ${room.getPlayer( goal.scorer ).name} ${ ( goal.assister ? `assited by ${ room.getPlayer( goal.assister ).name }` : false ) } ` );
  }
}

function onMatchEndHandler ( scores, gks ) {
  room.sendAnnouncement( `goalkeeper red : ${room.getPlayer( gks.red ).name}` );
  room.sendAnnouncement( `goalkeeper blue : ${room.getPlayer( gks.blue ).name}` );
}

room.onRoomLink = () => {
  room.onMatchEnd = onMatchEndHandler;
  room.onTeamScores = onTeamScoresHandler;
}
