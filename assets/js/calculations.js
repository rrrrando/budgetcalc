let storedAddRows = [];
let storedMinusRows = [];
let storedTotalSum = 0;
const addRowBtn = document.getElementById('add-row-btn');

addRowBtn.addEventListener('click', addBudgetRow);

// displayLocalStorage();

function addBudgetRow() {

//    console.log(123);

//    let alert = document.querySelector("#alert");
//    alert.style.display = 'none';

    getLocalStorageData();

    let description = document.getElementById("comment").value;
    let sum = +document.getElementById("sum").value;

    console.log(description);
    console.log(sum);

    // if (description == "") {
    //     alert.style.display = 'block';
    //     alert.innerHTML = 'Description is empty';
    //     return;
    // }

    // if (isNaN(sum) || typeof sum != 'number' || sum == 0) {
    //     alert.style.display = 'block';
    //     alert.innerHTML = 'Sum is empty or 0';
    //     return;
    // }

    let action = document.querySelector('#switch-checkbox').checked ? 'expense' : 'income';
    console.log(action);

    let object = {
        description: description,
        sum: sum
    };

    if (action == 'income') {
        storedTotalSum += sum;
        save(storedAddRows, object, "income");
    } else {
        storedTotalSum -= sum;
        save(storedMinusRows, object, "expense");
    }

    document.getElementById("sum_total").innerHTML = storedTotalSum;

    localStorage.setItem("total_sum", storedTotalSum);

}

function displayLocalStorage() {

    getLocalStorageData();

    for (let row in storedAddRows) {
        let object = storedAddRows[row];
        show(object, 'expense');
    }

    for (let row in storedMinusRows) {
        let object = storedMinusRows[row];
        show(object, 'income');
    }

    document.querySelector(".total-sum").innerHTML = storedTotalSum;

}

function save(objects, object, key) {

    objects.push(object);
    localStorage.setItem(key, JSON.stringify(objects));

    key = key == 'income' ? 'income' : 'expense';
    show(object, key);
}

function show(object, key) {
    let item = `
<li class="data-item ${key} flex">
    <div class="flex py items-center">
        <div class="amount">${object.sum}</div>
        <div class="desc">${object.description}</div>
    </div>
    <div class="label"></div>
</li>`;


    document.querySelector(".data").innerHTML += item;
}

function getLocalStorageData() {

    storedAddRows = JSON.parse(localStorage.getItem("add_rows"));
    storedAddRows = storedAddRows == null ? [] : storedAddRows;

    storedMinusRows = JSON.parse(localStorage.getItem("minus_rows"));
    storedMinusRows = storedMinusRows == null ? [] : storedMinusRows;

    storedTotalSum = localStorage.getItem("total_sum");
    storedTotalSum = storedTotalSum == null ? 0 : parseFloat(localStorage.getItem("total_sum"));
}

function clearLocalStorage() {
    localStorage.clear();
    document.querySelector("income").innerHTML = "";
    document.querySelector("expense").innerHTML = "";
}