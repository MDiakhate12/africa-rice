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
  let response

  if (!validatePassword(data.password)) {
    response.status = 'error'
    response.message = 'Password length should be more than 8 characters'
    return response
  }

  if (data.password !== data.confirmPassword) {
    response.status = 'error'
    response.message = 'password and passwordConfirm are not the same'
    return response
  }

  const password = await hashPassword(data.password)

  const email = data.email.toLowerCase()

  if (!validateEmail(email)) {
    response.status = 'error'
    response.message = 'email is not correct'
    return response
  }

  const [institution, created] = await service.findOrCreate(Institution, {
    ...data,
    password,
    email,
  })

  if (!created) {
    response.status = 'error'
    response.message = 'institution already exist'
    return data
  }

  response.status = 'success'
  response.message =
    'institution successfully created go and check you email to validate your institution'
  response.payload = _.omit(institution.toJSON(), ['password'])

  return response
}

const loginInstitution = async (data) => {
  const { email, password } = data

  const user = await findUser(User, email)

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid credential email not good',
    })
  }

  if (!(await comparePassword(password, user.password))) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid credential password not good',
    })
  }

  user.toJSON()
}

module.exports = {
  registerInstitution,
  loginInstitution,
}
