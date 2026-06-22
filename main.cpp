#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main(){
    double cash = 10000;
    int choice = 0;
    unordered_map<string, int> portfolio;
    unordered_map<string, double> stockPrices;
    stockPrices["AAPL"] = 180;
    stockPrices["TSLA"] = 250;
    stockPrices["NVDA"] = 900;
    stockPrices["MSFT"] = 330;

    cout << "Welcome to the Stock Trading Simulator!" << endl;

    while(choice != 6){
        cout << "\n===== Trading Simulator Menu =====\n";
        cout << "1. View Cash Balance\n";
        cout << "2. View Stock Prices\n";
        cout << "3. Buy Stocks\n";
        cout << "4. Sell Stocks\n";
        cout << "5. View Portfolio\n";
        cout << "6. Exit\n";
        cout << "Enter option: ";

        cin >> choice;

        if(choice == 1){
            cout << "cuurrent cash balance : £" << cash << endl;
        }
        else if(choice == 3){
            string symbol;
            int quantity;
            cout << "Enter stock symbol: ";
            cin >> symbol;
            cout << "Enter quantity: ";
            cin >> quantity;
            if(!stockPrices.count(symbol)){
                cout << "Stock not found\n";
            }
            else{
                double cost = stockPrices[symbol] * quantity;
                if(cost > cash){
                    cout << "Not enough cash. \n";
                }
                else{
                    cash -= cost;
                    portfolio[symbol] += quantity;

                    cout << "Bought " << quantity << " shares of " << symbol << endl;
                    cout << "Remaining cash: £" << cash << endl;
                }
            }
        }
        else if(choice == 4){
            string symbol;
            int quantity;
            cout << "Enter stock symbol: ";
            cin >> symbol;
            cout << "Enter quantity: ";
            cin >> quantity;
            if(!stockPrices.count(symbol)){
                cout << "Stock not found\n";
            }
            else if(!portfolio.count(symbol) || portfolio[symbol] < quantity){
                cout << "you dont have enough shares to sell.\n";
            }
            else{
                double saleValue = stockPrices[symbol] * quantity;
                portfolio[symbol] -= quantity;
                cash += saleValue;

                cout << "Sold " << quantity << " shares of " << symbol << endl;
                cout << "New cash amount: £" << cash << endl;
            }
        }
        else if(choice == 5){
            cout << "\nCurrent Portfolio: \n";
            bool hasHoldings = false;
            for(const auto& holding : portfolio){
                if(holding.second > 0){
                    cout << holding.first << ": " << holding.second << " shares\n";
                    hasHoldings = true;
                }
            }
            if(!hasHoldings){
                cout << "You dont have any stocks in your portfolio.\n";
            }
        }
        else if (choice == 6) {
            cout << "Exiting simulator..." << endl;
        }
        else {
            cout << "Feature not added yet." << endl;
        }
    }
    return 0;
}
