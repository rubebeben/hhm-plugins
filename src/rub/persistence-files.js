var room = HBInit();

room.pluginSpec = {
  name: `rub/persistence-files`,
  author: `ruben`,
  version: `1.0.0`,
  config: {},
  dependencies: [
    `rub/doc-divs`,
    `sav/players`,
  ],
  order: {},
  incompatible_with: [],
};

let doc;
let form;

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function changeIDKeyToAuthKey(data){
  var aux = {};
  for(let key in eP){
    aux[eP[key].auth] = eP[key];
  }
  console.log(aux);
  return aux;
}

function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  if (typeof item === "object" && item !== null) {
    return true;
  }
  return false;
}

room.onRoomLink = function onRoomLink () {
  doc = room.getPlugin(`rub/doc-divs`).getDoc();
  form = room.getPlugin(`rub/doc-divs`).getForm();
  
  var fdiv = doc.createElement('div');
  fdiv.style = "width: 100px; padding: 10px 0; clear: both";
  var fileToLoad = doc.createElement("input");
  fileToLoad.type = "file";
  // fileToLoad.innerHTML = 'Cargar Datos';
  fileToLoad.className = "css-class-name"; // set the CSS class
  fdiv.appendChild(fileToLoad);
  form.appendChild(fdiv);
  /*doc.body.appendChild(fileToLoad);
  doc.body.appendChild(doc.createElement('div'));*/
  
  var eP = {};
  let extendedPfile;
  
  var udiv = doc.createElement('div');
  udiv.style = "width: 65px; float: left; padding: 10px 0";
  var upbutton = doc.createElement('button');
  upbutton.innerHTML = 'Upload';
  udiv.appendChild(upbutton);
  form.appendChild(udiv);
  /*doc.body.appendChild(buttonfile);
  doc.body.appendChild(doc.createElement('div'));*/
  upbutton.onclick = () => {
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
      var textFromFileLoaded = fileLoadedEvent.target.result;
      extendedPfile = JSON.parse(textFromFileLoaded);
      // isJson(extendedPfile) ? eP = Object.assign(extendedPfile, eP) : null;
      isJson(extendedPfile) ? eP = extendedPfile : null;
      console.log(eP);
    };
    fileReader.readAsText(fileToLoad.files[0], "UTF-8");
  }
  
  var ddiv = doc.createElement('div');
  ddiv.style = "width: 65px; float: left; padding: 10px 0";
  var downbutton = doc.createElement('button');
  downbutton.innerHTML = 'Download';
  ddiv.appendChild(downbutton);
  form.appendChild(ddiv);
  downbutton.onclick = () => {
    var database = JSON.stringify(changeIDKeyToAuthKey(eP));
    download(database, "database", "text/plain");
  }
  
  room.onGameStart = onGameStartHandler;
  room.onGameStop = onGameStopHandler;
}
