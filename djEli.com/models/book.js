// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
module.exports = function(sequelize, DataTypes) {
  const Book = sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING
      // allowNull: false
    },

     email: {
      type: Sequelize.STRING
      // allowNull: false
    },
   
    date: {
      type: Sequelize.STRING
      // allowNull: false
    },

    phone: {
      type: Sequelize.STRING
      // allowNull: false
    },
   
    address: {
      type: Sequelize.STRING
      // allowNull: false
    },

    startTime: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    endTime: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    hours: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    discount: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    deposit: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    balDue: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    totalAmt: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    mileage: {
      type: Sequelize.INTEGER
      // allowNull: false
    },

    fullyPaid_Y_or_N: {
      type: Sequelize.STRING
      // allowNull: false
    },

     message: {
      type: Sequelize.STRING
      // allowNull: false
    },

     created_at: {
      type: Sequelize.DATE
    }
  },
    {
    timestamps: false
  });
    return Book;
};

 

