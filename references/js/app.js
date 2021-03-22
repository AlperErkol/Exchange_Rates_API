const from = document.querySelector('#amount');
const to = document.querySelector('#equals');
const firstCurrency = document.querySelector('#ihave');
const secondCurrency = document.querySelector('#buy');

const val1 = document.querySelector('.val1');
const val2 = document.querySelector('.val2');
const perc = document.querySelector('.perc');



const baseURL = "https://api.exchangeratesapi.io/latest";
const baseURLforGraph = "https://api.exchangeratesapi.io/history";

let coefficient = 0;


getCurrencyValues().then(data => {
    coefficient = data;
});
getGraph().then(data => changeUI(data));
eventListeners();





function eventListeners(){

    from.addEventListener('keyup',takeValue);
    firstCurrency.addEventListener('change',getCurrencyValuesNotEmpty);
    secondCurrency.addEventListener('change',getCurrencyValuesNotEmpty);
    firstCurrency.addEventListener('change',tuttunParaDeli);
    secondCurrency.addEventListener('change',tuttunParaDeli);


}

async function tuttunParaDeli(){

    const update = await getGraph();
    changeUI(update);

}

function calculatePercentage(oldData,newData){

    let rise = 0;

    if(oldData > newData){

        //Azalmıştır...
        let temp = (100*newData) / oldData;
        rise = temp-100;



    }else if(oldData < newData){

        //Artmıştır...
        let temp = (100*newData) / oldData;
        rise = temp-100;
        
    }else{

        //Değişmemiştir...
        let temp = (100*newData) / oldData;
        rise = 100-temp;



    }

    return rise;

}


async function changeUI(data){



    val1.innerHTML = `22 Şubat 2021 : 1 ${firstCurrency.value} = ${data.toFixed(2)} ${secondCurrency.value}`
    const now = await getCurrencyValues();
    val2.innerHTML = `22 Mart 2021 : 1 ${firstCurrency.value} = ${now.toFixed(2)} ${secondCurrency.value}`

    const rise = calculatePercentage(data,now);
    perc.innerHTML = `% ${rise.toFixed(2)}`;


}

function takeValue(){

    if(from.value === ""){
        to.value = "";
    }else{
        
        to.value = (from.value*coefficient).toFixed(2);
    }
    

}

async function getCurrencyValues(){

    const response = await fetch(baseURL+"?base="+firstCurrency.value);
    const data = await response.json();
    const parameter = secondCurrency.value;
    return data.rates[parameter];

}

async function getGraph(){
    let todayDate = new Date();
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(todayDate.getMonth()-1); 
    todayDate = todayDate.toISOString().split('T')[0];
    oneMonthAgo = oneMonthAgo.toISOString().split('T')[0];
    
    const response = await fetch(baseURLforGraph+`?start_at=${oneMonthAgo}&end_at=${todayDate}&base=${firstCurrency.value}`);
    const data = await response.json();
    const parameter = secondCurrency.value;
    return data.rates[oneMonthAgo][parameter];
    
}

async function getCurrencyValuesNotEmpty(){
    const response = await fetch(baseURL+"?base="+firstCurrency.value);
    const data = await response.json();
    const parameter = secondCurrency.value;
    coefficient = data.rates[parameter];

    takeValue();
    
}