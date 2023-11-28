document.addEventListener('DOMContentLoaded', () => {
    const jsonFile = "./chocolates.json";
    let chocolates = document.querySelector('.product-cards');
    let cart = [];
    let totalQuantity = 0;
    const cartContent = document.querySelector(".cart-content");
    const cartTotal = document.querySelector(".cart-total");
    const clearCartBtn = document.querySelector(".clear-cart");
    const cartItems = document.querySelector(".cart-items");
    let cartContainer = document.getElementById('cart-container');
    const cartOverlay = document.querySelector(".cart-overlay");
    const cartDOM = document.querySelector(".cart-design");
    let cartIcon = document.getElementById('cart-btn');
    const closeCartBtn = document.querySelector("#close-cart");
    // Fetch and display chocolates
    fetch(jsonFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        let result = "";
        data.items.forEach(element => {
          result += `<div class="border w-[300px] bg-white p-4 rounded-lg shadow-md">
                      <img src=${element.src} alt="Product Image" class="aspect-w-1 aspect-h-1 object-cover rounded">
                      <span class="block mt-2 font-bold text-lg">${element.name}</span>
                      <div class="flex items-center justify-between mt-2 ">
                          <span class="text-gray-600 text-[18px]">Rs. ${element.price}</span>
                          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="addToCart('${element.name}', ${element.price})" >Add to Cart</button>
                      </div>
                  </div>`;
        });
        chocolates.innerHTML = result;
      })
      .catch((error) => {
        console.error("Error fetching the JSON file:", error);
      });
  
    // Function to add a product to the cart
    window.addToCart = function (productName, productPrice) {
      // Check if the total quantity in the cart already exceeds 8
      if (totalQuantity >= 8) {
        alert("The total quantity in the cart can't exceed 8.");
        return;
      }
  
      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.name === productName);
  
      if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity
      } else {
        // Add the product to the cart with quantity 1
        cart.push({ name: productName, price: productPrice, quantity: 1 });
      }
  
      totalQuantity += 1; // Increment total quantity
      if(totalQuantity==8){
        const buttons = document.querySelectorAll('.buttons');
        buttons.forEach((button)=>{
            button.classList.add('opacity-50')
            button.classList.add('cursor-not-allowed')
        })
      }
      renderCart();
    };
  
    // Function to remove a product from the cart
    window.removeFromCart = function (productName) {
      const index = cart.findIndex(item => item.name === productName);
  
      if (index !== -1) {
        totalQuantity -= cart[index].quantity;
        cart.splice(index, 1);
        renderCart();
      }
    };
    function showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
      }
     function hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
      }
      cartIcon.addEventListener("click", ()=> showCart());
      closeCartBtn.addEventListener("click",() => hideCart())
      clearCartBtn.addEventListener("click", ()=>{
        cart = [];
        totalQuantity = 0;
        renderCart();
      })
      // Function to render the shopping cart
    function renderCart() {
      
        let total = 0;
        cartContent.innerHTML = "";
        cart.forEach(item => {
          const div = document.createElement("div");
          div.classList.add("flex", "items-center", "justify-between", "my-6");
          div.innerHTML = `
          <div>
          <h4 class="text-base capitalize tracking-wide text-black">${item.name}</h4>
          <h4 class="text-base capitalize tracking-wide text-black">Quantity - ${item.quantity}</h4>
          </div>
          <div>
          <h4 class="text-base capitalize tracking-wide text-black">$${item.price*item.quantity}</h5>
          <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>`;
          total += item.price * item.quantity;
        	cartContent.appendChild(div);
      })
      cartTotal.innerText = total
      cartItems.innerText = totalQuantity
    }
  
  });


  