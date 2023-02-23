function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const close = document.querySelector(".close");
const btnClose = document.querySelector(".btn-close")
const modalValide = document.querySelector(".valide");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const input = document.querySelectorAll("input");
const inputDate = document.querySelector("#birthdate");
const form = document.forms.reserve;
const regexNumber = /\d/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var valide = true;
var checkLocation = false;
var messages = {
  taille: '2 caractères minimum',
  chiffres: 'il ne peut pas y avoir de chiffre',
  vide: 'Champ obligatoire',
  email: 'email non valide',
  location: 'veuillez choisir un endroit',
  approuve: 'Vous devez accepter les conditions d\'utilisations'
}

// date
inputDate.max = new Date().toISOString().split("T")[0];
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  form.reset();
  modalbg.style.display = "block";
  form.style.display = 'block';
  modalValide.style.display = 'none';
}
// close
close.addEventListener('click', ()=>{modalbg.style.display = "none"});
btnClose.addEventListener('click', ()=>{modalbg.style.display = "none"});


function validate() {
  checkLocation = false;
  for (let i = 0; i < formData.length; i++) {
    formData[i].dataset.errorVisible = false;
    valide = true;
  }
  for (let i = 0; i < input.length; i++) {
    var nameInput = input[i].name;
    var values = input[i].value;
    console.log(nameInput, values);
    switch (nameInput) {
      case 'first':
      case 'last':
      if (values.length < 3){
        errorMessage(messages.taille, formData[i])
      } else if (regexNumber.test(values)){
        errorMessage(messages.chiffres, formData[i])
      }
      break;
      case 'email':
        if (!regexEmail.test(values)){
          errorMessage(messages.email, formData[i])
        }
      break;
      case 'birthdate':
      case 'quantity':
        if (values === ""){
          errorMessage(messages.vide, formData[i])
        }
      break;
      case 'location':
        if (input[i].checked){
          checkLocation = true;
        }
        if (values == "Portland" && checkLocation === false) {
          errorMessage(messages.location, formData[5])
          valide = false;
        }
      break;
      case 'approuve':
        if (!input[i].checked){
          errorMessage(messages.approuve, formData[6])
          valide = false;
        }
      break;
    }
    
  }
  if (valide == true) {
    form.style.display = 'none';
    modalValide.style.display = 'block';
  }

  return false;
}

// function pour empêcher certains caractères
function numericOnly(e){
  console.log("e", e.key);
  if(e.key == '-' || e.key == '+' || e.key == 'e' || e.key == 'E' || e.key == ','){
    e.preventDefault();
  }
}
// function message d'erreur
function errorMessage(message, formData){
  formData.dataset.error = message;
  formData.dataset.errorVisible = true;
  valide = false;
}