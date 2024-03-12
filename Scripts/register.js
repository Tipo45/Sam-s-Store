import PocketBase from "../node_modules/pocketbase/dist/pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

function resetErrors() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach(function (element) {
    element.innerText = "";
  });
}

function showError(errorMessage) {
  const errorElement = document.getElementById(`Error`);
  errorElement.innerText = errorMessage;
}

if (pb.authStore.isValid) {
  location.replace("http://127.0.0.1:5500/index.html");
}

document.getElementById("form").addEventListener("submit", (event) => {
  //prevent default
  event.preventDefault();
  resetErrors();

  //create formdata object
  const formData = new FormData(document.getElementById("form"));

  //start loading spinner
  document.getElementById("submitButton").setAttribute("disabled", true);

  //create user
  pb.collection("store_users")
    .create({
      username: formData.get("name"),
      email: formData.get("email"),
      emailVisibility: true,
      password: formData.get("password"),
      passwordConfirm: formData.get("confirmPassword"),
      cart: JSON.stringify([]),
      billing_information: JSON.stringify({}),
    })
    .then(() => {
      document.getElementById("submitButton").setAttribute("disabled", false);

      location.replace("http://127.0.0.1:5500/pages/login/login.html");
    })
    .catch((error) => {
      document.getElementById("submitButton").removeAttribute("disabled");
      showError("invalid credentials");
      // console.log(error.response.data);
    });
});
