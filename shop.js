//Globala variablar
let itemsArray = [];
let totalPrice = 0;
let itemsInCart = [];
const container = document.getElementById("products");
const url = "https://mock-data-api.firebaseio.com/webb21/products.json";

// Hämtar data fran API:t
function getItems() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderAndStoreAllItems(data);
    });
}

// Renderar alla produkter
function renderAndStoreAllItems(data) {
  data.forEach((item) => {
    itemsArray.push(item);
    renderItem(item);
  });
}

function renderItem(item) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", item.name);

  const name = document.createElement("h2");
  name.innerText = item.name;

  const description = document.createElement("p");
  description.innerText = item.description;

  const price = document.createElement("p");
  price.innerText = `Price: ${item.price} sek`;

  const rating = document.createElement("p");
  rating.innerText = `Rating: ${item.rating}`;

  const stock = document.createElement("p");
  stock.innerText = `Stock: ${item.rating}`;

  const image = document.createElement("img");
  image.src = item.images[0].src.small;
  image.width = 400;
  image.alt = item.images[0].alt;
  /*image.addEventListener("click", event => {
            addItemToCart(item)
            renderPrice(item)
            renderAll(item)
        })*/

  const button = document.createElement("button");
  button.innerText = "Köp";
  button.addEventListener("click", () => {
    addItemToCart(item);
    renderPrice(item);
    rendershoppingCart(item);
  });

  wrapper.appendChild(name);
  wrapper.appendChild(image);
  wrapper.appendChild(description);
  wrapper.appendChild(price);
  wrapper.appendChild(rating);
  wrapper.appendChild(stock);
  wrapper.appendChild(button);

  container.appendChild(wrapper);
}

getItems();

// Adderar priset pa valda produkter och sparar i array
function addItemToCart(item) {
  totalPrice += item.price;
  itemsInCart.push(item);
  return itemsInCart;
}

// Renderar totala priset
function renderPrice() {
  document.getElementById("totalPrice").innerText = `Totalt: ${totalPrice} sek`;
}

// Renderar produkter i varukorgen
function rendershoppingCart() {
    itemsInCart.forEach(() => {
    const shoppingCart = document.getElementById("shoppingCart");
    shoppingCart.innerText = "";
    let transaction = document.createElement("p");

    itemsInCart.forEach((item) => {
      let message = document.createElement("p");
      message.innerText = `${item.name} - ${item.price} sek`;
      transaction.appendChild(message);
    });

    shoppingCart.appendChild(transaction);
  });
}

// Filtrerar bort produkter baserat på input
function filterItems() {
  const filterInput = document.getElementById("filter").value;
  itemsArray.forEach((item) => {
    if (item.rating < filterInput || item.rating == null) {
      document.getElementById(item.name).style.display = "none";
    } else {
      document.getElementById(item.name).style.display = "block";
    }
  });
}
