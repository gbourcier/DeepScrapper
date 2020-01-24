const pushToSQL = require('./src/pushToSQL');
const priceByMonthCollection = require('./src/priceByMonthCollection');

exports.handler = async function (event) {
    try {
        const deals = await priceByMonthCollection();
        console.log(deals.flat(Infinity));
        await pushToSQL(deals.flat(Infinity));
        console.log('Pushed deals to SQL');
    } catch (e) {
        console.log(e);
    };
}