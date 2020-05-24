require('dotenv').config();

const Sequelize = require('sequelize');
const self = module.exports;
let sequelize;  
/**
 * Construct a singleton sequelize object to query the database
 * 
 * @returns {object} - Sequelize object
 */
exports.initialize = () => {
  
  if (!sequelize) {
    const dbName = 'deu6ptr3gt32eh';
    const dbUsername = 'ihnahmzsswoqjn';
    const dbPassword = '9347ced241f579418d7dcff960d3747614f80ba9167c2fce97e251e05de67563';
    const dbHost = 'ec2-54-247-169-129.eu-west-1.compute.amazonaws.com';
    const dbPort = 5432;

    return new Sequelize(dbName, dbUsername, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: 'postgres',
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false
          }
      }
    });
  }

  return sequelize;
};

module.exports = self.initialize();