var room = HBInit();

room.pluginSpec = {
  name: `rub/record`,
  author: `ruben`,
  version: `1.0.0`,
  config: {
    record : false,
  },
  dependencies: [
    `sav/commands`,
    `sav/roles`,
  ],
  order: {},
  incompatible_with: [],
};

const config = room.getConfig();
let allowedRoles = ['host'];

let help = room.getPlugin(`sav/help`);
if ( help ) {
  help.registerHelp( `record`, ``, { numArgs: 0, roles: allowedRoles } );
}

room.onCommand0_record = function ( player, arguments, argumentString ) {
  let roles = room.getPlugin(`sav/roles`);
  if ( !roles ) return;
  if ( roles.ensurePlayerRoles( player.id, allowedRoles, room ) ) {
    if ( config.record ) {
			config.record = false;
			room.sendAnnouncement(`Recording has stopped!`, null, 0xFF0000);
    }
    else {
			config.record = true;
			room.sendAnnouncement(`Recording has started!`, null, 0x00FF00);
		}
  }
}

function saveRecord ( recordingRaw ) {
    let tr = doc.createElement('tr');
    tr.style = "width: 100px; padding: 10px 0; clear: both";
    let td = doc.createElement('td');

    let fname = 'HBReplay-' + (new Date()).toISOString().replace('T', '-').replace(':', 'h', 1).replace(/:.*/, 'm.hbr2');
    let recording = btoa(String.fromCharCode.apply(null, recordingRaw));
    let recLink = doc.createElement('a');
    recLink.href = 'data:application/octet-stream;base64,' + recording;
    recLink.innerText = 'Download recording: ' + fname;
    recLink.download = fname;

    recstable.appendChild(tr);
    tr.appendChild(td);
    td.appendChild(recLink);
}

function onGameStartHandler () {
  if ( config.record ) {
    let recording = room.stopRecording();
    if ( recording != null ) saveRecord ( recording );
    room.startRecording();
  }
}

function onGameStopHandler () {
  let recording = room.stopRecording();
  if ( recording != null ) saveRecord ( recording );
}

room.onRoomLink = function onRoomLink () {
  room.onGameStart = onGameStartHandler;
	room.onGameStop = onGameStopHandler;
}
