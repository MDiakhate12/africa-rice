const findOrCreate = (model, payload) =>
  model.findOrCreate({
    where: {
      email: payload.email,
    },
    defaults: {
      ...payload,
    },
  })

/*
  Create a new for a given mode
*/
const create = (model, payload) => model.create(payload)

const findByPk = (model, id, condition = {}) => model.findByPk(id, condition)

/*
  Get all record of a models
*/
const findAll = (model, condition = {}) => model.findAll(condition)

/*
  Update an model entity
*/
const update = async (model, id, payload) => {
  let idName = ''
  for (let p in payload) {
    if (p.startsWith('id')) {
      idName = p
      break
    }
  }
  return await model.update(
    {
      ...payload,
    },
    {
      where: {
        [idName]: id,
      },
    },
  )
}

/*
  Delete an record by id 
*/

const deleteByPk = (model, id) =>
  model.destroy({
    where: id,
  })

/*
  Count the occurrences of element for a given model 
*/
const count = (model, condition = {}) => model.count(condition)

/*
find activation by key
*/
const findByKey = (model, key) =>
  model.findOne({
    where: key,
  })

module.exports = {
  findByPk,
  count,
  deleteByPk,
  findByKey,
  update,
  findOrCreate,
  create,
  findAll,
}
