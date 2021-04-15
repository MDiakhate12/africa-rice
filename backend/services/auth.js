const Models = require('../models').default
const service = require('./index')
const _ = require('lodash')
const { Institution } = Models
const {
  hashPassword,
  comparePassword,
  validateEmail,
  validatePassword,
} = require('../utils')

const registerInstitution = async (data) => {
  let response = {}

  if (!validatePassword(data.password)) {
    response.status = 'error'
    response.message =
      'La longueur du mot de passe doit etre superieur a 8 caracteres'
    return response
  }

  if (data.password != data.password2) {
    response.status = 'error'
    response.message =
      'Le mot de passe et la confirmation ne sont pas conformes'
    return response
  }

  const password = await hashPassword(data.password)

  const email = data.email.toLowerCase()

  if (!validateEmail(email)) {
    response.status = 'error'
    response.message = "L'email est correct"
    return response
  }

  const [institution, created] = await service.findOrCreate(Institution, {
    ...data,
    password,
    email,
  })

  if (!created) {
    response.status = 'error'
    response.message = 'Un institution avec cet email existe deja'
    return data
  }

  response.status = 'success'
  response.message = 'institution creer avec succes '
  response.payload = _.omit(institution.toJSON(), ['password'])
  return response
}

const loginInstitution = async (data) => {
  let response = {}
  const { email, password } = data

  const institution = await service.findInstitution(Institution, email)

  if (!institution) {
    response.status = 'error'
    response.message = "Email n'est pas bon"
    return response
  }

  if (!(await comparePassword(password, institution.password))) {
    response.status = 'error'
    response.message = 'Mot de passe incorrect'
    return response
  }

  return institution.toJSON()
}

module.exports = {
  registerInstitution,
  loginInstitution,
}
