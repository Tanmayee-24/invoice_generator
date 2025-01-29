document.addEventListener('DOMContentLoaded', (event) => {
    // Set the current date
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    dateElement.textContent = formattedDate;
});

const tBody = document.getElementById("table-body");

addNewRow = () => {
    const row = document.createElement("tr");
    row.className = "single-row";
    row.innerHTML = `<td><input type="text" placeholder="Product name" class="product"></td>
                    <td><input type="number" placeholder="0" name="unit" class="unit" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="price" class="price" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="amount" class="amount" disabled></td>
                    <td style="text-align: right;"><span class="material-icons" action="delete">delete_outline</span></td>`;

    tBody.insertBefore(row, tBody.lastElementChild.previousSibling);
}

document.getElementById("add-row").addEventListener("click", (e) => {
    e.preventDefault();
    addNewRow();
});

// GET INPUTS, MULTIPLY AND GET THE ITEM PRICE
getInput = () => {
    var rows = document.querySelectorAll("tr.single-row");
    rows.forEach((currentRow) => {
        var unit = currentRow.querySelector(".unit").value;
        var price = currentRow.querySelector(".price").value;

        let amount = unit * price;
        currentRow.querySelector(".amount").value = amount;
        overallSum();
    })
};

// Get the overall sum/Total
overallSum = () => {
    var arr = document.getElementsByName("amount");
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].value) {
            total += +arr[i].value;
        }
    }
    document.getElementById("total").value = total;
}

// Delete row from the table
tBody.addEventListener("click", (e) => {
    let el = e.target;
    const deleteROW = e.target.getAttribute("action");
    if (deleteROW == "delete") {
        delRow(el);
        overallSum();
    }
})

// Target row and remove from DOM
delRow = (el) => {
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
}

// Print Invoice
document.getElementById('print-button').addEventListener('click', () => {
    window.print();
});
