import PocketBase from "../node_modules/pocketbase/dist/pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

pb.collection("store")
  .getFullList()
  .then((data) => {
    data.forEach((datum) => {
      const card = `
      <div class="row" >
        <img src="../Images/${datum.item_image_name}.jpg" alt="" />
        <div class="main-row">
          <div class="row-text">
            <h6>${datum.item_name}</h6>
          </div>
        </div>
        <h5>$${datum.item_price}</h5>
        <h3 data-id="${datum.id}" class="add-to-cart-button" data-product="Trousers">
          Add To Cart
        </h3>
      </div>
      `;

      document.getElementById("store").insertAdjacentHTML("beforeend", card);
    });
  })
  .then(() => {
    document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        if (pb.authStore.isValid) {
          pb.collection("store")
            .getOne(event.target.getAttribute("data-id"))
            .then((data) => {
              if (
                ![...pb.authStore.model.cart]
                  .map((cartItem) => {
                    return cartItem.id;
                  })
                  .includes(data.id)
              ) {
                pb.collection("store_users")
                  .update(pb.authStore.model.id, {
                    cart: JSON.stringify([
                      ...pb.authStore.model.cart,
                      {
                        product: data.item_name,
                        price: data.item_price,
                        quantity: 1,
                        id: data.id,
                      },
                    ]),
                  })
                  .then((newData) => {
                    const [currentItem] = [...newData.cart].filter(
                      (item) => item.id === data.id
                    );
                    document.getElementById("cart-items").insertAdjacentHTML(
                      "beforeend",
                      `
                  <div id="item_${currentItem.id}">
                    <span>${currentItem.product} (Quantity: ${
                        currentItem.quantity
                      })</span>
                    <span>Price - $${currentItem.price}</span>
                    <span>Total Amount - $${
                      currentItem.price * currentItem.quantity
                    }</span>
                    <button class="removeCartButton" data-id="${
                      currentItem.id
                    }" data-product="${currentItem.product}" >Remove</button>
                  </div>
                  `
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                pb.collection("store_users")
                  .update(pb.authStore.model.id, {
                    cart: JSON.stringify([
                      ...pb.authStore.model.cart.map((item) => {
                        if (item.id === data.id) {
                          return {
                            product: item.product,
                            price: item.price,
                            id: item.id,
                            quantity: item.quantity + 1,
                          };
                        } else {
                          return item;
                        }
                      }),
                    ]),
                  })
                  .then((newData) => {
                    const [currentItem] = [...newData.cart].filter(
                      (item) => item.id === data.id
                    );
                    document.getElementById(
                      `item_${currentItem.id}`
                    ).innerHTML = `
                  <span>${currentItem.product} (Quantity: ${
                      currentItem.quantity
                    })</span>
                  <span>Price - $${currentItem.price}</span>
                  <span>Total Amount - $${
                    currentItem.price * currentItem.quantity
                  }</span>
                  <button class="removeCartButton" data-id="${
                    currentItem.id
                  }" data-product="${currentItem.product}" >Remove</button>
                `;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("you must be logged in to add to cart");
        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
