const pushToSQL = require('./src/pushToSQL');
const priceByMonthCollection = require('./src/priceByMonthCollection');

(async () => {
    try {
        const deals = await priceByMonthCollection();
        console.log(deals);
        await pushToSQL(deals);
        console.log('Pushed deals to SQL');
    } catch (e) {
        console.log(e);
    };
})();