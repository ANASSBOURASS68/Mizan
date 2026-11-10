export async function getGold() {
    try{
        const res = await fetch("https://xaus.com/api/v1/spot");
        const data = await res.json();
        return data;
        // console.log(Object.keys(data));
        // console.log(data.spot_usd_oz);
        // console.log(data.silver_usd_oz);
        // console.log(data.updated_at);
        // console.log(data.data_state);
        // console.log(data.per_gram_usd);
        // console.log(data.silver_per_gram_usd);
    }
    catch(error){
        console.log(error.message);

    }
}


