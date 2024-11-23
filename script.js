let GEBID = (id) => document.getElementById(id);

let title = GEBID('title');
let price = GEBID('price');
let taxes = GEBID('taxes');
let ads = GEBID('ads');
let discount = GEBID('disc');
let total = GEBID('total');
let category = GEBID('category');
let submit = GEBID('submit');


function getTotal() {
    if (price.value != '') {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        if (result <= 0) { window.alert('Unaccepted total price'); result += +discount.value; discount.value = ''; }
        total.innerHTML = JSON.stringify(result);
        total.style.backgroundColor = 'green';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }
    
};

let dataPro = localStorage.product == undefined ? [] : JSON.parse(localStorage.product);

showData();
submit.onclick = () => {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(dataPro);
    dataPro[dataPro.length - 1].id = dataPro.length;
    document.getElementById('tbody').appendChild(productRow(newPro));
    clearInputs();
}

let clearInputs = () => {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    count.value = 1;
    total.innerHTML = '';
}

function showData() {
    document.getElementById('tbody').innerHTML = '';
    for (i = 0; i < dataPro.length; i++) {
        dataPro[i].id = i + 1;
        document.getElementById('tbody').appendChild(productRow(dataPro[i]));
    }
}

function productRow(product) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td>${product.taxes}</td>
    <td>${product.ads}</td>
    <td>${product.discount}</td>
    <td>${product.total}</td>
    <td>${product.category}</td>
    <td><button id="update">update</button></td>
    <td><button id="delete" onclick="deleteProduct(${product.id}); showData()">delete</button></td>
    `;
    return row ;
}

function deleteProduct(id){
    dataPro.splice(id-1 , 1);
    localStorage.product = JSON.stringify(dataPro);
}
