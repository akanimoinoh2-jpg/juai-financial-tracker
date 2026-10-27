let transactions = JSON.parse(localStorage.getItem('juai_finance')) || [];
let loggedIn = false;
let budget = parseFloat(localStorage.getItem('juai_budget')) || 0;

function login(){
const user = document.getElementById('username').value;
const pass = document.getElementById('password').value;

if(user && pass){
loggedIn = true;
document.getElementById('loginSection').classList.add('hidden');
document.getElementById('dashboard').classList.remove('hidden');
showSection('dashboard');
render();
}else{
alert('Enter credentials');
}
}

function logout(){
loggedIn = false;
document.getElementById('loginSection').classList.remove('hidden');
document.getElementById('dashboard').classList.add('hidden');
}

function showSection(id){
document.querySelectorAll('section').forEach(s=>s.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');
}

function setBudget(){
budget = parseFloat(document.getElementById('budgetInput').value);
localStorage.setItem('juai_budget',budget);
render();
}

function addTransaction(){
const title = document.getElementById('title').value;
const amount = parseFloat(document.getElementById('amount').value);
const type = document.getElementById('type').value;

if(!title || !amount) return alert('Fill all fields');

transactions.push({title,amount,type});
localStorage.setItem('juai_finance',JSON.stringify(transactions));

render();
showSection('dashboard');
}

function deleteTransaction(index){
transactions.splice(index,1);
localStorage.setItem('juai_finance',JSON.stringify(transactions));
render();
}

function render(){
let income = 0, expense = 0;
const list = document.getElementById('transactionList');
list.innerHTML = '';

transactions.forEach((t,i)=>{
if(t.type==='income') income += t.amount;
else expense += t.amount;

list.innerHTML += `
<tr>
<td>${t.title}</td>
<td>₦${t.amount}</td>
<td>${t.type}</td>
<td><button class='btn btn-danger' onclick='deleteTransaction(${i})'>Delete</button></td>
</tr>`;
});

document.getElementById('income').innerText = '₦' + income;
document.getElementById('expense').innerText = '₦' + expense;
document.getElementById('balance').innerText = '₦' + (income - expense);

// Budget alert system
const alertBox = document.getElementById('alertBox');
alertBox.innerHTML = '';

if(budget > 0){
const remaining = budget - expense;

document.getElementById('budgetStatus').innerText = `Budget: ₦${budget} | Remaining: ₦${remaining}`;

if(expense > budget){
alertBox.innerHTML = `<div class='alert'>⚠ You have exceeded your budget!</div>`;
} else if(remaining <= budget * 0.2){
alertBox.innerHTML = `<div class='alert'>⚠ Warning: You are close to your budget limit!</div>`;
}
}
}

render();