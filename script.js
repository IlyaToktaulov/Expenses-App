const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'Всё хорошо';
const STATUS_OUT_OF_LIMIT = 'Всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-btn');
const historyNode = document.querySelector('.js-history-list');
const sumNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

init(expenses);


buttonNode.addEventListener('click', function() {

    // 1. Получаем значение из поля ввода
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    // 2. Добавляем трату в список
    trackExpense(expense);

    // 3. Вывод нового списка трат
    render(expenses);

})

function render(expenses) {
    const sum = calculateExpenses(expenses);
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(expenses);
}

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
}

function trackExpense(expense) {
    expenses.push(expense);
}

function getExpenseFromUser() {
    if (inputNode.value === '') {
        return null;
    }

    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
}

function clearInput() {
    inputNode.value = null;
}

function calculateExpenses(expenses) {
    let sum = 0;
    
    expenses.forEach(element => {
        sum += element;
    });

    return sum;
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
        const elementHTML = `<li class="expense-list_element">${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });
    
    historyNode.innerHTML = `<ol class="expense-list">${expensesListHTML}</ol>`;
}

function renderSum(sum) {
    sumNode.innerText = sum;
}

function renderStatus(expenses) {
    const sum = calculateExpenses(expenses);

    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}