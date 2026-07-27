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

// =========================
// Buy Stock
// =========================

function buyStock() {
    const symbolInput = document.getElementById("symbol-input");
    const quantityInput = document.getElementById("quantity-input");

    const symbol = symbolInput.value.toUpperCase();
    const quantity = Number(quantityInput.value);

    const stock = stocks.find(s => s.symbol === symbol);

    if (!stock) {
        alert("Stock not found.");
        return;
    }

    if (quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    const cost = stock.price * quantity;

    if (cost > cash) {
        alert("Not enough cash.");
        return;
    }

    cash -= cost;

    if (!portfolio[symbol]) {
        portfolio[symbol] = 0;
    }

    portfolio[symbol] += quantity;

    transactions.push(`Bought ${quantity} shares of ${symbol} at £${stock.price}`);

    symbolInput.value = "";
    quantityInput.value = "";

    updateDashboard();
    renderPortfolio();
    renderTransactions();
}

// =========================
// Update Dashboard
// =========================

function updateDashboard() {
    let portfolioValue = 0;

    for (const symbol in portfolio) {
        const stock = stocks.find(s => s.symbol === symbol);
        portfolioValue += stock.price * portfolio[symbol];
    }

    const netWorth = cash + portfolioValue;
    const profitLoss = netWorth - 10000;

    document.getElementById("cash").textContent = `£${cash.toFixed(2)}`;
    document.getElementById("portfolio-value").textContent = `£${portfolioValue.toFixed(2)}`;
    document.getElementById("net-worth").textContent = `£${netWorth.toFixed(2)}`;
    document.getElementById("profit-loss").textContent = `£${profitLoss.toFixed(2)}`;
}

// =========================
// Render Portfolio
// =========================

function renderPortfolio() {
    const portfolioTable = document.getElementById("portfolio-table");

    if (!portfolioTable) {
        console.error("portfolio-table element not found");
        return;
    }

    portfolioTable.innerHTML = "";

    const symbols = Object.keys(portfolio).filter(
        symbol => portfolio[symbol] > 0
    );

    if (symbols.length === 0) {
        portfolioTable.innerHTML = `
            <tr>
                <td colspan="4">You do not own any stocks yet.</td>
            </tr>
        `;
        return;
    }

    for (const symbol of symbols) {
        const stock = stocks.find(stock => stock.symbol === symbol);

        if (!stock) {
            continue;
        }

        const shares = portfolio[symbol];
        const value = stock.price * shares;

        portfolioTable.innerHTML += `
            <tr>
                <td>${symbol}</td>
                <td>${shares}</td>
                <td>£${stock.price.toFixed(2)}</td>
                <td>£${value.toFixed(2)}</td>
            </tr>
        `;
    }
}

function renderTransactions() {
    const transactionList = document.getElementById("transaction-list");

    if (!transactionList) {
        console.error("transaction-list element not found");
        return;
    }

    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions yet.</li>";
        return;
    }

    for (const transaction of transactions) {
        transactionList.innerHTML += `<li>${transaction}</li>`;
    }
}


renderMarket();
updateDashboard();
renderPortfolio();
renderTransactions();