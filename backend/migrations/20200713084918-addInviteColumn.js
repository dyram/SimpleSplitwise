'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Invites", "from", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        }),
        queryInterface.addColumn("Invites", "to", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        }),
        queryInterface.addColumn("Invites", "ExpenseId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Expenses",
            key: "id"
          }
        })
      ]);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Invites", "from"),
        queryInterface.removeColumn("Invites", "to"),
        queryInterface.removeColumn("Invites", "ExpenseId")
      ]);
    });
  }
};
