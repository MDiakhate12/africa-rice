const Models = require('../models').default
const service = require('./index')
const { Magasin } = Models

const createMagasin = async (data) => {
  const magasin = await service.create(Magasin, data)
  console.log(magasin.toJSON())
  return magasin.toJSON()
}

const getAllMagasins = async () => {
  const magasins = await service.findAll(Magasin)
  const magasinsData = magasins.map((magasin) => magasin.toJSON())
  console.log(magasinsData)
  return magasinsData
}

const getMagasinById = async (id) => {
  const magasin = await service.findByKey(Magasin, id)
  console.log(magasin.toJSON())
  return magasin.toJSON()
}

const updateMagasin = async (id, data) => {
  const updated = service.update(Magasin, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteMagasin = async (id) => {
  const deleted = service.deleteByPk(Magasin, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createMagasin,
  getAllMagasins,
  getMagasinById,
  deleteMagasin,
  updateMagasin,
}