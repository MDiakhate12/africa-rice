const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const models = require("../backend/models").default;
require("../backend/main-process/");

// const {
//   createSpeculation,
//   getAllSpeculations,
// } = require("../backend/services/speculation");
// const {
//   createZone,
//   getAllZones,
// } = require("../backend/services/zoneAgroEcologique");
// const {
//   createVariete,
//   getAllVarietes,
// } = require("../backend/services/variete");

const createWindow = async () => {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });

  // win.removeMenu()

  models.sequelize
    .sync()
    .then(() => {
      // createSpeculation({
      //   nomSpeculation: "Diaf",
      //   imageSpeculation: "DiafR",
      // })
      //   .then((data) => {
      //     createZone({ nomZone: "DakarDiaf" });
      //   })
      //   .then((dat) => {
      //     createVariete({
      //       nomVariete: "GuysdDiaf",
      //       longueurCycle: 10,
      //       speculationId: 1,
      //       zoneId: 1,
      //     });
      //   })
      //   .then((da) => {
      //     getAllVarietes().then((d) => {});
      //   })
      //   .catch((err) => console.log(err));

      // getAllSpeculations().then(() => {});
      // getAllZones().then(() => {});
      // getAllVarietes().then(() => {});

      win.loadURL(
        isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
      );
    })
    .catch((err) => console.log(err));

  win.on("closed", () => {
    win = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") app.quit();
});
