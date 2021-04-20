const { dialog } = require("electron");

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.imageDialog.open, (event, arg) => {
    dialog
      .showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Images", extensions: ["jpg", "png"] }],
      })
      .then((files) => {
        if (files) {
          event.reply(eventResponse.imageDialog.closed, files);
        }
      })
      .catch((err) => console.log(err));
  });
};
