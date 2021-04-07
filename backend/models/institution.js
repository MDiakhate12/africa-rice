const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_institution',
    },
    nomComplet: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'nom_complet',
    },
    sigle: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'sigle',
    },
    logo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'logo',
    },
    addresse: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'addresse',
    },
    telephone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'telephone',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'email',
    },
  }
  const options = {
    tableName: 'institution',
    comment: '',
    indexes: [],
  }
  const InstitutionModel = sequelize.define('Institution', attributes, options)

  // InstitutionModel.associate = function (models) {
  //   // associations can be defined here
  //   InstitutionModel.belongsTo(models.Localisation, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       name: 'localisationId',
  //       allowNull: false,
  //     },
  //   })
  // }

  return InstitutionModel
}
