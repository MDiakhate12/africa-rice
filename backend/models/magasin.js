const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idMagasin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_magasin"
    },
    nomMagasin: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom_magasin"
    },
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution"
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
    }
  };
  const options = {
    tableName: "magasin",
    comment: "",
    indexes: [{
      name: "nom_magasin",
      unique: true,
      type: "BTREE",
      fields: ["nom_magasin", "id_localisation", "id_institution"]
    }, {
      name: "id_localisation",
      unique: false,
      type: "BTREE",
      fields: ["id_localisation"]
    }]
  };
  const MagasinModel = sequelize.define("magasinModel", attributes, options);
  return MagasinModel;
};