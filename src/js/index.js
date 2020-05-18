const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);


//*Eleventh
// localStorage is an API
let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


//*First bring in all DOM elements
//*Second add const variable arr to store transactions in local storage
//*Third create a variable let transactions which is our global state for transactions
//*Fourth create addTransactionDOM function to display elements in the DOM. Created dummyArr to add transaction to DOM and then looping through them and calling arr
//*Fifth have income and expense totals reflect what is in transactions history
//*Sixth create function updateValues to update balance income and expenses in the DOM
//*Seventh add eventListener for a submit action that calls addTransaction function
//*Eighth add removeTransaction function that passes in a function to check for id if same if not it's going into the arr
//*Ninth implement local storage because items don't stick when page refreshes
//*Tenth create variable localStorageTransactions  going to be a stringified array and parse it as an arr so we run JSON parse
//*Eleventh set localStorage equal to transactions because we want to check if transactons not equal to null it means somethinf is in there if thats true use localStorage transactions else set it equal to an empty array
//*Twelfth add ability to add to local storage updateLocalStorage() added function to addTransaction() that sets the item when remove we also call this function
//* cont... with local storage we have to overrwrite it, keep setting the item localStorage doesn't have an API where we can call update, so we overwrite it with whatever the arr is


//*Seventh Add transaction
//since this is a submit event we pass our event parameter e
//generate a simple function to generate a random id below when you input text and amount then it gets pushed to arr in const transaction, then add to DOM 
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {  //here we need to build an object like our dummyTransactions arr
            id: generateID(),
            text: text.value,
            amount: +amount.value //+ turns the number from a string into a #
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        //clear inputs
        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}


//*Fourth Add transactions to DOM list
//create sign variable and set it to transaction amount property, use ternary operator if < 0 to add respective signs
//create item variable to create the li elements, then add class based on value 
function addTransactionDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //add class based on value, add init function below to run it
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
        })">x</button>
    `;

    list.appendChild(item);
}

//*Sixth Update the balance, income and expense
//take the transactionsArr 
//add reduce higher order: takes in a function that takes in an acc and each item and function => take acc and append onto that current item, start at 0 toFixed method add decimal places
//we want income next, create variable and filter that takes in a function and condition is where item is > 0

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    //adds and subtratcs all totals in the DOM
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0) //need to filter everything that is considered income +
        .reduce((acc, item) => (acc += item), 0) //adds up income
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

//* Eighth Remove Transaction by id
//this function calls a function via a variable that evauluates the transaction id and checks if it is not equal to the id that's passed in
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transactions
//call localStorage using API to call setItem call it transaction, store transactions arr and stringify it first and pass in transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();


//Event listeners
form.addEventListener('submit', addTransaction)