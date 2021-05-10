const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const models = require("./backend/models").default;
require("./backend/main-process/");

const createWindow = async () => {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#009688",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });

  win.maximize();
  !isDev && win.removeMenu()

  win.on("closed", () => {
    win = null;
    app.quit();
  });

  return models.sequelize
    .sync()
    .then(() => {
      win.loadURL(
        isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
      );
    })
    .catch((err) => console.log(err));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") app.quit();
});
