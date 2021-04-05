const Models = require('../models').default
const service = require('./index')
const { Localisation } = Models

const createLocalisation = async (data) => {
  const localisation = await service.create(Localisation, data)
  console.log(localisation.toJSON())
  return localisation.toJSON()
}

const getAllLocalisations = async (arg = {}) => {
  const localisations = await service.findAll(Localisation)
  const localisationsData = localisations.map((localisation) =>
    localisation.toJSON(),
  )
  console.log(localisationsData)
  return localisationsData
}

const getLocalisationById = async (id) => {
  const localisation = await service.findByKey(Localisation, id)
  console.log(localisation.toJSON())
  return localisation.toJSON()
}

const updateLocalisation = async (id, data) => {
  const updated = service.update(Localisation, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteLocalisation = async (id) => {
  const deleted = service.deleteByPk(Localisation, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createLocalisation,
  getAllLocalisations,
  getLocalisationById,
  deleteLocalisation,
  updateLocalisation,
}
