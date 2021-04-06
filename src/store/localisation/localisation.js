// const fs = require("fs");
// const path = require("path");
// const { events, eventResponse } = require("../utils/events");
// const { ipcRenderer } = window.require("electron");

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


  
