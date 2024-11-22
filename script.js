"use strict"
let GEBID = (id) => document.getElementById(id) ;
// getTotal()
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


// CcreateProduct

let dataPro = JSON.parse(localStorage.product) || []    ;

submit.onclick = () => {
    let newPro = {
        title: title.value ,
        price: price.value ,
        taxes: taxes.value ,
        ads: ads.value ,
        discount: discount.value ,
        total: total.innerHTML ,
        count: count.value,
        category: category.value
    }
    dataPro.push(newPro);
    localStorage.setItem('product' , JSON.stringify(dataPro));
    console.log(dataPro);
    clearInputs();
}

// updateProduct()
// deleteProduct()
// storeLocal()
// getLocal()
// clearInputs()

let clearInputs = () => {
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    category.value = '';
    count.value = 1 ;
}

// update()
// search()
// cleanData()
