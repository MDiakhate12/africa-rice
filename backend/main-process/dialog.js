const { dialog } = require("electron");

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on("open-file-dialog", (event) => {
    dialog.showOpenDialog(
      {
        properties: ["openFile", "openDirectory"],
      },
      (files) => {
        if (files) {
          event.sender.send("selected-directory", files);
        }
      }
    );
  });
};
