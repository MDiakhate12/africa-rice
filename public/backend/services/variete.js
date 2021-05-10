const Models = require("../models").default;
const service = require("./index");
const { Variete, ZoneAgroEcologique, Speculation } = Models;

const createVariete = async (data) => {
  const variete = await service.create(Variete, data);
  console.log(variete.toJSON());
  return variete.toJSON();
};

const getAllVarietes = async (arg = {}) => {
  const varietes = await service.findAll(Variete, {
    include: [ZoneAgroEcologique, Speculation],
  });
  const variestesData = varietes.map((variete) => variete.toJSON());
  console.log(variestesData);

  return variestesData;
};

const getVarieteById = async (id) => {
  const variete = await service.findByPk(Variete, id);
  if (variete) {
    console.log("GET ONE", variete.toJSON());
    return variete.toJSON();
  }
  console.log("GET ONE", variete);
  return variete;
};

const updateVariete = async (id, data) => {
  const updated = service.update(Variete, id, data);
  console.log(updated.toJSON());
  return updated.toJSON();
};

const deleteVariete = async (id) => {
  const deleted = service.deleteByPk(Variete, id);
  return deleted.toJSON();
};

module.exports = {
  createVariete,
  getAllVarietes,
  getVarieteById,
  deleteVariete,
  updateVariete,
};
