const pushToSQL = require('./src/pushToSQL');
const priceByMonthCollection = require('./src/priceByMonthCollection');

(async () => {
    try {
        const deals = await priceByMonthCollection();
        await pushToSQL(deals.flat(Infinity));
        console.log('Pushed deals to SQL');
    } catch (e) {
        console.log('An error occured');
    };
})();