let GEBID = (id) => document.getElementById(id);

let title = GEBID('title');
let price = GEBID('price');
let taxes = GEBID('taxes');
let ads = GEBID('ads');
let discount = GEBID('disc');
let total = GEBID('total');
let category = GEBID('category');
let count = GEBID('count');
let submit = GEBID('submit');
let dataPro = localStorage.product == undefined ? [] : JSON.parse(localStorage.product);
let create = true;
let tmp;
showData();


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

function clear() {
    dataPro = [];
    localStorage.product = JSON.stringify(dataPro);
}



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

    if(create){
        for(let i = 1 ; i <= count.value ; i++){
            dataPro.push(newPro);
            dataPro[dataPro.length - 1].id = dataPro.length;
        }
        localStorage.setItem('product', JSON.stringify(dataPro));
        console.log(dataPro);
    }
    else{
        dataPro[tmp - 1] = newPro;
        localStorage.setItem('product', JSON.stringify(dataPro));
        create = true;
        count.style.display = 'block';
        submit.innerHTML = 'Add Product';
    }
    showData();
    clearInputs();
    getTotal();
}


function clearInputs(){
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
    if(dataPro.length > 0){
        document.getElementById('clearBtn').innerHTML= '';
        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = `Delete All Products (${dataPro.length}) `;
        btnDelete.onclick = () => {
            clear();
            showData();
        }
        document.getElementById('clearBtn').appendChild(btnDelete);
        document.getElementById('tbody').innerHTML = '';
    }
    else{
        document.getElementById('clearBtn').innerHTML = '';
        document.getElementById('tbody').innerHTML = '';
    }
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
    <td><button id="update" onclick="updateProduct(${product.id})">update</button></td>
    <td><button id="delete" onclick="deleteProduct(${product.id}); showData()">delete</button></td>
    `;
    return row ;
}

function deleteProduct(id){
    dataPro.splice(id-1 , 1);
    localStorage.product = JSON.stringify(dataPro);
}

function updateProduct(id){
    window.scrollTo({
        left:0,
        top:0,
        behavior:'smooth'
    });
    tmp = id;
    console.log(id);
    title.value = dataPro[id-1].title ;
    price.value = dataPro[id-1].price ;
    taxes.value = dataPro[id-1].taxes ;
    ads.value = dataPro[id-1].ads ;
    discount.value = dataPro[id-1].discount ;
    category.value = dataPro[id-1].category ;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    getTotal();
    create = false;
}