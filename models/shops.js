'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  shops.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shops',
  });

  // define associate
  shops.associate = function (models) {
    shops.belongsTo(models.users, {
      foreignKey: 'userId'
    })

    // associate shops -> product
    shops.hasMany(models.product, {
      foreignKey: "shopId"
    })
  }
  return shops;
};