const cartContainer = document.getElementById("cart--container");
const cartTotal = document.getElementById("cart--total");
const checkOutButton = document.getElementById("checkout--button");
let cartItems = [
  {
    productId: "1",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo 10000mAh Power-Bank OPB P118D",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },
  {
    productId: "2",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/2541122/1.jpg?1367",
    productTitle: "Oraimo blender",
    productPrice: 4000,
    productQuantity: 1,
    like: false,
  },
  {
    productId: "3",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/04/6146232/1.jpg?7334",
    productTitle: "Oraimo clipper",
    productPrice: 2000,
    productQuantity: 1,
    like: false,
  },
  {
    productId: "4",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/8481462/1.jpg?0299",
    productTitle: "Oraimo cord",
    productPrice: 3000,
    productQuantity: 1,
    like: false,
  },
  {
    productId: "5",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/2541122/1.jpg?1367",
    productTitle: "Oraimo blender",
    productPrice: 4000,
    productQuantity: 1,
    like: false,
  },
  {
    productId: "6",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/2541122/1.jpg?1367",
    productTitle: "Oraimo blender",
    productPrice: 5400,
    productQuantity: 1,
    like: false,
  },
  {
    productId: "7",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/2541122/1.jpg?1367",
    productTitle: "Oraimo blender",
    productPrice: 8700,
    productQuantity: 1,
    like: false,
  },
];
let totalCostOfItemsInCart;
let currencyDisplay = Intl.NumberFormat("en-US");
cartContainer.innerHTML = cartItems
  .map((item) => returnCardItems(item))
  .join("");

//step one - map over the products parameter
//a function to read cart items
function returnCardItems(products) {
  return `
  <div class="single--product d-flex bg-white rounded-3 shadow-sm px-3 py-4">
    <div>
      <img src="${products.productImage}" alt="" class="product-image" />
    </div>
    <div id="product--information" class="w-100 px-3">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="product--title fs-6 text-success">${products.productTitle}</h3>
      <div onclick="updateProductLikeness('${
        products.productId
      }')" class="like-button fs-6 small" >
  ${
    products.like === true
      ? '<i class="fa-solid fa-heart" style="color: #e41d07;"></i> liked'
      : '<i class="fa-regular fa-heart" style="color: #000000;"></i>'
  }
  
  </div>
  
    </div>
            
    <p class="product--amount fs-5 ">&#8358; ${currencyDisplay.format(
      products.productPrice
    )} </p>
    <div  class="d-flex justify-content-between align-items-center">
        <div>
          <!-- Remove Product from Cart -->
            <div class="remove--item text-danger" onclick="removeItemFromCart('${
              products.productId
            }')"><i class="fa fa-trash" aria-hidden="true"></i> Remove</div>
          </div>
          <!-- Product Quantity -->
          <div class="d-flex justify-content-end align-items-center">
          <button class="btn btn-success shadow-lg btn-sm btn-custom" onclick="decreaseQuantity('${
            products.productId
          }')">-</button>
          <div class="h2 text-success px-3">${products.productQuantity}</div>
          <button class="btn btn-success btn-sm btn-custom" onclick="increaseQuantity('${
            products.productId
          }')">+</button>
        </div>
    </div>


             
                  </div>
        </div>`;
}

//a function to increase the quantity of a particular item
function increaseQuantity(id) {
  cartItems.forEach((item) => {
    if (item.productId === id) {
      item.productQuantity += 1;
    }
  });
  //update the contents
  cartContainer.innerHTML = cartItems
    .map((item) => returnCardItems(item))
    .join(""); //'join' for removing the commas between each array elements
  calculateCartTotal();
}

//a function to decrease the quantity of a particular item
function decreaseQuantity(id) {
  cartItems.forEach((item) => {
    if (item.productQuantity === 1) {
      return;
    }
    if (item.productId === id) {
      item.productQuantity -= 1;
    }
  });
  //update the contents
  cartContainer.innerHTML = cartItems
    .map((item) => returnCardItems(item))
    .join("");
  calculateCartTotal();
}

function removeItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.productId !== id);
  calculateCartTotal();
  //update the contents
  cartContainer.innerHTML = cartItems
    .map((item) => returnCardItems(item))
    .join("");
  return cartItems;
}

function calculateCartTotal() {
  totalCostOfItemsInCart = cartItems.reduce((total, value) => {
    return total + value.productQuantity * value.productPrice;
  }, 0);
  cartTotal.innerHTML = `<span class="h3"> Total </span> <span class="h4 text-end">₦${new Intl.NumberFormat(
    "en-US"
  ).format(totalCostOfItemsInCart)}</sapn>`;
}

calculateCartTotal();

//a function to check if a customer likes a product
// a function
function updateProductLikeness(id) {
  cartItems.forEach((item) => {
    if (item.productId === id && item.like === false) {
      item.like = true;
    } else if (item.productId === id && item.like === true) {
      item.like = false;
    }
  });
  //update the contents
  cartContainer.innerHTML = cartItems
    .map((item) => returnCardItems(item))
    .join("");
}

//a function to ch
checkOutButton.addEventListener("click", proceedToCheck);
function proceedToCheck(params) {
  console.log(cartItems, totalCostOfItemsInCart);
}
