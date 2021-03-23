const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_client"
    },
    nomCompletStructure: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom_complet_structure"
    },
    acronyme: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "acronyme"
    },
    estParticulier: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_particulier"
    },
    prenom: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "prenom"
    },
    nom: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom"
    }
  };
  const options = {
    tableName: "client",
    comment: "",
    indexes: []
  };
  const ClientModel = sequelize.define("clientModel", attributes, options);
  return ClientModel;
};