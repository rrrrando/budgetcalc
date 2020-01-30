var storedAddRows = [];
var storedMinusRows = [];
var storedTotalSum = 0;

displayLocalStorage();

function addBudgetRow() {

    getLocalStorageData();

    let description = document.getElementById("description").value;
    let sum = parseFloat(document.getElementById("sum").value);

    let action = document.querySelector('input[name="action"]:checked').value;

    let object = {
        description: description,
        sum: sum
    };

    if (action == 'add') {
        storedTotalSum += sum;
        save(storedAddRows, object, "add_rows");
    } else {
        storedTotalSum -= sum;
        save(storedMinusRows, object, "minus_rows");
    }

    document.getElementById("sum_total").innerHTML = storedTotalSum;

    localStorage.setItem("total_sum", storedTotalSum);

}

function displayLocalStorage() {

    getLocalStorageData();

    for (let row in storedAddRows) {
        let object = storedAddRows[row];
        show(object, '#add');
    }

    for (let row in storedMinusRows) {
        let object = storedMinusRows[row];
        show(object, '#minus');
    }

    document.getElementById("sum_total").innerHTML = storedTotalSum;

}

function save(objects, object, key) {

    objects.push(object);
    localStorage.setItem(key, JSON.stringify(objects));

    key = key == 'add_rows' ? '#add' : '#minus';
    show(object, key);
}

function show(object, key) {
    let node = document.createElement("li");
    let row = document.createTextNode(object.description + " | " + object.sum);
    node.appendChild(row);
    document.querySelector(key).appendChild(node);
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
}