const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idZoneInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_zone_institution',
    },
  }
  const options = {
    tableName: 'zone_institution',
    comment: '',
    indexes: [],
  }
  const ZoneInstitutionModel = sequelize.define(
    'ZoneInstitution',
    attributes,
    options,
  )

  ZoneInstitutionModel.associate = function (models) {
    // associations can be defined here
    ZoneInstitutionModel.belongsTo(models.Localisation, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'localisationId',
        allowNull: false,
      },
    })
    ZoneInstitutionModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })
  }

  return ZoneInstitutionModel
}
