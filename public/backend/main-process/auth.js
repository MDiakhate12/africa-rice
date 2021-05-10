const { loginInstitution, registerInstitution } = require('../services/auth')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.auth.register, (event, arg) => {
    registerInstitution(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.auth.registered, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.auth.login, (event, arg) => {
    loginInstitution(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.auth.logged, data)
      })
      .catch((err) => console.log(err))
  })
}
