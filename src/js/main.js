import { getGold } from "./api.js";

let pricescontainer = document.getElementById("prices-container");
let requeststatus = document.getElementById("request-status");

requeststatus.textContent = "Chargement des prix...";
const data = await getGold();


function displayPrices(data){
    let previousPrice = JSON.parse(localStorage.getItem("metal-prices")) || []
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
        let previousMetal =   previousPrice.find(element => element.name === product.name)
        
        let displayPourcentage = document.createElement("p");
        displayPourcentage.classList.add("purcentage");


        let variation = 0;
        let variationTexte;
        let pourcentage ;
        let pourcentageTexte;
        let fleche = "—";

        if (previousMetal) {
        variation = product.price - previousMetal.price;
        variationTexte = variation.toFixed(3) +" USD";
        pourcentage=(variation/previousMetal.price)*100
        pourcentageTexte = pourcentage.toFixed(2) +"%"
            
        
        if (variation > 0) {
        fleche = "↑";
        displayPourcentage.classList.add("up");
        }else if (variation < 0) {
        fleche = "↓";
        displayPourcentage.classList.add("down");
        } else {
        fleche = "→";
        displayPourcentage.classList.add("stable");
        }
        }else {
        variationTexte = "Non disponible";
        pourcentageTexte = "Non disponible";
        }

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

        const update = document.createElement("p");
        update.classList.add("update-at")
        update.textContent= new Date(data.updated_at).toLocaleString("fr-FR");

        let displayVariation = document.createElement("p")
        displayVariation.classList.add("variation")
        displayVariation.textContent=  variationTexte


        displayPourcentage.textContent= fleche + " " +pourcentageTexte;

        card.append(title, price, currency, displayVariation, displayPourcentage, update);
        pricescontainer.appendChild(card)
    })
    localStorage.setItem("metal-prices", JSON.stringify(metals));


    requeststatus.textContent="Prix actualisés avec succès";

}




if(data == undefined){
    requeststatus.textContent="Erreur lors du chargement des prix. Veuillez réessayer"
}else{
    displayPrices(data)

}


