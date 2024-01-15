// -- Variables -- //  Msg");
let adminUserInput = document.getElementById("adminUserInput"); 
let adminID = document.getElementById("adminID"); 
let adminLogin = document.querySelector("div#adminLogin button");
let adminCloseModal = document.getElementById("adminCloseModal");
let adminPopup = document.getElementById("adminPopup"); 
let adminDetails = document.getElementById("adminDetails");
let signIn = document.querySelector("#adminPopup input[type='submit']"); 
let adminPassInput = document.getElementById("adminPassInput"); 
let forms = document.querySelectorAll("form"); 
let section = document.querySelector("section");
let loggedOutPlaceholder = document.getElementById("loggedOutPlaceholder");
let menuTable = document.querySelector("table");
let menuTableRows = document.querySelectorAll("table tr");
let menuTableRowsLength = menuTableRows.length;
let menuItemName = document.getElementById("menuItemName");
let menuItemCost = document.getElementById("menuItemCost");
let deleteMenuItems = document.querySelectorAll(".deleteMenuItem");
let deleteMenuItemsLength = deleteMenuItems.length;
let menuItemSubmit = document.getElementById("menuItemSubmit");
let itemNames = document.querySelectorAll("input.itemName");
let itemNamesLength = itemNames.length;
let itemCosts = document.querySelectorAll("input.itemCost");
let itemCostsLength = itemCosts.length;
const closePopup = document.querySelector(".closePopup");
const createAddMenuField = document.getElementById("createAddMenuField");
let dummy = 10; 
// -- EventListeners -- //   
adminLogin.addEventListener("click",adminLoginF);
signIn.addEventListener("click",dbADMIN);  
createAddMenuField.addEventListener("click",addNewTableRow);
deleteMenuItems.forEach((deleteBtn)=>{
  deleteBtn.addEventListener("click",deleteItemFunction); 
});
adminCloseModal.addEventListener("click", adminClosePopupF); 
// menuItemSubmit.addEventListener("click",submitChanges);
// -- Functions and Application logic -- // 
// forms[0].onsubmit = submitChanges();
// function submitChanges(){ 
//   for(let i = 0; i < deleteMenuItemsLength; i++){ 
//     localStorage.setItem(i + dummy,itemNames[i].value);
//     localStorage.setItem((i + dummy + 133)*2,itemCosts[i].value);  
//   }
// }
function deleteItemFunction(e){  
  e.target.parentNode.parentNode.remove(); 
  menuTableRowsLength--;
  deleteMenuItemsLength--;
  itemNamesLength--;
  itemCostsLength--; 
} 
function addNewTableRow(){
  if(menuTable.innerHTML.includes(menuItemName.value)) return;
  if(menuItemName.value == "" || !isNaN(menuItemName.value)|| menuItemCost.value == "" || isNaN(menuItemCost.value)) return;
  menuTable.insertRow(menuTableRowsLength - 2).innerHTML =   `
    	<tr>
        <td><input type="text" value="${menuItemName.value}"></td>
        <td><input type="number" value="${menuItemCost.value}"></td> 
        <td><span class="deleteMenuItem">+</span></td>
      </tr> 
    `; 
  
    localStorage.setItem(dummy,`
      <tr>
        <td>${menuItemName.value}</td>
        <td>$${menuItemCost.value}</td>
        <td class="plusminus"><button>-</button><span>0</span><button>+</button></td>
      </tr>
      `)
    dummy++;
    menuTableRowsLength++;
    deleteMenuItemsLength++;
    itemNamesLength++;
    itemCostsLength++;  
    console.log(menuTableRowsLength,deleteMenuItemsLength);
    menuItemName.value = "";
    menuItemCost.value = "";
    deleteMenuItems = document.querySelectorAll(".deleteMenuItem");
    deleteMenuItemsLength = deleteMenuItems.length;
    deleteMenuItems.forEach((deleteBtn)=>{
      deleteBtn.addEventListener("click",deleteItemFunction); 
    });
    for(let i = 0; i < deleteMenuItemsLength; i++){  
      localStorage.setItem(i + dummy,`
      <tr>
        <td>${itemNames[i].value}</td>
        <td>$${itemCosts[i].value}</td>
        <td class="plusminus"><button>-</button><span>0</span><button>+</button></td>
      </tr>
      `)
    }
    
    // console.log(menuItemCost.value,menuTableRows[menuTableRowsLength - 3].innerHTML)
}
function adminClosePopupF(){
  adminPopup.style.display = "none"; 
  document.body.style.overflowY = "scroll";

}  
// JSON Database 
const adminDB = `[
  {
    "name":"Jane"
    ,"surname":"Ropafadzo"
    ,"userID":"1244567890"
    ,"password":"123" 
  },
  {
    "name":"Paul"
    ,"surname":"Liboni"
    ,"userID":"2425544421"
    ,"password":"456" 
  }
]`; 
let adminDBdata = JSON.parse(adminDB);
const adminDBLength = adminDBdata.length;
forms.forEach((form)=>{
  form.onsubmit = ()=>{return false} 
}); // Prevent default form behaviour on both Login and Menu forms

// Authenticating/Login function
function dbADMIN(){
  for(let i = 0; i < adminDBLength; i++){
    let adminUserName = adminDBdata[i].userID;
    if(adminUserInput.value.toLowerCase()  === adminUserName.toLowerCase() && adminPassInput.value === adminDBdata[i].password){
      adminName.innerHTML = adminDBdata[i].name + " " + adminDBdata[i].surname;
      adminID.innerHTML = adminDBdata[i].userID;
      adminDetails.style.display = "flex";
      adminDetails.style.visibility = "visible";
      adminPopup.style.display = "none";   
      adminLogin.innerHTML = "Logout";
      document.body.style.overflowY = "scroll"; 
      loggedOutPlaceholder.style.display = "none"; 
      section.style.display = "flex";
    } 
  }
}
// Sign In form popup function
function adminLoginF(){
  if(adminLogin.innerHTML == "Login"){ 
    adminPopup.style.display = "block";  
    document.body.style.overflow = "hidden"; 
  }
  else if(adminLogin.innerHTML == "Logout"){
    adminDetails.style.visibility = "hidden";
    adminDetails.style.display = "none";
    adminLogin.innerHTML = "Login";
    document.body.style.overflowY = "scroll"; 
    section.style.display = "none";
    loggedOutPlaceholder.style.display = "flex";
  }
}
 

 