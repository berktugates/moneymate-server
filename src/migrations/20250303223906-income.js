"use strict";

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("income", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      amount:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      description:{
        type:DataTypes.STRING,
        allowNull:true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("income");
  },
};
