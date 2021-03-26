const Models = require('../models').default
const service = require('./index')
const { SpeculationInstitution } = Models

const createSpeculationInstitution = async (data) => {
  const speculationInstitution = await service.create(SpeculationInstitution, data)
  console.log(speculationInstitution.toJSON())
  return speculationInstitution.toJSON()
}

const getAllSpeculationInstitution = async () => {
  const speculations = await service.findAll(SpeculationInstitution)
  const speculationsData = speculations.map((speculationInstitution) =>
    speculationInstitution.toJSON(),
  )
  console.log(speculationsData)
  return speculationsData
}

const getSpeculationInstitutionById = async (id) => {
  const speculationInstitution = await service.findByPk(SpeculationInstitution, id)
  console.log(speculationInstitution.toJSON())
  return speculationInstitution.toJSON()
}

const updateSpeculationInstitution = async (id, data) => {
  const updated = service.update(SpeculationInstitution, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteSpeculationInstitution = async (id) => {
  const deleted = service.deleteByPk(SpeculationInstitution, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createSpeculationInstitution,
  getAllSpeculationInstitution,
  getSpeculationInstitutionById,
  deleteSpeculationInstitution,
  updateSpeculationInstitution,
}
