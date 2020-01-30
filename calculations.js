
function addBudgetRow() {

    let sum_total_container = document.querySelector('#sum_total');
    var total_sum = parseFloat(sum_total_container.dataset.sum);

    let description = document.getElementById("description").value;
    let sum = parseFloat(document.getElementById("sum").value);

    let action = document.querySelector('input[name="action"]:checked').value;

    var node = document.createElement("li");
    var textnode = document.createTextNode("description | " + sum);
    node.appendChild(textnode);

    if (action == 'add') {
        total_sum += sum;
        document.getElementById("add").appendChild(node);
    } else {
        total_sum -= sum;
        document.getElementById("minus").appendChild(node);

    }

    document.getElementById("sum_total").innerHTML = total_sum;
    sum_total_container.dataset.sum = total_sum;

}