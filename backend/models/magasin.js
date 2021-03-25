const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idMagasin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_magasin',
    },
    nomMagasin: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'nom_magasin',
    },
  }
  const options = {
    tableName: 'magasin',
    comment: '',
    indexes: [],
  }
  const MagasinModel = sequelize.define('Magasin', attributes, options)

  MagasinModel.associate = function (models) {
    // associations can be defined here
    MagasinModel.belongsTo(models.Localisation, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'localisationId',
        allowNull: false,
      },
    })

    MagasinModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })
  }

  return MagasinModel
}
