const Models = require('../models').default
const service = require('./index')
const { SpeculationInstitution, Institution, Speculation } = Models

const createSpeculationInstitution = async (data) => {
  const speculationInstitution = await service.create(
    SpeculationInstitution,
    data,
  )
  console.log(speculationInstitution.toJSON())
  return speculationInstitution.toJSON()
}

const getAllSpeculationInstitution = async (arg = {}) => {
  let option = {
    include: [Speculation, Institution],
  }
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const speculations = await service.findAll(SpeculationInstitution, option)

  const speculationsData = speculations.map((speculationInstitution) =>
    speculationInstitution.toJSON(),
  )
  // console.log(speculationsData);
  return speculationsData
}

const getSpeculationInstitutionById = async (id) => {
  const speculationInstitution = await service.findByPk(
    SpeculationInstitution,
    id,
  )
  console.log(speculationInstitution.toJSON())
  return speculationInstitution.toJSON()
}

const updateSpeculationInstitution = async (id, data) => {
  const updated = await service.update(SpeculationInstitution, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteSpeculationInstitution = async (id) => {
  const deleted = await service.deleteByPk(SpeculationInstitution, id)
  console.log(deleted)
  return deleted
}

module.exports = {
  createSpeculationInstitution,
  getAllSpeculationInstitution,
  getSpeculationInstitutionById,
  deleteSpeculationInstitution,
  updateSpeculationInstitution,
}
