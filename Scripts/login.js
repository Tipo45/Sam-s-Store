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
  document.getElementById("form").setAttribute("style", "display: none");
  document.getElementById("logout").setAttribute("style", "display: flex");
}

document.getElementById("form").addEventListener("submit", (event) => {
  //prevent default
  event.preventDefault();
  resetErrors();

  //create formdata object
  const formData = new FormData(document.getElementById("form"));

  //start loading spinner
  document.getElementById("submitButton").setAttribute("disabled", true);

  //login user
  pb.collection("store_users")
    .authWithPassword(formData.get("email"), formData.get("password"))
    .then((res) => {
      document.getElementById("submitButton").setAttribute("disabled", false);
      document.getElementById("form").setAttribute("style", "display: none");
      document.getElementById("logout").setAttribute("style", "display: flex");
      console.log(res);
    })
    .catch((error) => {
      document.getElementById("submitButton").removeAttribute("disabled");
      showError("invalid credentials");
    });
});

document.getElementById("logout").addEventListener("click", () => {
  pb.authStore.clear();
  document.getElementById("logout").setAttribute("style", "display: none");
  document.getElementById("form").setAttribute("style", "display: block");
});
