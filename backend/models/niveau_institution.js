const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idNiveauInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_niveau_institution',
    },
  }
  const options = {
    tableName: 'niveau_institution',
    comment: '',
    indexes: [],
  }
  const NiveauInstitutionModel = sequelize.define(
    'NiveauInstitution',
    attributes,
    options,
  )

  NiveauInstitutionModel.associate = function (models) {
    // associations can be defined here
    NiveauInstitutionModel.belongsTo(models.NiveauDeProduction, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'niveauId',
        allowNull: false,
      },
    })

    NiveauInstitutionModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })
  }

  return NiveauInstitutionModel
}
