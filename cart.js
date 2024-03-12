import PocketBase from "../node_modules/pocketbase/dist/pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");

export const getAll = async () => {
  const fullList = await pb.collection("store").getFullList();
  return fullList;
};

export const addToCart = async (item) => {
  const data = {
    item: item,
  };

  const newList = await pb.collection("cart").create(data);
  return newList;
};

export const deleteFromCart = () => {
  const cartItems = document.querySelectorAll("#cartItem_number > p");
  const itemToDelete = document.getElementById("delete_input").value

  cartItems.forEach((elem, num) => {
    if( elem.innerHTML.toLocaleLowerCase() === itemToDelete.toLocaleLowerCase() ) {
      document.getElementById("cartItem_number").removeChild(elem);
      document.getElementById("delete_input").value = " ";
    }
  });
};

export const submit = () => {
  addToCart(document.getElementById("item_input").value).then((newList) => {
    const text = document.createTextNode(newList.item);
    const node = document.createElement("p");
    node.appendChild(text);
    document.getElementById("cartItem_number").appendChild(node);
  });
  document.getElementById("item_input").value = " ";
};
