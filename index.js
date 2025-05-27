import { menuArray } from "./data.js"

const mainSection = document.getElementById("main-section")
const orderSection = document.getElementById("order-section")
const paymentSection = document.getElementById("payment-section")

document.addEventListener("click", function(e) {
    const addId = e.target.dataset.add
    const removeId = e.target.dataset.remove

    if (addId) {
        e.preventDefault()
        renderOrder(menuArray, Number(addId))
        paymentSection.innerHTML = ""
    } else if (removeId) {
        e.preventDefault()
        removeOrder(Number(removeId))
    } else if (e.target.id === "complete-order") {
        e.preventDefault()
        renderPaymentForm()
    }
})



function renderMenu() {
    const menus = menuArray.map((menu) => {
        return `
            <div id="${menu.id}" class="menu-container">
                <div class="second-container">
                <div class="emoji">${menu.emoji}</div>
                <div class="desc-container">
                    <h2 class="menu-name">${menu.name}</h2>
                    <p class="menu-ingredient">${menu.ingredients.join(", ")}</p>
                    <h3 class="menu-price">$${menu.price}</h3>
                </div>
                </div>
                <button id="order-btn" data-add="${menu.id}">+</button>
            </div>
            <hr/>
        `
    }).join("")
    mainSection.innerHTML = menus
}

let orderArray = []

function renderOrder(arr, id) {
     arr.forEach(item => {
        if(item.id === id) {
            if(!orderArray.includes(item)) {
                orderArray.push(item)
                order(orderArray)
            }
        }
    })
}

function order(arr) {
    let menu = ""
    arr.map(i => {
             menu += `
                <div class="menu-container">
                    <div class="second-container">
                    <h3>${i.name}</h3>
                    <button class="remove-btn" data-remove="${i.id}">Remove</button>
                </div>
                <h3>$${i.price}</h3>
                </div>
            `
             })
     const price = `
                <hr/>
                <div class="menu-container">
                    <h3>Total Price</h3>
                    <h3>$${arr.reduce((t, c) => t + c.price, 0)}</h3>
                </div>`
     const header = `<h2 class="order-header">Your Order</h2>`
     const button = `<button id="complete-order">Complete Order</button>`
    if(orderArray.length === 0) {
        orderSection.innerHTML = ""
    } else {
        orderSection.innerHTML = header + menu + price + button
    }
}

document.addEventListener("submit", function (e) {
    if (e.target.id === "form") {
        const formData = new FormData(e.target);
        const customerName = formData.get("customer-name");

        paymentSection.innerHTML = `<p class="order-confirmation">Thanks, ${customerName}! Your order is on its way!</p>`;
        orderSection.innerHTML = "";
        orderArray = [];
    }
});

function renderPaymentForm() {
            paymentSection.innerHTML = `<div class="payment-info">
                <form id="form">
                    <h1>Enter card details</h1>
                    <input 
                        id="form-name"
                        name="customer-name"
                        type="text" 
                        placeholder="Enter Your Name"  
                        aria-label="full name"
                        required
                    />
                    <br/>
                    <input 
                        id="form-card"
                        name="card-number"
                        type="text" 
                        placeholder="Enter Card Number"  
                        aria-label="card number"
                        required
                    />
                    <br/>
                    <input
                        id="form-cvv"
                        name="cvv"
                        type="text"
                        placeholder="Enter CVV"
                        aria-label="cvv"
                        required
                    />
                    <br/>
                    <button id="pay-button" type="submit">Pay</button>
                    </form>
            </div>`
}

document.addEventListener("click", function (e) {
  const form = document.getElementById("form");
  
  if (form && !form.contains(e.target) && !e.target.matches("#complete-order")) {
    paymentSection.innerHTML = "";
  }
});

function removeOrder(id) {
    orderArray =  orderArray.filter(order => {
        return order.id !== id
    })
    return order(orderArray)
}

renderMenu()