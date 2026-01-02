const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-btn');
const historyNode = document.querySelector('.js-history-list');
const sumNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

let expenses = [];
const LIMIT = 10000;

limitNode.innerText = LIMIT;

buttonNode.addEventListener('click', function() {
    // 1. Получаем значение из поля ввода
    if (inputNode.value === '') {
        return;
    }

    const expense = parseInt(inputNode.value);

    inputNode.value = null;

    // 2. Добавляем трату в список
    expenses.push(expense);
    
    // 3. Вывод нового списка трат
    let expensesListHTML = '';

    expenses.forEach(element => {
        const elementHTML = `<li>${element} руб.</li>`;
        expensesListHTML += elementHTML;
    });
    
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

    // 4. Посчитать сумму и вывести её
    let sum = 0;
    
    expenses.forEach(element => {
        sum += element;
    });
    
    sumNode.innerText = sum;

    // 5. Сравнение суммы и лимита и вывод статуса
    if (sum <= LIMIT) {
        statusNode.innerText = `Всё хорошо`;
    } else {
        statusNode.innerText = `Всё плохо`;
        statusNode.classList.add('status_red');
    }
})