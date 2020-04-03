
var room = HBInit();

room.pluginSpec = {
  name: `rub/match-info`,
  author: `ruben`,
  version: `1.0.0`,
  config: {
    ownGoal : false,
  },
  dependencies: [
    `rub/ball-touch`,
    `sav/cron`,
  ],
  order: {
    'after': [`rub/ball-touch`],
  },
  incompatible_with: [],
};

const config = room.getConfig();

const Team = {
  SPECTATORS: 0,
  RED: 1,
  BLUE: 2
};

let match = {
  [Team.RED] : [],
  [Team.BLUE] : [],
}

let count = 0; // DEBUG

function findFurthestPlayer () {
  
  console.log( `[DEBUG] ${count++} seconds` ); // DEBUG

  let blue = room.getPlayerList().filter((e) => e.team == Team.BLUE);
  blue.sort( function ( a, b ) {
    return b.position.x - a.position.x;
  });

  let red = room.getPlayerList().filter((e) => e.team == Team.RED);
  red.sort( function ( a, b ) {
    return a.position.x - b.position.x;
  });


  for ( let i = 0; i < red.length; i++ ) {
    let player = red[i];
    if ( !match[Team.RED][player.id] ) match[Team.RED][player.id] = 1;
    else match[Team.RED][player.id]++;
    break;
  }

  for ( let i = 0; i < blue.length; i++ ) {
    let player = blue[i];
    if ( !match[Team.BLUE][player.id] ) match[Team.BLUE][player.id] = 1;
    else match[Team.BLUE][player.id]++;
    break;
  }
}

function getGoalkeeperWithMoreTimeInGoal ( team ) {
  let goalkeeper = [];

  for ( let playerID in match[team] ) {
    goalkeeper.push( { id: playerID, value: match[team][playerID] } );
  }

  goalkeeper.sort( function ( a, b ) {
    return b.value - a.value;
  })

  return goalkeeper[0].id;
}

function onTeamVictoryHandler ( scores ) {
  count = 0; // DEBUG
  let goalkeepers = {
    red : getGoalkeeperWithMoreTimeInGoal(Team.RED),
    blue : getGoalkeeperWithMoreTimeInGoal(Team.BLUE),
  }
  room.triggerEvent("onMatchEnd", {...scores}, {...goalkeepers});
}

function onTeamGoalHandler ( team ) {

  let players = room.getPlugin( `rub/ball-touch` ).getLastPlayersWhoTouchedTheBall();
  
  console.dir( players ); // DEBUG
  
  for ( let i = 0 ; i < players.length ; i++ ) {
    players[i] = players[i] ? room.getPlayer( players[i] ) : false;
  }

  let ownGoal = players[0].team != team ? true : false;
  let scorer, assister;

  if ( ownGoal ) {
    if ( !players[1] ) { ownGoal = true; scorer = players[0].id; assister = false; }
    else if ( config.ownGoal ) { ownGoal = true; scorer = players[0].id; assister = false; }
    else {
      if ( players[1].team != team ) { ownGoal = true; scorer = players[0].id; assister = false; }
      else { ownGoal = false; }
    }
  }

  if ( !ownGoal ) {
    if ( config.ownGoal ) {
      scorer = players[0].id;
      assister = players[1].team == team ? players[1].id : false;
    }
    else {
      scorer = players[1].id;
      assister = players[2].team == team ? players[2].id : false;
    }
  }

  // JSON.parse(JSON.stringify(objeto))

  room.triggerEvent("onTeamScores", team, { ownGoal : ownGoal, scorer : scorer, assister : assister });
}

room.onRoomLink = () => {
  room.onTeamGoal = onTeamGoalHandler;
  room.onTeamVictory = onTeamVictoryHandler;
  room.onCron1GameSeconds = () => room.getPlugin( `rub/ball-touch` ).getLastPlayersWhoTouchedTheBall() ? findFurthestPlayer() : {};
}
