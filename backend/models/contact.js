const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idContact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_contact',
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'nom',
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'prenom',
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
    tableName: 'contact',
    comment: '',
    indexes: [],
  }
  const ContactModel = sequelize.define('Contact', attributes, options)

  ContactModel.associate = function (models) {
    // associations can be defined here
    ContactModel.belongsTo(models.Client, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'clientId',
        allowNull: false,
      },
    })
    ContactModel.belongsTo(models.Magasin, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'magasinId',
        allowNull: false,
      },
    })
    ContactModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })
    ContactModel.belongsTo(models.Localisation, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'localisationId',
        allowNull: false,
      },
    })
  }

  return ContactModel
}
