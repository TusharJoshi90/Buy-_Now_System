document.addEventListener("DOMContentLoaded", function () {
    // Select all food item cards
    const foodItems = document.querySelectorAll(".food-item");

    foodItems.forEach(item => {
        // Create counter container
        const counterContainer = document.createElement("div");
        counterContainer.classList.add("counter-container");

        // Create decrease button
        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "−";
        decreaseBtn.classList.add("counter-btn", "decrease");

        // Create counter display
        const counterDisplay = document.createElement("span");
        counterDisplay.textContent = "0";
        counterDisplay.classList.add("counter-display");

        // Create increase button
        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.classList.add("counter-btn", "increase");

        // Append buttons to counter container
        counterContainer.appendChild(decreaseBtn);
        counterContainer.appendChild(counterDisplay);
        counterContainer.appendChild(increaseBtn);

        // Get Add to Cart button
        const addToCartBtn = item.querySelector(".add-to-cart");

        // Add event listeners for counter buttons
        let count = 0;

        increaseBtn.addEventListener("click", () => {
            count++;
            updateCounter();
        });

        decreaseBtn.addEventListener("click", () => {
            if (count > 0) count--;
            updateCounter();
        });

        // Function to update the counter display & button text
        function updateCounter() {
            counterDisplay.textContent = count;
            if (count > 0) {
                addToCartBtn.textContent = `Added (${count})`;
                addToCartBtn.style.background = "#28a745";
            } else {
                addToCartBtn.textContent = "Add to Cart";
                addToCartBtn.style.background = "#ff6600";
            }
        }

        // Insert counter above Add to Cart button
        item.insertBefore(counterContainer, addToCartBtn);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    function updateCartCount() {
        let totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Add animation class
        cartCount.classList.add("cart-count-update");
        setTimeout(() => {
            cartCount.classList.remove("cart-count-update");
        }, 200);
    }

    updateCartCount();
});
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `(${totalItems})`;
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const foodItem = button.closest(".food-item");
            const itemName = foodItem.querySelector("h3").textContent;
            const itemPrice = parseFloat(foodItem.querySelector("p").textContent.replace("₹", ""));
            const itemImage = foodItem.querySelector("img").src;

            let existingItem = cart.find((item) => item.name === itemName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    updateCartCount();
});
