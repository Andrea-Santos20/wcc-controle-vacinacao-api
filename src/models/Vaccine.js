const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../db")

const Vaccine = database.define('Vaccine', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    code: {
        type: DataTypes.STRING
    },    
    name: {
        type: DataTypes.STRING
    },
    expected_date: {
        type: DataTypes.STRING
    },
    vaccinated: {
        type: DataTypes.BOOLEAN
    }
});

Vaccine.sync()

module.exports = Vaccine;
