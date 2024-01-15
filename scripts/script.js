// -- Variables -- //
let zwlTotal = document.getElementById("zwlTotal");
let closeSuccessMsg = document.getElementById("closeSuccessMsg");
let itemsTotal = document.getElementById("itemsTotal");
let regNum = document.getElementById("regNum");
let topUp = document.getElementById("topUp");
let topUpContainer = document.getElementById("topUpContainer");
let toppedUpAmount = document.getElementById("toppedUpAmount");
let ecocashNumber = document.getElementById("ecocashNumber");
let zwlBalance = document.getElementById("zwlBalance");
let login = document.querySelector("div#login button");
let closeModal = document.getElementById("closeModal");
let popup = document.getElementById("popup");
let amountPaid = document.getElementById("amountPaid");
let orderNum = document.getElementById("orderNum");
let plusMinus = document.getElementsByClassName("plusminus");
let minuses = document.querySelectorAll(".plusminus button:first-child");
let pluses = document.querySelectorAll(".plusminus button:last-child");
let quantities = document.querySelectorAll(".plusminus span");
let zwlPrices = document.querySelectorAll("tr td:nth-child(2)");
let purchaseComplete = document.getElementById("purchaseComplete");
let ecocash = document.getElementById("ecocash");
let payment = document.getElementById("payment");
let studentDetails = document.getElementById("studentDetails");
let signIn = document.querySelector("#popup input[type='submit']");
let regNumberInput = document.getElementById("regNumberInput");
let passInput = document.getElementById("passInput");
let errorCredentials = document.getElementById("errorCredentials");
let ecoAmountPaid = document.querySelector(".ecoAmountPaid");
let allButtons = document.querySelectorAll("button");
let goldcard = document.getElementById("goldcard");
let loginForm = document.getElementById("loginForm");
let yourOrderNumber = document.querySelectorAll(".yourOrderNumber");
let menuTable = document.getElementById("menuTable");
const labels = document.getElementsByClassName("labels");
const labelsLength = labels.length;
const allButtonsLength = allButtons.length;
const minusesLength = minuses.length;
const plusesLength = pluses.length;
const quantitiesLength = quantities.length;
const plusMinusLength =  plusMinus.length;
const zwlPricesLength = zwlPrices.length;  
const buy = document.getElementById("buy");
const zwlCurrency = document.getElementById("zwlCurrency");
const errorMsg = document.getElementById("errorMsg");
const paynow = document.getElementById("paynow");
const closePopup = document.querySelector(".closePopup");
const calcTopUp = document.getElementById("calcTopUp"); 
// -- EventListeners -- //
buy.addEventListener("click",ecoPaid);
buy.addEventListener("click",updateBalance);
buy.addEventListener("click",success);
login.addEventListener("click",loginF);
signIn.addEventListener("click",db);
closePopup.addEventListener("click",closePopupF);
closeModal.addEventListener("click",closePopupF); 
buy.addEventListener("click",loggedOutError);
closeSuccessMsg.addEventListener("click",closePayment);
topUp.addEventListener("click",displayTopUp); 
calcTopUp.addEventListener("click",topUpTheAmount);
// -- Functions and Application logic -- //
function closePayment(){
  purchaseComplete.style.display = "none";
}
function displayTopUp(){
  topUpContainer.style.display = "flex";
}
function closeEcoTopUp(){
  topUpContainer.style.display = "none";
}
function topUpTheAmount(){
  if(toppedUpAmount.value > 0 && ecocashNumber.value != ""){
    zwlBalance.innerHTML =  Math.round((parseFloat(zwlBalance.innerHTML) + parseFloat(toppedUpAmount.value))*100)/100;
    closeEcoTopUp();
    toppedUpAmount.value = "";
    ecocashNumber.value = "";
    errorMsg.style.opacity = "0";
  }
}
// -- BUY Event Listener for displaying insufficient balance message -- //
buy.addEventListener("click",()=>{
  let balance = parseFloat(zwlBalance.innerHTML);
  let total = parseFloat(zwlTotal.innerHTML.slice(1));
  console.log(balance, " balance : total ", total); 
  if(dummy == 9){
    setTimeout(()=>{
      errorMsg.innerHTML = "<i>*Select method of payment</i>";
      errorMsg.style.opacity = "1";
    },500);
    return; // display select payment method error
  }
  if(login.innerHTML != "Logout") {
    return; // to prevent insufficient message from getting displayed when logged out
  }
  if(dummy != 4){
    return; // to prevent the following code from running unless the GOLDCARD option is selected
  }
  if(balance < total){
    setTimeout(()=>{
      errorMsg.innerHTML = "<i>*Sorry, insufficient balance. Change selection</i>";
      errorMsg.style.opacity = "1";
    },10);
    return;
  }
 
});
// *** Fetching & Updating Menu Changes ***//
window.onload = ()=>{
  let toBeAdded = "";
  if(localStorage.length === 0) return;
  for(let i = 10; i < localStorage.length + 10; i++){
    if(menuTable.innerText.includes(localStorage.getItem(i))) return
    toBeAdded += localStorage.getItem(`${i}`);
  }
  menuTable.innerHTML = `
   
    <tr>
      <th>MENU</th>
      <th>ZWL$</th>
      <th>QUANTITY</th>
    </tr>
    ${toBeAdded}
    <tr>
      <th>TOTAL</th>
      <th id="zwlTotal">$0</th>
      <th id="itemsTotal">0 ITEMS</th>
    </tr> 
  `;
//  Redeclaring quantities, add, subtract, itemsTotal and zwlTotal variables so as to auto-enable addEventListeners//
zwlTotal = document.getElementById("zwlTotal"); 
itemsTotal = document.getElementById("itemsTotal");  
plusMinus = document.getElementsByClassName("plusminus");
minuses = document.querySelectorAll(".plusminus button:first-child");
pluses = document.querySelectorAll(".plusminus button:last-child");
quantities = document.querySelectorAll(".plusminus span");
zwlPrices = document.querySelectorAll("tr td:nth-child(2)");
menuTable = document.getElementById("menuTable"); 
// 
}

 
// Changing Dummy value for Login-state management
for(let i = 0; i < labelsLength; i++){
  labels[i].addEventListener("click",click);
  var dummy = 9;
  function click(){
    labels[i].classList.add("clicked");
    labels[Math.abs(i - 1)].classList.remove("clicked");
    dummy = (i + 1)*2;
  }
}
// Goldcard Balance updating function
function updateBalance(){ 
  if(login.innerHTML == "Logout" && dummy == 4){
    if(parseFloat(zwlTotal.innerHTML.slice(1)) == 0) return;
    if(parseFloat(zwlBalance.innerHTML) < parseFloat(zwlTotal.innerHTML.slice(1))){
      return;
    }
    setTimeout(()=>{
      zwlBalance.innerHTML = Math.round((parseFloat(zwlBalance.innerHTML) - parseFloat(zwlTotal.innerHTML.slice(1)))*100)/100; 
    },500);
    amountPaid.innerHTML = `ZWL${zwlTotal.innerHTML}`;   
    makeZero();  
  }
}
// Logged Out error
function loggedOutError(){
  if(dummy == 4 && login.innerHTML != "Logout"){ 
    errorMsg.innerHTML = "<i>*Login to use GOLDCARD</i>"; 
    errorMsg.style.opacity = "1";  
    setTimeout(()=>{ 
      errorMsg.style.opacity = "0";
    },2000); 
    makeZero();
    return;
  }
}
// Update ZWL Total function
function updateZWL(){
  let zwl = 0;
  for(let i = 0; i < zwlPricesLength; i++){
      zwl += (parseFloat(zwlPrices[i].innerHTML.slice(1)*10)*parseInt(quantities[i].innerHTML*10))/100;
    }
  zwlTotal.innerText = `$${zwl}`;
}
// Items Updating function
function updateItems(){
  let items = 0;
  for(let i = 0; i < quantitiesLength; i++){
    items += parseInt(quantities[i].innerHTML);
    if(items > 1 || i == 0){
      itemsTotal.innerHTML = `${parseInt(items)} ITEMS`;
    }
    else  if(items == 1){
      itemsTotal.innerHTML = `${parseInt(items)} ITEM`;
    }
  }
}
//Close Popup function
function closePopupF(){
  if(paynow.style.display != "none"){ 
    zwlTotal.innerHTML =  "$0";
    itemsTotal.innerHTML = "0 ITEMS";
    for(let i = 0; i < quantitiesLength; i++){
      quantities[i].innerHTML = 0;
    } 
  } 
  paynow.style.display = "none";
  popup.style.display = "none"; 
  document.body.style.overflowY = "scroll";
}
closePopup.addEventListener("click", closePopupF);
// Ecocash Payment Function
function ecoPaid(){
  if(dummy == 2 && zwlTotal.innerHTML.slice(1) > 0){
    ecoAmountPaid.innerHTML = `Ecocash: ZWL${zwlTotal.innerHTML}`;
    if(parseFloat(zwlTotal.innerHTML.slice(1)) > 0){
      yourOrderNumber[1].innerHTML = parseInt(1000*Math.random(0,1));
   }   
    paynow.style.display = "flex";
    errorMsg.style.display = "none";
  }
}
// Adding and Subtraction functions
for(let i = 0;i < plusMinusLength; i++){
  setTimeout(()=>{
    minuses[i].addEventListener("click",subtract)
  },100);
  function subtract(){
    errorMsg.style.opacity = "0";
    if(parseInt(quantities[i].innerHTML) > 0){  
      quantities[i].innerHTML--; 
    }
    else if(parseInt(quantities[i].innerHTML) < 1){  
      quantities[i].innerHTML = 0; 
    }
    updateZWL();
    purchaseComplete.style.display = "none";
    buy.addEventListener("click",success);
    updateItems();   
    console.log(dummy) //test
  }
  setTimeout(()=>{
    pluses[i].addEventListener("click",add)
  },100);
  function add(){
  errorMsg.style.opacity = "0";
    if(parseInt(quantities[i].innerHTML) <= 0){  
    }
    quantities[i].innerHTML++; 
    updateZWL();
    purchaseComplete.style.display = "none";
    buy.addEventListener("click",success);
    console.log(dummy) //test
    updateItems();  
  }  
}
// Zeroing function
function makeZero(){
  setTimeout(()=>{
    zwlTotal.innerHTML =  "$0";
    itemsTotal.innerHTML = "0 ITEMS";
    for(let i = 0; i < quantitiesLength; i++){
      quantities[i].innerHTML = 0;
    } 
  },600);
  return;
}
function success(){ 
    if(login.innerHTML == "Logout" && dummy == 4 && parseFloat(zwlBalance.innerHTML) > parseFloat(zwlTotal.innerHTML.slice(1)) && parseFloat(zwlTotal.innerHTML.slice(1)) > 0){  
      amountPaid.innerHTML = `ZWL${zwlTotal.innerHTML}`;
      if(parseFloat(zwlTotal.innerHTML.slice(1)) > 0){
        yourOrderNumber[0].innerHTML = parseInt(1000*Math.random(0,1));
      }  
      
      purchaseComplete.style.display = "block"; 
      buy.removeEventListener("click",success);
      console.log(dummy) //test
      makeZero();
      setTimeout(()=>{
        purchaseComplete.style.display = "none"; 
        buy.addEventListener("click",success);
        console.log(dummy) //test
      },500000000000000);  
    }
    console.log(dummy) //test
}
// JSON Database
const studentdb = `[
  {
    "name":"Jane"
    ,"surname":"Ropafadzo"
    ,"registration":"R211823N"
    ,"password":"123"
    ,"balance":"3745.57"
  }
  ,{
    "name":"Tapiwa"
    ,"surname":"Sango"
    ,"registration":"R314429J"
    ,"password":"456"
    ,"balance":"35148.07"
  }
  ,{
    "name":"Bernice"
    ,"surname":"Mano"
    ,"registration":"R231028K"
    ,"password":"789"
    ,"balance":"89735.44"
  }
]`;
let dbData = JSON.parse(studentdb);
const dbLength = dbData.length;
loginForm.onsubmit = ()=>{return false} // Prevent default form behaviour
// Authenticating/Login function
function db(){
  for(let i = 0; i < dbLength; i++){
    if(regNumberInput.value.toLowerCase()  == dbData[i].registration.toLowerCase() && passInput.value == dbData[i].password){
      regNum.innerHTML = dbData[i].registration;
      zwlBalance.innerHTML = dbData[i].balance;
      studentDetails.style.display = "flex";
      studentDetails.style.visibility = "visible";
      popup.style.display = "none";   
      login.innerHTML = "Logout";
      document.body.style.overflowY = "scroll";  
      errorMsg.style.opacity = "0";
    } 
  }
}
// Sign In form popup function
function loginF(){
  if(login.innerHTML == "Login"){ 
    popup.style.display = "block";  
    document.body.style.overflow = "hidden"; 
  }
  else if(login.innerHTML == "Logout"){
    studentDetails.style.visibility = "hidden";
    studentDetails.style.display = "none";
    login.innerHTML = "Login";
    document.body.style.overflowY = "scroll";
    purchaseComplete.style.display = "none";
  }
}
 

 