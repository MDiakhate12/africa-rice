const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const models = require('../backend/models').default

const { createSpeculation } = require('../backend/services/speculation')
const { createZone } = require('../backend/services/zoneAgroEcologique')
const { createVariete, getAllVarietes } = require('../backend/services/variete')

const createWindow = async () => {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  models.sequelize
    .sync()
    .then(() => {
      // createSpeculation({
      //   nomSpeculation: 'Ara123',
      //   imageSpeculation: 'image2',
      // })
      //   .then((data) => {
      //     console.log(data)
      //     createZone({ nomZone: 'Dakrar' })
      //   })
      //   .then((dat) => {
      //     console.log(dat)
      //     createVariete({
      //       nomVariete: 'Guysd',
      //       longueurCycle: 10,
      //       speculationId: 2,
      //       zoneId: 2,
      //     })
      //   })
      //   .then((da) => {
      //     console.log(da)
      //     getAllVarietes().then((d) => {
      //       console.log(d)
      //     })
      //   })
      //   .catch((err) => console.log(err))

      win.loadURL(
        isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`,
      )
    })
    .catch((err) => console.log(err))

  win.on('closed', () => {
    win = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') app.quit()
})
