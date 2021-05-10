const bcrypt = require('bcryptjs')

const SALT_HASH_KEY = 11

/*
  hash password with bcrypt and salt before 
  saving it the database 
*/
const hashPassword = (password) => bcrypt.hash(password, SALT_HASH_KEY)

/*
  compare password when login between 
  the user given password and the already 
  saved password 
*/
const comparePassword = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword)

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email) && email.length < 50
}

const validatePassword = (password) =>
  password.length < 50 && password.length >= 8

module.exports = {
  hashPassword,
  comparePassword,
  validateEmail,
  validatePassword,
}
