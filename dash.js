
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingIndex = -1;

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseDate = document.getElementById("expenseDate");
const expenseTableBody = document.getElementById("expenseTableBody");

const ctx = document.getElementById("expenseChart").getContext("2d");
let expenseChart;

function updateChart() {
  // Group expenses by date and sum amounts
  const dateTotals = expenses.reduce((acc, exp) => {
    acc[exp.date] = (acc[exp.date] || 0) + parseFloat(exp.amount);
    return acc;
  }, {});

  const dates = Object.keys(dateTotals);
  const amounts = Object.values(dateTotals);

  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: dates,
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            "#4CAF50",
            "#FF7043",
            "#42A5F5",
            "#AB47BC",
            "#FFCA28",
            "#78909C",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: (context) => `₹${context.parsed}`,
          },
        },
      },
    },
  });
}

function renderExpenses() {
  expenseTableBody.innerHTML = "";
  expenses.forEach((expense, i) => {
    expenseTableBody.innerHTML += `
      <tr>
        <th>${i + 1}</th>
        <td>${expense.name}</td>
        <td>₹${expense.amount}</td>
        <td>${expense.date}</td>
        <td>
          <button class="btn-edit" onclick="editExpense(${i})" title="Edit">&#9998;</button>
          <button class="btn-delete" onclick="deleteExpense(${i})" title="Delete">&#128465;</button>
        </td>
      </tr>
    `;
  });
  updateChart();
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function resetForm() {
  expenseName.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
  editingIndex = -1;
  expenseForm.querySelector('button[type="submit"]').textContent =
    "Add Expense";
}

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = expenseName.value.trim();
  const amount = expenseAmount.value;
  const date = expenseDate.value;

  if (editingIndex === -1) {
    expenses.push({ name, amount, date });
  } else {
    expenses[editingIndex] = { name, amount, date };
  }
  renderExpenses();
  resetForm();
});

function editExpense(index) {
  const expense = expenses[index];
  expenseName.value = expense.name;
  expenseAmount.value = expense.amount;
  expenseDate.value = expense.date;
  editingIndex = index;
  expenseForm.querySelector('button[type="submit"]').textContent =
    "Update Expense";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    renderExpenses();
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

renderExpenses();
