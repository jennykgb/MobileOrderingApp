import { menuArray } from "./data.js";

let orderArray = []

function menuDisplay(){
    let menuHtml = ``
    menuArray.forEach(function(item){        
        menuHtml += `
        <div class="each-item">
            <div class="emoji">
                <p class="emoji">${item.emoji}</p>
            </div>
            <div class="food-description">
                <h3>${item.name}</h3>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <div class="add-button">
                <button class="addBtn" id="addBtn" data-add="${item.id}">+</button>
            </div>
        </div>`
    })
    return menuHtml
}

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }else if(e.target.id == "orderBtn"){
        addBtnClick()
    }else if(e.target.id == "payBtn"){
        payBtnClick()
    }
    
    render()
})

function addItem(orderId){
       
    let matchingItem = menuArray.filter(function(menuItem){
        return menuItem.id == orderId
    })
    
    orderArray.push(matchingItem)

    orderSummary();
    
}

function removeItem(arrayLocation){
    orderArray.splice(arrayLocation, 1)
    orderSummary()
}

function orderSummary(){
    let orderHtml = `<h3 class="orderTitle">Your Order</h3>`
    let totalPrice = 0
    const orderContainer = document.getElementById("order-container")

    if(orderArray.length>0){
        orderContainer.style.display = "block"
    }else{
        orderContainer.style.display = "none"
    }

    orderArray.forEach(function(orderItem, index){
        totalPrice += orderItem[0].price
        orderHtml += `
        <div class="cartItem">
            <h3>${orderItem[0].name}</h3>
            <button class="removeBtn" data-remove="${index}">remove</button>
            <div class="priceLocation">
                <p class="orderPrice">$${orderItem[0].price}</p>
            </div>
        </div>
        `
    })
    
    orderHtml +=`
    <div class="orderFinal">
        <h3>Total price:</h3>
        <div class="priceLocation">
            <p class="orderPrice">$${totalPrice}</p>
        </div>
    </div>`
    
    
    document.getElementById("order-summary").innerHTML = orderHtml
}

function addBtnClick(){
    document.getElementById("payment-modal").style.display = "flex"
}

function payBtnClick(){
    const name = document.getElementById("name")
    const creditCard = document.getElementById("credit-card")
    const cvv = document.getElementById("cvv")
    const custName = document.getElementById("customer-name")


    if(name.value && creditCard.value && cvv.value){
        custName.innerText = name.value
        document.getElementById("order-container").style.display = "none"
        document.getElementById("payment-modal").style.display = "none"
        document.getElementById("thankYou-message").style.display = "flex"
    }


}



function render(){

    document.getElementById("menu-items").innerHTML = menuDisplay()
    
}

render()