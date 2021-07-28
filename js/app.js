'use strict';
const monthInEar = 12;

function calculatePercentMoney(money, period) {
    const percent = function calculatePercent(month) {
        if (month < 6){
            return 2;
        }
        if (month < 9){
            return 2.2;
        }
        if (month < 12){
            return 2.3;
        }
        if (month < 18){
            return 2.6;
        }
        return 2.7;
    };

    const monthPercent = percent(period)/ 100 / monthInEar;
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
    amountErrorEl.textContent = '';
    periodErrorEl.textContent = '';

    const amountInput = Number(amountInputEl.value);
    if (Number.isNaN(amountInput)){
        amountErrorEl.textContent = 'Неверное значение. Введите число, например: 15000';
        return;
    }

    const minAmount = 15000;
    if (amountInput < minAmount){
        amountErrorEl.textContent = 'Неверное значение. Минимальная сумма: 15 000 ₽';
        return;
    }

    const maxAmount = 50000000;
    if (amountInput > maxAmount){
        amountErrorEl.textContent = 'Неверное значение. Максимальная сумма: 50 000 000 ₽';
        return;
    }

    const periodInput = Number(periodInputEl.value);
    if (Number.isNaN(periodInput)){
        periodErrorEl.textContent = 'Неверное значение. Введите число месяцев, например: 3';
        return;
    }

    const minPeriod = 3;
    if (periodInput < minPeriod){
        periodErrorEl.textContent = 'Неверное значение. Минимальный период: 3 месяца';
        return;
    }

    const maxPeriod = 18;
    if (periodInput > maxPeriod){
        periodErrorEl.textContent = 'Неверное значение. Максимальный период: 18 месяцев';
        return;
    }

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
const amountErrorEl = document.getElementById('amount-error');
const periodErrorEl = document.getElementById('period-error');

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit', handleSubmit);
