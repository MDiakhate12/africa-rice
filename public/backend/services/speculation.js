const Models = require("../models").default;
const service = require("./index");
const { Speculation } = Models;

const createSpeculation = async (data) => {
  const speculation = await service.create(Speculation, data);
  console.log(speculation.toJSON());
  return speculation.toJSON();
};

const getAllSpeculations = async (arg = {}) => {
  const speculations = await service.findAll(Speculation);
  const speculationsData = speculations.map((speculation) =>
    speculation.toJSON()
  );
  // console.log(speculationsData)
  return speculationsData;
};

const getSpeculationById = async (id) => {
  const speculation = await service.findByPk(Speculation, id);
  if (speculation) {
    console.log("GET ONE", speculation.toJSON());
    return speculation.toJSON();
  }
  console.log("GET ONE", speculation);
  return speculation;
};

const updateSpeculation = async (id, data) => {
  const updated = await service.update(Speculation, id, data);
  console.log(updated.toJSON());
  return updated.toJSON();
};

const deleteSpeculation = async (id) => {
  const deleted = await service.deleteByPk(Speculation, id);
  console.log(deleted);
  return deleted;
};

module.exports = {
  createSpeculation,
  getAllSpeculations,
  getSpeculationById,
  deleteSpeculation,
  updateSpeculation,
};
