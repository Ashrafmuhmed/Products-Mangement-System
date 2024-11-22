"use strict"
let GEBID = (id) => document.getElementById(id) ;
// getTotal()
// updateProduct()
// deleteProduct()
// storeLocal()
// getLocal()
// clearInputs()
// update()
// search()
// cleanData()

let title = GEBID('title');
let price = GEBID('price');
let taxes = GEBID('taxes');
let ads = GEBID('ads');
let discount = GEBID('disc');
let total = GEBID('total');
let category = GEBID('category');
let submit = GEBID('submit');

function getTotal() {
    if(price.value != '') {
        let result = +price.value + +taxes.value + +ads.value - +discount.value ;
        if(result <= 0) {window.alert('Unaccepted total price'); result+= +discount.value ; discount.value = '' ; }
        total.innerHTML = JSON.stringify(result);
        total.style.backgroundColor = 'green' ;
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }

};