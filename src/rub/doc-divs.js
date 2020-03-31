var room = HBInit();

room.pluginSpec = {
  name: `rub/doc-divs`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};

function getDoc() {
  return doc;
}

room.onRoomLink = function onRoomLink () {
  let doc = document.getElementsByTagName('iframe')[0].contentDocument;
  let form = doc.createElement('fieldset');
  form.style = "width: 400px; position: relative; padding: 5px 10px";
  form.innerHTML = `
  </fieldset>`;
  doc.body.appendChild(form);
}
