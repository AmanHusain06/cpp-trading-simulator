// =========================
// Trading Simulator Data
// =========================

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

// =========================
// Render Market Table
// =========================

function renderMarket() {

    const marketTable = document.getElementById("market-table");

    marketTable.innerHTML = "";

    for (const stock of stocks) {

        marketTable.innerHTML += `
            <tr>
                <td>${stock.symbol}</td>
                <td>${stock.company}</td>
                <td>£${stock.price}</td>
                <td>${stock.change.toFixed(2)}%</td>
            </tr>
        `;

    }

}

renderMarket();