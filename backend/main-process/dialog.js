const { dialog } = require("electron");

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.imageDialog.openImageDialog, (event) => {
    dialog.showOpenDialog(
      {
        properties: ["openFile", "openDirectory"],
      },
      (files) => {
        if (files) {
          event.reply(eventResponse.imageDialog.closedImageDialog, files);
        }
      }
    );
  });
};
