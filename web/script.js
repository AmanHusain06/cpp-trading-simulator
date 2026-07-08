// ===========================
// Trading Simulator Data
// ===========================

let cash = 10000;

let portfolio = {};

let transactions = [];

let stocks = [
    {
        symbol: "AAPL",
        company: "Apple",
        price: 180,
        change: 0
    },
    {
        symbol: "TSLA",
        company: "Tesla",
        price: 250,
        change: 0
    },
    {
        symbol: "MSFT",
        company: "Microsoft",
        price: 330,
        change: 0
    },
    {
        symbol: "NVDA",
        company: "NVIDIA",
        price: 900,
        change: 0
    }
];

console.log(stocks);