function getProduct() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });

    promise.then(function(result) {
        renderProduct(result.data);
    });

    promise.catch(function(err) {
        console.log('result',err.response.data);
    });
}

window.onload = function () {
    getProduct();
}

function renderProduct(arrProduct) {
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var product = arrProduct[i];
        html += `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.img}" alt="" style="width:50px"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-primary mr-2" onclick="suaProduct('${product.id}')"><i class="far fa-edit"></i></button>
                <button class="btn btn-danger" onclick="xoaProduct('${product.id}')"><i class="far fa-trash-alt"></i></button>
            </td>
        </tr>
        `
    }
    document.querySelector('#tbProduct').innerHTML = html;
}

document.querySelector('#btnCreate').onclick = function () {
    var product = new Product();
    product.id = document.querySelector('#id').value;
    product.name = document.querySelector('#name').value;
    product.price = document.querySelector('#price').value;
    product.img = document.querySelector('#img').value;
    product.description = document.querySelector('#description').value;
    product.type = document.querySelector('#type').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: product
    });
    promise.then(function (result) {
        getProduct();
    })
    promise.catch(function (err) {
        console.log(err)
    })
}

function xoaProduct(id) {
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/DeleteProduct/' + id,
        method:'DELETE'
    });

    promise.then(function(result) {
        getProduct();
    });

    //Xử lý thất bại
    promise.catch(function(error) {
    })

}

function suaProduct(id) {
    var promise = axios ({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + id,
        method: 'GET'
    })
    promise.then(function(result) {
        var inforProduct = result.data;
        document.querySelector('#id').value = inforProduct.id;
        document.querySelector('#name').value = inforProduct.name;
        document.querySelector('#price').value = inforProduct.price;
        document.querySelector('#img').value = inforProduct.img;
        document.querySelector('#description').value = inforProduct.description;
        document.querySelector('#type').value = inforProduct.type;
    })
    promise.catch(function(err) {

    })
}

document.querySelector('#btnUpdate').onclick = function () {
    var product = new Product();
    product.id = document.querySelector('#id').value;
    product.name = document.querySelector('#name').value;
    product.price = document.querySelector('#price').value;
    product.img = document.querySelector('#img').value;
    product.description = document.querySelector('#description').value;
    product.type = document.querySelector('#type').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + product.id,
        method: 'PUT',
        data: product
    });
    promise.then(function (result) {
        getProduct();
    })
    promise.catch(function (err) {
        console.log(err)
    })
}
document.querySelector('#btnSearch').onclick = function () {
    var modal = document.querySelector('#modal');
    modal.style.display = 'flex';
    var proSearch = document.querySelector('#productSearch').value;
    var html ='';
    var promise = axios ({
        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name=' + proSearch,
        method: 'GET'
    })
    promise.then(function(result){
        var inforItem = result.data;
        console.log(inforItem[0])
        if (inforItem[0].name == proSearch) {
            html = `
            <tr>
                <td>${inforItem[0].id}</td>
                <td><img src="${inforItem[0].img}" alt="" style="width:50px"></td>
                <td>${inforItem[0].name}</td>
                <td>${inforItem[0].price}</td>
                <td>${inforItem[0].description}</td>
                <td>${inforItem[0].type}</td>
            </tr>
        `;
        }
        if (inforItem[0].name != proSearch) {
            html = 'không tìm thấy'
        }
        document.querySelector('#tbProduct2').innerHTML = html;
    })
    promise.catch(function(err) {

    })
}

document.querySelector('#btnClose').onclick = function(){
    document.querySelector('#modal').style.display = 'none';
}

