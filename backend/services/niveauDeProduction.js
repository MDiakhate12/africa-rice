const Models = require('../models').default
const service = require('./index')
const { NiveauDeProduction } = Models

const createNiveauDeProduction = async (data) => {
  const niveauDeProduction = await service.create(NiveauDeProduction, data)
  console.log(niveauDeProduction.toJSON())
  return niveauDeProduction.toJSON()
}

const getAllNiveauDeProductions = async (arg = {}) => {
  const niveauDeProductions = await service.findAll(NiveauDeProduction)
  const niveauDeProductionsData = niveauDeProductions.map(
    (niveauDeProduction) => niveauDeProduction.toJSON(),
  )
  console.log(niveauDeProductionsData)
  return niveauDeProductionsData
}

const getNiveauDeProductionById = async (id) => {
  const niveauDeProduction = await service.findByKey(NiveauDeProduction, id)
  console.log(niveauDeProduction.toJSON())
  return niveauDeProduction.toJSON()
}

const updateNiveauDeProduction = async (id, data) => {
  const updated = service.update(NiveauDeProduction, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteNiveauDeProduction = async (id) => {
  const deleted = service.deleteByPk(NiveauDeProduction, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createNiveauDeProduction,
  getAllNiveauDeProductions,
  getNiveauDeProductionById,
  deleteNiveauDeProduction,
  updateNiveauDeProduction,
}
