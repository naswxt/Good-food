document.addEventListener("DOMCContentLoaded", function() {
product_data = {
    1: {
            name: "Піца Маргарита",
            img: "image/Піца Маргарита.png",
            price: 180,
            about: "Тісто, томатний соус, сир Моцарелла, базилік, оливкова олія"
        },
        2: {
            name: "Піца Пепероні",
            img: "image/Піца Пепероні.jpg",
            price: 250,
            about: "Тісто, томатний соус, гостра салямі пепероні, сир Моцарелла"
        },
        3: {
            name: "Піца Капрічоза",
            img: "image/Піца Капрічоза.jpg",
            price: 260,
            about: "Тісто, сир Моцарелла, шинка, гриби, артишоки, помідори"
        },
        4: {
            name: "Піца Гавайська",
            img: "image/Піца Гавайська.jpg",
            price: 255,
            about: "Тісто, томатний або вершковий соус, сир Моцарелла, ананас, шинка або куряче м'ясо, (за бажанням): кукурудза, гриби, маслини, перець"
        },
        5: {
            name: "Піца Чотири Сири",
            img: "image/Піцка Чотири Сири.jpg",
            price: 190,
            about: "Тісто, сир Моцарелла, сир Пармезан, сир з блакитною пліснявою, сир Гауда"
        },
        6: {
            name: "Суші Філадельфія",
            img: "image/Суші Філадельфія.jpg",
            price: 250,
            about: "Рис, нори, лосось, вершковий сир, огірок, авокадо"
        },
        7: {
            name: "Суші Каліфорнія",
            img: "image/Суші Каліфорнія.jpg",
            price: 295,
            about: "Рис, норі, крабові палички, авокадо, огірок, кунжут"
        },
        8: {
            name: "Рол 'Золотий дракон'",
            img: "image/Рол Золотий Дракон.jpg",
            price: 370,
            about: "Рис, вугор, авокадо, вершковий сир, унагі соус, тунець або креветки"
        },
        9: {
            name: "Запечений рол з сніжним крабом",
            img: "image/Запечений рол з сніжним крабом.jpg",
            price: 270,
            about: "Рис, водорості, сніжний краб, соус"
        }

}
basket_data = {

}

let catalog = document.querySelector(".catalog")
let countBuy = document.querySelector(".count-buy")
let basket = document.querySelector(".basket")
let basketList = document.querySelector(".basket-list")
let delete_item = document.querySelector(".delete")
let countPrice = document.querySelector(".sum-price")



basket.addEventListener("click", function() {
    location.href = "basket.html"
})
if (delete_item){
    delete_item.addEventListener("click", function(){
        localStorage.clear()
        countPrice.innerHTML = ""
        add_basket_buy()
    })
}



function add_data(){
    for(let i = 1; i <= Object.keys(product_data).length; i += 1)
        catalog.innerHTML += `  
    <article class="product">
        <img src="${product_data[i]['img']}">
        <div class="product-name">${product_data[i]['name']}</div>
        <div class="product-about">${product_data[i]['about']}</div>
        <div class="product-list">
            <div class="product-price">${product_data[i]['price']} грн.</p>
            <a class="product-button">Купити</a>
        </div>
    </article>`
}
console.log(catalog)
if (catalog){
    add_data()
    console.log(1)
}
let productButton = document.querySelectorAll(".product-button")

//EVENT BUTTON
if (productButton.length != 0){
    for(let i = 1; i <= Object.keys(product_data).length; i += 1){
        productButton[i-1].addEventListener("click", function(){
            countBuy.innerHTML = +countBuy.innerHTML + 1
            countPrice += product_data[i]["price"]
            if ( !localStorage.getItem(i.toString())){
                localStorage.setItem(i, JSON.stringify({  name: product_data[i]["name"],
                                    img: product_data[i]["img"],
                                    price: product_data[i]["price"],
                                    count: 1
                }))

            } else{
                temp = JSON.parse(localStorage.getItem(i.toString()) || "{}")
                temp["count"] += 1 
                localStorage.setItem(i.toString(), JSON.stringify(temp))
            }
        })
    }
}

function add_basket_buy(){
    basketList.innerHTML = ""
    countPrice.innerHTML = ""
    if (localStorage.length == 0){
        basketList.innerHTML = "<h1>У вашому кошику пусто</h1>"
    } else{

        for (let key in localStorage){
            if (localStorage.hasOwnProperty(key)){
                let tempData = JSON.parse(localStorage.getItem(key) || "{}")
                basketList.innerHTML += `<article class="basket-item">
                                    <img src="${tempData["img"]}">
                                    <div class="basket-name-item">${tempData["name"]}</div>
                                    <div class="basket-count-item">${tempData["count"]}</div>
                                    <div class="basket-count-price">${tempData["price"]} грн.</div>
                                </article>`
                countPrice.innerText = +countPrice.innerText + tempData["price"]
            }}
        countPrice.innerText += " грн."
    }
}     
if (basketList){
    add_basket_buy()
}    

})






