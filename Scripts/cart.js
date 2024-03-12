import PocketBase from "../node_modules/pocketbase/dist/pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

if (pb.authStore.isValid) {
  pb.collection("store_users")
    .getOne(pb.authStore.model.id)
    .then((userModel) => {
      if (pb.authStore.isValid) {
        userModel.cart.forEach((cartItem) => {
          document.getElementById("cart-items").insertAdjacentHTML(
            "beforeend",
            `
          <div id="item_${cartItem.id}">
            <span>${cartItem.product} (Quantity: ${cartItem.quantity})</span>
            <span>Price - $${cartItem.price}</span>
            <span>Total Amount - $${cartItem.price * cartItem.quantity}</span>
            <button class="removeCartButton" data-id="${
              cartItem.id
            }" data-product="${cartItem.product}" >Remove</button>
          </div>
        `
          );
        });
      }
    })
    .then(() => {
      document.querySelectorAll(".removeCartButton").forEach((button) => {
        button.addEventListener("click", (event) => {
          if (pb.authStore.isValid) {
            pb.collection("store_users")
              .update(pb.authStore.model.id, {
                cart: JSON.stringify(
                  [...pb.authStore.model.cart].filter((cartItem) => {
                    return cartItem.id !== event.target.getAttribute("data-id");
                  })
                ),
              })
              .then(() => {
                document
                  .getElementById("cart-items")
                  .removeChild(
                    document.getElementById(
                      `item_${event.target.getAttribute("data-product")}`
                    )
                  );
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("you must be logged in to edit cart");
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
