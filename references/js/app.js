const from = document.querySelector('#amount');
const to = document.querySelector('#equals');
const firstCurrency = document.querySelector('#ihave');
const secondCurrency = document.querySelector('#buy');

const val1 = document.querySelector('.val1');
const val2 = document.querySelector('.val2');
const perc = document.querySelector('.perc');

const currentDate = document.getElementById('val1_info');
const oneMonthAgo = document.getElementById('val2_info');



const baseURL = "https://v6.exchangerate-api.com/v6/";

const API_key = "0247bb0569faf977d073cb2f";


let coefficient = 0;




getCurrencyValues().then(data => {
    coefficient = data;
});

eventListeners();







function eventListeners(){

    from.addEventListener('keyup',takeValue);
    firstCurrency.addEventListener('change',getCurrencyValuesNotEmpty);
    secondCurrency.addEventListener('change',getCurrencyValuesNotEmpty);



}

function takeValue(){

    if(from.value === ""){
        to.value = "";
    }else{
        
        to.value = (from.value*coefficient).toFixed(2);
    }


    
}

async function getCurrencyValues(){

    const response = await fetch(baseURL+API_key+"/latest/"+firstCurrency.value);
    const data = await response.json();
    const parameter = secondCurrency.value;
    return data.conversion_rates[parameter];

}

async function getCurrencyValuesNotEmpty(){
    const response = await fetch(baseURL+API_key+"/latest/"+firstCurrency.value);
    const data = await response.json();
    const parameter = secondCurrency.value;
    coefficient = data.conversion_rates[parameter];

    takeValue();
    
}

