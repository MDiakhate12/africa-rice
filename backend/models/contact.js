const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idContact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_contact"
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom"
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "prenom"
    },
    telephone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "telephone"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
    },
    idLocalisation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_localisation",
      references: {
        key: "id_localisation",
        model: "localisationModel"
      }
    },
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution",
      references: {
        key: "id_institution",
        model: "institutionModel"
      }
    },
    idMagasin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_magasin",
      references: {
        key: "id_magasin",
        model: "magasinModel"
      }
    },
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_client",
      references: {
        key: "id_client",
        model: "clientModel"
      }
    }
  };
  const options = {
    tableName: "contact",
    comment: "",
    indexes: [{
      name: "id_localisation",
      unique: false,
      type: "BTREE",
      fields: ["id_localisation"]
    }, {
      name: "id_client",
      unique: false,
      type: "BTREE",
      fields: ["id_client"]
    }, {
      name: "contact_ibfk_2",
      unique: false,
      type: "BTREE",
      fields: ["id_institution"]
    }, {
      name: "contact_ibfk_3",
      unique: false,
      type: "BTREE",
      fields: ["id_magasin"]
    }]
  };
  const ContactModel = sequelize.define("contactModel", attributes, options);
  return ContactModel;
};