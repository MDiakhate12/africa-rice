const Models = require('../models').default
const service = require('./index')
const { Speculation } = Models

const createSpeculation = async (data) => {
  const speculation = await service.create(Speculation, data)
  console.log(speculation.toJSON())
  return speculation.toJSON()
}

const getAllSpeculations = async (arg = {}) => {
  const speculations = await service.findAll(Speculation)
  const speculationsData = speculations.map((speculation) =>
    speculation.toJSON(),
  )
  // console.log(speculationsData)
  return speculationsData
}

const getSpeculationById = async (id) => {
  const speculation = await service.findByPk(Speculation, id)
  console.log(speculation.toJSON())
  return speculation.toJSON()
}

const updateSpeculation = async (id, data) => {
  const updated = service.update(Speculation, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteSpeculation = async (id) => {
  const deleted = service.deleteByPk(Speculation, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createSpeculation,
  getAllSpeculations,
  getSpeculationById,
  deleteSpeculation,
  updateSpeculation,
}
