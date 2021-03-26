const Models = require('../models').default
const service = require('./index')
const { ZoneInstitution } = Models

const createZone = async (data) => {
  const zone = await service.create(ZoneInstitution, data)
  console.log(zone.toJSON())
  return zone.toJSON()
}

const getAllZones = async () => {
  const zones = await service.findAll(ZoneInstitution)
  const zonesData = zones.map((zone) => zone.toJSON())
  console.log(zonesData)
  return zonesData
}

const getZoneById = async (id) => {
  const zone = await service.findByPk(ZoneInstitution, id)
  console.log(zone.toJSON())
  return zone.toJSON()
}

const updateZone = async (id, data) => {
  const updated = await service.update(ZoneInstitution, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteZone = async (id) => {
  const deleted = await service.deleteByPk(ZoneInstitution, id)
  return deleted.toJSON()
}

module.exports = {
  createZone,
  getAllZones,
  getZoneById,
  deleteZone,
  updateZone,
}
