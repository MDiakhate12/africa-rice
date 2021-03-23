const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idZone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_zone"
    },
    nomZone: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom_zone",
      unique: "nom_zone_UNIQUE"
    }
  };
  const options = {
    tableName: "zone_agro_ecologique",
    comment: "",
    indexes: []
  };
  const ZoneAgroEcologiqueModel = sequelize.define("zoneAgroEcologiqueModel", attributes, options);
  return ZoneAgroEcologiqueModel;
};