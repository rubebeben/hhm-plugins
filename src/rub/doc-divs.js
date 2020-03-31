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

let doc;
let form;

function getDoc() {
  if ( doc == null || doc == undefined ) console.log( "[DEBUG] NULLLLLLLLLLLLLLLL" );
  else console.log( "[DEBUG] YESSSSSSSS" );
  return doc;
}

function getForm() {
  if ( doc == null || doc == undefined ) console.log( "[DEBUG] NULLLLLLLLLLLLLLLL" );
  else console.log( "[DEBUG] YESSSSSSSS" );
  return form;
}

room.onRoomLink = function onRoomLink () {
  doc = document.getElementsByTagName('iframe')[0].contentDocument;
  form = doc.createElement('fieldset');
  form.style = "width: 400px; position: relative; padding: 5px 10px";
  form.innerHTML = `
  </fieldset>`;
  doc.body.appendChild(form);
  room.getDoc = getDoc;
  room.getForm = getForm;
}
