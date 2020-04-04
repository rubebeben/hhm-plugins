
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
  ],
  order: {},
  incompatible_with: [],
};

const config = room.getConfig();

let players = [];
