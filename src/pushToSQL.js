const Sequelize = require('sequelize');


const pushToSQL = async (deals) => {
    const connectionString = {
        database: 'DDMAIN',
        username: 'admin',
        password: '6mDl72Dsr9D8FZpN7N2L',
        host: 'ddmn.cbuiqjofyxkz.us-east-2.rds.amazonaws.com',
        dialect: 'mssql',
    };
    //Make SQL connection
    const sequelize = new Sequelize(connectionString.database, connectionString.username, connectionString.password, {
        host: connectionString.host,
        dialect: connectionString.dialect,
    });
    //Test SQL connection
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    //Define table object     
    const table = sequelize.define('priceListByMonth', {
        // attributes
        Country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        indirectPrice: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        countryID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        directPrice: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    //populate SQL database
    await table.bulkCreate(deals)
    sequelize.close()
};

module.exports =  pushToSQL;