const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idVariete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_variete"
    },
    nomVariete: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom_variete",
      unique: "nom_variete_UNIQUE"
    },
    longueurCycle: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "longueur_cycle"
    },
    idSpeculation: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_speculation",
      references: {
        key: "id_speculation",
        model: "speculationModel"
      }
    },
    idZone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_zone",
      references: {
        key: "id_zone",
        model: "zoneAgroEcologiqueModel"
      }
    }
  };
  const options = {
    tableName: "variete",
    comment: "",
    indexes: [{
      name: "fk_speculation_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_speculation"]
    }, {
      name: "fk_zone_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_zone"]
    }]
  };
  const VarieteModel = sequelize.define("varieteModel", attributes, options);
  return VarieteModel;
};