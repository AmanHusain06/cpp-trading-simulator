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
            <td>$${stock.price.toFixed(2)}</td>

            <td style="color:${stock.change >= 0 ? '#22c55e' : '#ef4444'}">
                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
            </td>

            <td>
                <input
                    type="number"
                    id="qty-${stock.symbol}"
                    value="1"
                    min="1"
                    style="width:60px">
            </td>

            <td>
                <button class="buy-btn" onclick="buyStock('${stock.symbol}')">
                    Buy
                </button>
            </td>

            <td>
                <button class="sell-btn" onclick="sellStock('${stock.symbol}')">
                    Sell
                </button>
            </td>
        </tr>
        `;

    }

}

renderMarket();

// =========================
// Buy Stock
// =========================

function buyStock(symbol) {
    const quantity = Number(
    document.getElementById(`qty-${symbol}`).value
    );

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

    portfolio[symbol] = {
        shares: quantity,
        averageCost: stock.price
    };

    }
    else {
        const currentShares = portfolio[symbol].shares;
        const currentAverage = portfolio[symbol].averageCost;
        const totalCost = currentShares * currentAverage + quantity * stock.price;
        const newShares = currentShares + quantity;
        portfolio[symbol].shares = newShares;
        portfolio[symbol].averageCost = totalCost / newShares;
    }

    transactions.push(`Bought ${quantity} shares of ${symbol} at £${stock.price}`);


    updateDashboard();
    renderPortfolio();
    renderTransactions();
    saveData();
}

// =========================
// Update Dashboard
// =========================

function updateDashboard() {
    let portfolioValue = 0;

    for (const symbol in portfolio) {
    const stock = stocks.find(s => s.symbol === symbol);

        if (stock) {
            portfolioValue +=
                stock.price * portfolio[symbol].shares;
        }
    }

    const netWorth = cash + portfolioValue;
    const profitLoss = netWorth - 10000;

    document.getElementById("cash").textContent = `£${cash.toFixed(2)}`;
    document.getElementById("portfolio-value").textContent = `£${portfolioValue.toFixed(2)}`;
    document.getElementById("net-worth").textContent = `£${netWorth.toFixed(2)}`;
    const profitElement = document.getElementById("profit-loss");
    profitElement.textContent = `£${profitLoss.toFixed(2)}`;
    profitElement.style.color =
        profitLoss >= 0 ? "#22c55e" : "#ef4444";
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

    const symbols = Object.keys(portfolio);

    if (symbols.length === 0) {
        portfolioTable.innerHTML = `
            <tr>
                <td colspan="6">You do not own any stocks yet.</td>
            </tr>
        `;
        return;
    }

    for (const symbol of symbols) {
        const stock = stocks.find(s => s.symbol === symbol);

        if (!stock) {
            continue;
        }

        const shares = portfolio[symbol].shares;
        const averageCost = portfolio[symbol].averageCost;
        const value = shares * stock.price;
        const profit = (stock.price - averageCost) * shares;
        const returnPercentage =
            ((stock.price - averageCost) / averageCost) * 100;

        portfolioTable.innerHTML += `
            <tr>
                <td>${symbol}</td>
                <td>${shares}</td>
                <td>£${averageCost.toFixed(2)}</td>
                <td>£${stock.price.toFixed(2)}</td>
                <td>£${value.toFixed(2)}</td>

                <td style="color: ${profit >= 0 ? "#22c55e" : "#ef4444"}">
                    ${profit >= 0 ? "+" : "-"}£${Math.abs(profit).toFixed(2)}
                    (${returnPercentage >= 0 ? "+" : ""}${returnPercentage.toFixed(2)}%)
                </td>
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

// =========================
// Simulate Market Prices
// =========================

function updateMarket() {

    for (const stock of stocks) {

        // Random percentage between -3% and +3%
        const percentageChange = (Math.random() * 6 - 3);

        stock.change = percentageChange;

        stock.price = stock.price * (1 + percentageChange / 100);

        // Keep 2 decimal places
        stock.price = Number(stock.price.toFixed(2));
    }

    renderMarket();
    updateDashboard();
    renderPortfolio();
    saveData();
}

function sellStock(symbol) {

    const quantity = Number(
        document.getElementById(`qty-${symbol}`).value
    );

    const stock = stocks.find(s => s.symbol === symbol);

    if (!portfolio[symbol] || portfolio[symbol].shares < quantity) {
        alert("Not enough shares.");
        return;
    }

    portfolio[symbol].shares -= quantity;

    if (portfolio[symbol].shares === 0) {
        delete portfolio[symbol];
    }

    cash += stock.price * quantity;

    transactions.push(
        `Sold ${quantity} shares of ${symbol} at $${stock.price.toFixed(2)}`
    );

    updateDashboard();
    renderPortfolio();
    renderTransactions();
    saveData();
}

function saveData() {
    const simulatorData = {
        cash: cash,
        portfolio: portfolio,
        transactions: transactions,
        stocks: stocks
    };

    localStorage.setItem(
        "tradingSimulatorData",
        JSON.stringify(simulatorData)
    );
}

function loadData() {
    const savedData = localStorage.getItem("tradingSimulatorData");

    if (!savedData) {
        return;
    }

    const simulatorData = JSON.parse(savedData);

    cash = simulatorData.cash;
    portfolio = simulatorData.portfolio;
    transactions = simulatorData.transactions;
    stocks = simulatorData.stocks;
}

function resetSimulator() {
    const confirmed = window.confirm(
        "Are you sure you want to reset the simulator?"
    );

    if (!confirmed) {
        return;
    }

    cash = 10000;
    portfolio = {};
    transactions = [];

    stocks = [
        { symbol: "AAPL", company: "Apple", price: 180, change: 0 },
        { symbol: "TSLA", company: "Tesla", price: 250, change: 0 },
        { symbol: "MSFT", company: "Microsoft", price: 330, change: 0 },
        { symbol: "NVDA", company: "NVIDIA", price: 900, change: 0 }
    ];

    localStorage.removeItem("tradingSimulatorData");

    renderMarket();
    updateDashboard();
    renderPortfolio();
    renderTransactions();

    console.log("Simulator reset successfully");
}

loadData();

renderMarket();
updateDashboard();
renderPortfolio();
renderTransactions();

setInterval(updateMarket, 3000);