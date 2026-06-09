#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main(){
    double cash = 10000;
    int choice = 0;

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
        else if (choice == 6) {
            cout << "Exiting simulator..." << endl;
        }
        else {
            cout << "Feature not added yet." << endl;
        }
    }
    return 0;
}
