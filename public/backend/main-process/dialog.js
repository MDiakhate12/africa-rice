const { dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.imageDialog.open, (event, arg) => {
    dialog
      .showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Images", extensions: ["jpg", "png"] }],
      })
      .then((data) => {
        if (data && !data.canceled) {
          let srcFile = data.filePaths[0];

          let basename = path.basename(srcFile);

          let copyDestFile = isDev
            ? path.join(__dirname, "../../assets/images/uploaded", basename)
            : path.resolve(srcFile)

          let logoDestFile = isDev
            ? `/assets/images/uploaded/${basename}`
            : path.resolve(srcFile)

        
          if(isDev) {
            fs.copyFile(srcFile, copyDestFile, (err) => {
            if (err) throw err;
            event.reply(eventResponse.imageDialog.closed, logoDestFile);
          });
        }else{
          event.reply(eventResponse.imageDialog.closed, logoDestFile);
        }


          // const options = {
          //   APP_DIRNAME: __dirname,
          //   APP_FILENAME: __filename,
          //   RESOURCE_PATH: process.resourcesPath,
          //   DOCUMENTS_PATH: app.getPath("documents"),
          //   PICTURES_PATH: app.getPath("pictures"),
          //   HOME_PATH: app.getPath("home"),
          //   APP_PATH_: app.getAppPath(),
          // };
          
          // event.reply(eventResponse.imageDialog.closed, options);
        }
      })
      .catch((err) => console.log(err));
  });
};
