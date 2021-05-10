import * as localisations from "./localisation.json"

// const fs = require("fs");
// const path = require("path");
const { events, eventResponse } = require('../utils/events')
const { ipcRenderer } = window.require('electron')


// fs.readdir("../../../../scrapping/regions-json", (err, files) => {
//   let baseName = "";
//   let regions = [];

//   if (err) throw err;

//   files.forEach((file) => {
//     baseName = path.basename(file, ".json");

//     if (path.extname(file) === ".json") {
//       let data = fs.readFileSync(`../../../../scrapping/regions-json/${file}`, "utf-8");

//       let values = JSON.parse(data);
//       values = values.flat()

//       values.map((v) => {
//         ipcRenderer.send(events.localisation.create, v);

//         ipcRenderer.on(eventResponse.localisation.created, (e, d) =>
//           console.log("LOCALISATION", d)
//         );
//       });

//       fs.appendFile("./regions.json", `\n${JSON.stringify(regions)},`, (err) => {
//         if (err) throw err;
//         console.log(`Appended ${baseName}`);
//       });

//       //   console.log(file);
//     }
//   });
// });

// const localisations = [
//   {
//     region: 'ZIGUINCHOR',
//     departement: 'ZIGUINCHOR',
//     commune: 'Adeane',
//     village: 'Agnack Grand',
//     longitude: 380472,
//     latitude: 1390435,
//     zoneId: 3,
//   },
//   {
//     region: 'ZIGUINCHOR',
//     departement: 'ZIGUINCHOR',
//     commune: 'Adeane',
//     village: 'Agnack Petit',
//     longitude: 378500,
//     latitude: 1391004,
//     zoneId: 3,
//   },
// ]

const initLocalisation = () => {
    localisations.forEach((localisation) => {
        ipcRenderer.send(events.localisation.create, localisation)
        ipcRenderer.once(
          eventResponse.niveauDeProduction.created,
          (event, data) => {
            console.log(data)
          },
        )
      })
}

