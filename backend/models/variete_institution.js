const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution"
    },
    idVariete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_variete"
    },
    stockDeSecurite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "stock_de_securite"
    },
    idVarieteInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_variete_institution"
    },
    idSpeculationInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_speculation_institution"
    },
    prix: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "prix"
    }
  };
  const options = {
    tableName: "variete_institution",
    comment: "",
    indexes: [{
      name: "id_institution",
      unique: true,
      type: "BTREE",
      fields: ["id_institution", "id_variete"]
    }]
  };
  const VarieteInstitutionModel = sequelize.define("varieteInstitutionModel", attributes, options);
  return VarieteInstitutionModel;
};