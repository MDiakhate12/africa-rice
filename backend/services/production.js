const Models = require('../models').default
const service = require('./index')
const { Production } = Models

const createProduction = async (data) => {
  const production = await service.create(Production, data)
  console.log(production.toJSON())
  return production.toJSON()
}

const getAllProductions = async () => {
  const productions = await service.findAll(Production)
  const productionsData = productions.map((production) => production.toJSON())
  console.log(productionsData)
  return productionsData
}

const getProductionById = async (id) => {
  const production = await service.findByKey(Production, id)
  console.log(production.toJSON())
  return production.toJSON()
}

const updateProduction = async (id, data) => {
  const updated = service.update(Production, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteProduction = async (id) => {
  const deleted = service.deleteByPk(Production, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createProduction,
  getAllProductions,
  getProductionById,
  deleteProduction,
  updateProduction,
}
