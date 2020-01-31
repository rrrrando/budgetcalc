let storedAddRows = [];
let storedMinusRows = [];
let storedTotalSum = 0;
let description = document.getElementById("comment");
let sum = document.getElementById("sum");
const addRowBtn = document.getElementById('add-row-btn');
const type = document.querySelector('#switch-checkbox');
const totalSum = document.querySelector(".total-sum");
const showBtn = document.querySelector(".add-btn");
const wrapper = document.querySelector(".wrapper");
const showData = document.querySelector(".show-data");
const cancel = document.querySelector(".cancel");

addRowBtn.addEventListener('click', addBudgetRow);
showBtn.addEventListener('click', toggleDialog);
cancel.addEventListener('click', toggleDialog);

function toggleDialog() {
    wrapper.classList.toggle('open');
    showData.classList.toggle('open');
}

function addBudgetRow() {

    if (description.value === '' || sum.value === '') return;

    let action = type.checked ? 'expense' : 'income';

    let object = {
        description: description.value,
        sum: parseFloat(sum.value)
    };

    if (action == 'income') {
        storedTotalSum += object.sum;
        save(storedAddRows, object, "income");
    } else {
        storedTotalSum -= object.sum;
        save(storedMinusRows, object, "expense");
    }

    totalSum.innerHTML = storedTotalSum.toFixed(2);

    localStorage.setItem("total_sum", storedTotalSum);

    description.value = ''
    sum.value = ''

}

function save(objects, object, key) {

    objects.push(object);

    key = key == 'income' ? 'income' : 'expense';
    show(object, key);
}

function show(object, key) {
    let item = `
        <div class="flex py ${key === 'income' ? 'order-1' : ''} items-center">
            <div class="amount">${object.sum.toFixed(2)}</div>
            <div class="desc">${object.description}</div>
        </div>
        <div class="label"></div>
   `;

    const li = document.createElement('li');
    li.innerHTML = item;
    li.classList.add('data-item', key, 'flex');

    document.querySelector(".data").appendChild(li);
    setTimeout(function () {
        li.classList.add('show')
    }, 10);
}