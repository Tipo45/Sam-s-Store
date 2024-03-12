import PocketBase from "../node_modules/pocketbase/dist/pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

document.getElementById("payButton").addEventListener("click", function () {
  validateCardDetails();
});

function validateCardDetails() {
  var cardHolder = document.getElementById("card_holder").value;
  var cardNumber = document.getElementById("card_number").value;
  var expiryDate = document.getElementById("expiry_date").value;
  var cvv = document.getElementById("cvv").value;

  clearErrors();

  if (cardHolder.length === 0) {
    showError("cardHolderError", "Card Holder is required");
  }

  if (cardNumber.length !== 19) {
    showError("cardNumberError", "Card Number must be 16 digits");
  }

  if (expiryDate.length !== 7) {
    showError("expiryDateError", "Expiry Date must be in MM / YY format");
  }

  if (cvv.length !== 3) {
    showError("cvvError", "CVV must be 3 digits");
  }

  if (
    cardHolder.length > 0 &&
    cardNumber.length === 19 &&
    expiryDate.length === 7 &&
    cvv.length === 3
  ) {
    pb.collection("store_users")
      .update(pb.authStore.model.id, {
        cart: JSON.stringify([]),
      })
      .then(() => {
        location.replace("http://127.0.0.1:5500/index.html");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function showError(id, message) {
  var errorElement = document.getElementById(id);
  errorElement.innerHTML = message;
}

function clearErrors() {
  var errorElements = document.getElementsByClassName("error");
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].innerHTML = "";
  }
}
