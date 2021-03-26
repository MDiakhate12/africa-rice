const fs = require('fs')
const path = require('path')
const { ipcMain } = require('electron')
const { events, eventResponse } = require('../utils/events')
const basename = path.basename(__filename)

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    require(path.join(__dirname, file))(ipcMain, events, eventResponse)
  })
