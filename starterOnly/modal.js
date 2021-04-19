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
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
//TODO #1 close modal const
const modalCloseBtn = document.querySelectorAll(".arrow-close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  window.scrollTo(0, 0);
  modalbg.style.display = "block";
}
// close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

//TODO #1 close modal
function closeModal() {
  modalbg.style.display = "none";
  modalbg2.style.displat = "none";
}
//TODO #2 Implémenter entrées formulaire
// Link label and inputs with for and id et rendre l'entrée obligatoire avec required
// validate the data written in the form
document.getElementsById("btn-submit").addEventListener("click"),
  function validate(event) {
    event.preventDefault();
    // recuperer les champs, acceder a un element contenu dans le formulaire, puis dans sa specificité et ensuite sa Valeur
    var first = document.forms["reserve"]["first"];
    var last = document.forms["reserve"]["last"];
    var email = document.forms["reserve"]["email"];
    var birthdate = document.forms["reserve"]["birthdate"];
    var quantity = document.forms["reserve"]["quantity"];
    var cities = document.querySelectorAll('input[type="radio"]');
    var acceptedPolicy = document.forms["reserve"]["checkbox1"];
    var problem = 0;
    var today = new Date();
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //validation of the fisrtName
    // si first n'as pas de champ OU que first contient moin de 2 caractéres, problem = errorMessage
    if (first.value.trim().length < 2) {
      problem = errorMessage(
        "errorFirst",
        "Veuillez entrer 2 caractéres ou plus pour le champ du prénom.",
        problem
      );
      first.style.borderColor = "red";
    } else {
      document.getElementById("errorFirst").innerHTML = "";
      first.style.borderColor = "transparent";
    }

    //Validation of the lastName

    if (last.value.trim().length < 2) {
      problem = errorMessage(
        "errorLast",
        "veuillez entrer 2 caractéres ou plus pour le champ du nom",
        problem
      );
      last.style.borderColor = "red";
    } else {
      document.getElementById("errorLast").innerHTML = "";
      last.style.borderColor = "transparent";
    }

    //Validation of the email address

    if (!email_regex.test(email.value.trim())) {
      problem = errorMessage(
        "errorEmail",
        "Veuillez entrez une adresse mail valide",
        problem
      );
      email.style.borderColor = "red";
    } else {
      document.getElementById("errorEmail").innerHTML = "";
      email.style.borderColor = "transparent";
    }

    //Validation of the birthdate

    if (
      birthdate.value == "" ||
      +birthdate.value.slice(0, 4) < today.getFullYear() - 100 ||
      +birthdate.value.slice(0, 4) > today.getFullYear() - 10
    ) {
      problem = errorMessage(
        "errorBirthdate",
        "Vous devez entrer votre date de naissance.",
        problem
      );
      birthdate.style.borderColor = "red";
    } else {
      document.getElementById("errorBirthdate").innerHTML = "";
      birthdate.style.borderColor = "transparent";
    }

    //Validation of the number of previous participations

    if (
      quantity.value.trim() == "" ||
      +quantity.value.trim() > 99 ||
      +quantity.value.trim() < 0
    ) {
      problem = errorMessage(
        "errorQuantity",
        "Veuillez entrer un nombre entre 0 et 99 pour ce champ.",
        problem
      );
      quantity.style.borderColor = "red";
    } else {
      document.getElementById("errorQuantity").innerHTML = "";
      quantity.style.borderColor = "transparent";
    }
    //Validation of the city

    var i = 0;
    var IsChecked = false;
    while (i < cities.length) {
      if (cities[i].checked) {
        IsChecked = true;
        break;
      } else {
        i++;
      }
    }
    if (IsChecked == false) {
      problem = errorMessage(
        "errorCity",
        "<br>Vous devez choisir une option.",
        problem
      );
    } else {
      document.getElementById("errorCity").innerHTML = "";
    }

    //Validation of the privacy policy
    if (!acceptedPolicy.checked) {
      problem = errorMessage(
        "errorAcceptedPolicy",
        "<br>Vous devez vérifier que vous acceptez les termes et conditions.",
        problem
      );
    } else {
      document.getElementById("errorAcceptedPolicy").innerHTML = "";
    }

    //Validation of the form if everything is ok

    if (problem === 0) {
      document.forms["reserve"].reset();
      document.querySelector(".bground2").style.display = "block";
      document.querySelector(".bground").style.display = "none";
    }
  };

//Ecrire un message erreur quand le form n'est pas correctement remplit.
function errorMessage(element, message, errorCounter) {
  document.getElementById(element).innerHTML = message;
  errorCounter++;
  return errorCounter;
}
