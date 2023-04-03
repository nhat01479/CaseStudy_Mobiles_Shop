
// Show Cart

function showCart(){
    var form = document.querySelector('.form-div');
    if (form.style.display == 'block') form.style.display = 'none';
    else form.style.display = 'block';
}
//Checkout
function handleCheckout(){
    alert('Đơn hàng đã thanh toán thành công')
}


// Add vào giỏ hàng

const btn = document.querySelectorAll('button');    //Lấy tất cả các nút
btn.forEach(function(button,index){
    button.addEventListener("click", function(evt){
        var btnItem = evt.target;                   //click vào nút nào thì target vào đó
        var product = btnItem.parentElement;        //Chọn phần tử cha của nút vừa click vào
        var productName = product.querySelector('.name').innerText; //lấy innerText của phần tử con đầu tiên có class ".name" và gán vào biến productName
        var productCost = product.querySelector('.cost').innerText;
        addtoCart(productName,productCost)      //gọi hàm addtoCart
    })
})

// Hàm addtoCart

function addtoCart(productName,productCost){
    var addtr = document.createElement('tr'); //tạo thêm 1 dòng
    var cartItem = document.querySelectorAll('tbody tr');
    for (var i=0; i<cartItem.length; i++){
        var productT = document.querySelectorAll('.title');
        if (productT[i].innerHTML == productName) {
            alert('Sản phẩm đã có trong giỏ hàng');
            return;
        }
    }
    var trcontent = `<tr><td><span class='title'>${productName}</span></td><td style="text-align: center;"><span class='cost'>${productCost}</span><sup>đ</sup></td><td style="text-align: center;"><input type="number" value="1" min="1" style="width:30px; text-align: center;"></td><td style="text-align: right;"><button class="remove-cart" type='button' style="width:40px">Xoá</button></td></tr>`;
    addtr.innerHTML = trcontent; //dòng đó có nội dung bằng trcontent
    var cartTable = document.querySelector('tbody');
    cartTable.append(addtr) //append add thêm 1 dòng tr vào phía dưới của tbody

    totalCart();
    deleteCart()

};
//Hàm tính tổng tiền
function totalCart(){
    var cartItem = document.querySelectorAll('tbody tr');
    var totalC = 0;
    // console.log(cartItem.length);
    for (var i=0; i<cartItem.length; i++){
        var productQuantity = cartItem[i].querySelector("input").value    //Do số lượng nằm trong thẻ input
        var productCost = cartItem[i].querySelector(".cost").innerHTML        //Do giá nằm trong thẻ span
        var totalProductCost = productQuantity * productCost;
        totalC += totalProductCost;
    }
    let c = document.querySelector('.totalCart span')
    c.innerHTML = totalC.toLocaleString('de-DE');
    inputChange()
   
}
 

//Hàm xóa khỏi giỏ hàng

function deleteCart(){
    var cartItem = document.querySelectorAll('tbody tr');
    for (var i=0; i<cartItem.length; i++){
        var productT = document.querySelectorAll('.remove-cart');
        productT[i].addEventListener('click',function(evt){
            var cartDelete = evt.target;
            var cart = cartDelete.parentElement.parentElement;
            cart.remove();
            totalCart()
        })
    }
}

function inputChange(){
    var cartItem = document.querySelectorAll('tbody tr');
    for (var i=0; i<cartItem.length; i++){
        var quatityValue = cartItem[i].querySelector('input');
       quatityValue.addEventListener('change',function(){
        totalCart()
       })
        
    }
}