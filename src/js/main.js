import { getGold } from "./api.js";

let pricescontainer = document.getElementById("prices-container");

const data = await getGold();

function displayPrices(data){
    let metals = [
        {
            name:"Gold",
            price:data.per_gram_usd,
            currency:"USD"
        },
        {
            name:"Silver",
            price:data.silver_usd_oz/31.1035,
            currency:"USD"
        }
    ]
    metals.forEach(product =>{
        const card = document.createElement("div")
        card.classList.add("card");

        let title = document.createElement("h2")
        title.classList.add("name",product.name.toLocaleLowerCase())
        title.textContent=product.name;

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = product.price.toFixed(3);

        const currency = document.createElement("span");
        currency.classList.add("currency");
        currency.textContent = `${product.currency} / gram`;

        card.append(title, price, currency);
        pricescontainer.appendChild(card)
    })

}


displayPrices(data)
