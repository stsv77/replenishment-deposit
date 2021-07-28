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

    const totalMoney = moneyWithPercent.toFixed(0);

    return {
        totalMoney,
        profitMoney: totalMoney - money,
        percent: percent(period),
    };
}

function handleSubmit(evt){
    evt.preventDefault();

    totalEl.textContent = '';
    profitEl.textContent = '';
    percentEl.textContent = '';

    const amountInput = Number(amountInputEl.value);
    const periodInput = Number(periodInputEl.value);
    const result = calculatePercentMoney(amountInput, periodInput);

    totalEl.textContent = result.totalMoney;
    profitEl.textContent = result.profitMoney;
    percentEl.textContent = result.percent;
}

const amountInputEl = document.getElementById('amount-input');
const periodInputEl = document.getElementById('period-input');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('profit');
const percentEl = document.getElementById('percent');

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit', handleSubmit);
