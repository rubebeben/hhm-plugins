
var room = HBInit();

room.pluginSpec = {
  name: `rub/votes`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};

const config = room.getConfig();

room.onRoomLink = () => {
}
