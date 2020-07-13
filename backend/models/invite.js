'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invite.belongsTo(models.Users, { foreignKey: "from" })
      Invite.belongsTo(models.Users, { foreignKey: "to" })
      Invite.belongsTo(models.Expenses, { foreignKey: "ExpenseId" })
    }
  };
  Invite.init({
    accept: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Invite',
  });
  return Invite;
};