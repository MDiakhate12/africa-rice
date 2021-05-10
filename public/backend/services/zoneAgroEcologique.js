const Models = require('../models').default
const service = require('./index')
const { ZoneAgroEcologique } = Models

const createZone = async (data) => {
  const zone = await service.create(ZoneAgroEcologique, data)
  console.log(zone.toJSON())
  return zone.toJSON()
}

const getAllZones = async (arg = {}) => {
  const zones = await service.findAll(ZoneAgroEcologique)
  const zonesData = zones.map((zone) => zone.toJSON())
  console.log(zonesData)
  return zonesData
}

const getZoneById = async (id) => {
  const zone = await service.findByPk(ZoneAgroEcologique, id)
  if (zone) {
    console.log("GET ONE", zone.toJSON());
    return zone.toJSON();
  }
  console.log("GET ONE", zone);
  return zone;
}

const updateZone = async (id, data) => {
  const updated = service.update(ZoneAgroEcologique, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteZone = async (id) => {
  const deleted = service.deleteByPk(ZoneAgroEcologique, id)
  return deleted.toJSON()
}

module.exports = {
  createZone,
  getAllZones,
  getZoneById,
  deleteZone,
  updateZone,
}
