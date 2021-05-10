const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idSpeculationInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_speculation_institution',
    },
  }
  const options = {
    tableName: 'speculation_institution',
    comment: '',
    indexes: [],
  }
  const SpeculationInstitutionModel = sequelize.define(
    'SpeculationInstitution',
    attributes,
    options,
  )

  SpeculationInstitutionModel.associate = function (models) {
    // associations can be defined here
    SpeculationInstitutionModel.belongsTo(models.Speculation, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'speculationId',
        allowNull: false,
      },
    })
    SpeculationInstitutionModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })
  }

  return SpeculationInstitutionModel
}
