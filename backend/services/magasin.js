const Models = require("../models").default;
const service = require("./index");
const { Magasin, Institution, Localisation } = Models;

const createMagasin = async (data) => {
  const magasin = await service.create(Magasin, data);
  console.log(magasin.toJSON());
  return magasin.toJSON();
};

const getAllMagasins = async (arg = {}) => {

  const option = {
    include: [Institution, Localisation],
  }

  if (Object.keys(arg)) option = { ...option, where: { ...arg } }

  const magasins = await service.findAll(Magasin, option);

  const magasinsData = magasins.map((magasin) => magasin.toJSON());
  console.log(magasinsData);
  return magasinsData;
};

const getMagasinById = async (id) => {
  const magasin = await service.findByKey(Magasin, id);
  console.log(magasin.toJSON());
  return magasin.toJSON();
};

const updateMagasin = async (id, data) => {
  const updated = service.update(Magasin, id, data);
  console.log(updated.toJSON());
  return updated.toJSON();
};


const deleteMagasin = async (id) => {
  const deleted = await service.deleteByPk(Magasin, id)
  console.log(deleted)
  return deleted
}

module.exports = {
  createMagasin,
  getAllMagasins,
  getMagasinById,
  deleteMagasin,
  updateMagasin,
};
