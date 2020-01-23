const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// (function (d) {
//     var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

//     d.prototype.getLongMonth = d.getLongMonth = function getLongMonth(inMonth) {
//         return gM.call(this, inMonth, mL);
//     }

//     d.prototype.getShortMonth = d.getShortMonth = function getShortMonth(inMonth) {
//         return gM.call(this, inMonth, mS);
//     }

//     function gM(inMonth, arr) {
//         var m;

//         if (this instanceof d) {
//             m = this.getMonth();
//         }
//         else if (typeof inMonth !== 'undefined') {
//             m = parseInt(inMonth, 10) - 1; // Subtract 1 to start January at zero
//         }

//         return arr[m];
//     }
// })(Date);

// const today = new Date()

// const monthToArray = new Map([
//     ['01', 0],
//     ['02', 1],
//     ['03', 2],
//     ['04', 3],
//     ['05', 4],
//     ['06', 5],
//     ['07', 6],
//     ['08', 7],
//     ['09', 8],
//     ['10', 9],
//     ['11', 10],
//     ['12', 11]
// ]);

const priceByMonth = function (date) {
    const token = 'FmlkztLL2diS02WK7tS2-w';
    const format = 'json';
    const url = 'https://www.skyscanner.ca/g/browseservice/dataservices/browse/v3/bvweb/CA/CAD/en-US/destinations/YUL/anywhere/' + date + '/' + date + '/?profile=minimalcityrollupwithnamesv2&include=image;holiday;hotel;adverts&apikey=8aa374f4e28e4664bf268f850f767535'
    const encodedUrl = encodeURIComponent(url);
    const reqUrl = 'https://api.proxycrawl.com/?token=' + token + '&url=' + encodedUrl + '&format=' + format
    const xmlHttp = new XMLHttpRequest(reqUrl);
    return new Promise((resolve, reject) => {
        let deals = [];
        let today = new Date();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState !== 4) return;
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log("connection successful");
                let xmlObject = JSON.parse(xmlHttp.responseText);
                for (let i = 0; i < xmlObject.PlacePrices.length - 1; i++) {
                    let deal = {
                        Country: xmlObject.PlacePrices[i].Name,
                        indirectPrice: xmlObject.PlacePrices[i].IndirectPrice,
                        directPrice: xmlObject.PlacePrices[i].DirectPrice,
                        countryID: xmlObject.PlacePrices[i].Id,
                        createdAt: today,
                        date: date,
                    };
                    if (deal.indirectPrice > 1 || deal.directPrice > 1) {
                        deals.push(deal);
                    };
                };
                console.log(deals)
                resolve(deals);
            } else {
                reject({
                    status: xmlHttp.status,
                    statusText: xmlHttp.statusText,
                });
            };
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    })
};

const arrayToMonth = new Map([
    [0, '01'],
    [1, '02'],
    [2, '03'],
    [3, '04'],
    [4, '05'],
    [5, '06'],
    [6, '07'],
    [7, '08'],
    [8, '09'],
    [9, '10'],
    [10, '11'],
    [11, '12']
])

const priceByMonthCollection = Array.from(Array(12).keys())
priceByMonthCollection.map((element, index) => {
    let d = new Date()
    d.setMonth(d.getMonth() + index);
    let month = arrayToMonth.get(d.getMonth())
    let year = (d.getFullYear()).toString()
    let date = year + '-' + month;
    element = priceByMonth(date);
})

console.log(priceByMonthCollection);