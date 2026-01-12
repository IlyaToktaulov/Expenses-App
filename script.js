const CHANGE_LIMIT_TEXT = 'Введите лимит'
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'Всё хорошо';
const STATUS_OUT_OF_LIMIT = 'Всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';
const STORAGE_LABEL_LIMIT = 'limit';
const STARAGE_LABEL_EXPENSES = 'expenses';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-btn');
const resetButton = document.querySelector('.js-clearButton');
const historyNode = document.querySelector('.js-history-list');
const sumNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categorySelectNode = document.querySelector('.js-group-input');
const changeLimitBtn = document.querySelector('.js-change-limit');

const expensesFromStorageString = localStorage.getItem(STARAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString);
let expenses = [];
if (Array.isArray(expensesFromStorage)) {
    expenses = expensesFromStorage;
}

let LIMIT = limitNode.innerText;

init(expenses);

function render(expenses) {
    const sum = calculateExpenses(expenses);
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(expenses);
}

function init(expenses) {
    limitNode.innerText = localStorage.getItem(STORAGE_LABEL_LIMIT);
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
}

function trackExpense(expense) {
    expenses.push(expense);
}

saveExpensesToStorage();

function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STARAGE_LABEL_EXPENSES, expensesString);
}

function getExpenseFromUser(category) {
    if (inputNode.value === '') {
        alert('Введите сумму');
        return null;
    }

    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
}

function clearInput() {
    inputNode.value = null;
}

const changeLimitHandler = () => {
    const newLimit = prompt(CHANGE_LIMIT_TEXT);

    const newLimitValue = parseInt(newLimit);

    if (!newLimitValue) {
        return;
    }

    limitNode.innerText = newLimitValue;
    LIMIT = newLimitValue;

    localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);

}

function calculateExpenses(expenses) {
    let sum = 0;
    
    expenses.forEach(element => {
        sum += element.amount;
    });

    return sum;
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
        const elementHTML = `<li class="expense-list_element">${element.categories}: ${element.amount} ${CURRENCY}</li>`;
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
        statusNode.className = 'status';
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} руб.)`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}

const getSelectedCategory = () => {
    return categorySelectNode.value;
}

const addButtonHandler = () => {
    // 1. Получаем значение из поля ввода
    const expense = getExpenseFromUser();
    
    if (!expense) {
        return;
    }
    
    const currentCategory = getSelectedCategory();

    if (currentCategory === 'Категория') {
        alert('Выберите категорию');
        return;
    }

    const newExpense = { amount: expense, categories: currentCategory};
    
    // 2. Добавляем трату в список
    trackExpense(newExpense);
    
    // 3. Вывод нового списка трат
    render(expenses);

}

const resetButtonHandler = () => {
    // Сбрасываем счётчик
    expenses = [];
    render(expenses);
}

buttonNode.addEventListener('click', addButtonHandler);
resetButton.addEventListener('click', resetButtonHandler);
changeLimitBtn.addEventListener('click', changeLimitHandler);