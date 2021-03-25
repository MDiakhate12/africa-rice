const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idSpeculation: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_speculation',
    },
    nomSpeculation: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'nom_speculation',
      unique: 'nom_speculation_UNIQUE',
    },
    imageSpeculation: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'image_speculation',
    },
  }
  const options = {
    tableName: 'speculation',
    comment: '',
    indexes: [],
  }
  const SpeculationModel = sequelize.define('Speculation', attributes, options)
  return SpeculationModel
}
