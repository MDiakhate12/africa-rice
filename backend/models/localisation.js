const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idLocalisation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_localisation"
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
    },
    region: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "region"
    },
    departement: {
      type: DataTypes.STRING(17),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "departement"
    },
    commune: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "commune"
    },
    village: {
      type: DataTypes.STRING(34),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "village"
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "longitude"
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "latitude"
    }
  };
  const options = {
    tableName: "localisation",
    comment: "",
    indexes: [{
      name: "id_zone",
      unique: false,
      type: "BTREE",
      fields: ["id_zone"]
    }]
  };
  const LocalisationModel = sequelize.define("localisationModel", attributes, options);
  return LocalisationModel;
};