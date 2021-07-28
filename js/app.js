'use strict';
const monthInEar = 12;

function calculatePercentMoney(money, period) {
    const percent = function calculatePercent(month) {
        if (month < 6){
            return 0.02;
        }
        if (month < 9){
            return 0.022
        }
        if (month < 12){
            return 0.023
        }
        if (month < 18){
            return 0.026
        }
        return 0.027
    }

    const monthPercent = percent(period) / monthInEar;
    let moneyWithPercent = money + money * monthPercent;

    for (let i = 1; i < period; i++){
        moneyWithPercent += moneyWithPercent * monthPercent;
    }
    return moneyWithPercent.toFixed(0);
}

console.log(calculatePercentMoney(950000, 9));

