class Mobile {
    constructor(id, img, name, monitor, memory, cost, ram, camera, battery){
        this.id = id;
        this.img = img;
        this.name = name;
        this.monitor = monitor;
        this.memory = memory;
        this.cost = cost;
        this.ram = ram;
        this.camera = camera;
        this.battery = battery
    }
}


 let mobiles = [
     new Mobile(1,'images/IP14PMX.jpg','iPhone 14 Pro Max', '6.7"', '128GB',29900000,'6GB', '48MP & 12 MP', '4323'),
     new Mobile(2,'images/IP14P.jpg','iPhone 14 Pro', '6.1"', '128GB',25490000,'6GB', '48MP & 12 MP', '3200'),
     new Mobile(3,'images/IP14.jpg','iPhone 14', '6.1"', '128GB',21490000,'6GB', '12 MP', '3200'),
     new Mobile(4,'images/IP13P.jpg','iPhone 13 Pro', '6.1"', '1TB',25990000,'6GB', '12 MP', '3095'),
     new Mobile(5,'images/ss1.jpg','Samsung Galaxy S23 Ultra 5G', '6.8"', '256GB',26990000,'8GB', '200 MP & 12 MP', '5000'),
     new Mobile(6,'images/ss2.jpg','Samsung Galaxy S23 5G', '6.1"', '128GB',21990000,'8GB', '50 MP & 12 MP', '3900'),
    new Mobile(7,'images/ss3.jpg','Samsung Galaxy Z Fold3 5G', '7.6" & 6.2"', '512GB',27990000,'12GB', '3x12MP & 10 MP', '4400'),
    new Mobile(8,'images/xiaomi1.jpg','Xiaomi 13 Pro', '6.73"', '256GB',25990000,'12GB', '50MP & 32MP', '4820'),
    new Mobile(9,'images/xiaomi2.jpg','Xiaomi 12T', '6.67"', '256GB',12490000,'8GB', '108MP & 20MP', '5000'),
    new Mobile(10,'images/xiaomi3.jpg','Xiaomi 13', '6.36"', '256GB',18990000,'8GB', '50MP & 32MP', '4500')
 ];
// Hàm render sản phẩm ra màn hình
 function renderProduct(){
    document.querySelector('.body-product').innerHTML = '';

    for (let phone of mobiles){
        document.querySelector('.body-product').innerHTML +=
                    `<div class="product">

                        <div class="product-img">
                            <img id='img' src="${phone.img}" alt="">         
                        </div>

                        <div class='detail'>
                            <span class='name' style='color: blue;'>${phone.name}</span>
                            <span >               
                                <span style="border-radius: 3px; background-color: #E0E0E0">&emsp;${phone.monitor}&emsp;</span>                
                                <span style="border-radius: 3px; background-color: #E0E0E0">&emsp;${phone.memory}&emsp;</span>  
                            </span>              
                            <span class='cost' style='font-size: larger'><b>${formatCurrency(phone.cost)}</b></span>                
                            <span>RAM: ${phone.ram}</span>                
                            <span>Camera: ${phone.camera}</span>                
                            <span>Pin: ${phone.battery} mAh</span>                                                  
                        </div>
                        <button class='addtocart' data-id='${phone.id}'>Thêm vào giỏ hàng <i class="fa-sharp fa-solid fa-cart-plus"></i></button>
                    </div>`;
            }
 }
 renderProduct()

 function formatCurrency(number){
    return number.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
}

var cart = localStorage.getItem('cart')

if (cart == null) {
    cart = []
} else {
    cart = JSON.parse(cart)
    renderCart(cart)
    totalCart()
}

// Show Cart

function showCart() {
	var form = document.querySelector(".form-div");
	if (form.style.display == "block") form.style.display = "none";
	else form.style.display = "block";
}

// Add vào giỏ hàng

const btn = document.querySelectorAll("button.addtocart");
var btnRemove = document.querySelectorAll(".remove-cart");

btn.forEach(function (button, index) {
		button.addEventListener("click", function (evt) {
            const phoneId = this.getAttribute('data-id');
			const product = mobiles.find(phone => phone.id == phoneId)
            const checkProductExist = cart.find(phone => phone.id == product.id)

            if (checkProductExist != undefined) {
                alert("Sản phẩm đã có trong giỏ hàng");
            } else {
                cart.push({name: product.name, id: product.id, cost: product.cost, quantity: 1})
                console.log("c", cart);
                document.querySelector("#cartContent").innerHTML ="";
                renderCart(cart)
                totalCart()
                localStorage.setItem("cart", JSON.stringify(cart))
            }
		});
	});

  
function renderCart (cart) {
    let cartContent = document.querySelector("#cartContent");
    
    for (var phone of cart) {
        let itemTr = document.createElement('tr');
        itemTr.id = 'tr_' + phone.id;
        itemTr.innerHTML = `<td><span class='title'>${phone.name}</span></td><td style="text-align: center;"><span class='cost'>${formatCurrency(phone.cost)}</span></td><td style="text-align: center;"><input type="number" name="quantity" onchange='inputChange(${phone.id}, this.value)' value='${phone.quantity}' min="1" style="width:30px; text-align: center;"></td><td id="total_${phone.id}" style="text-align: right">${formatCurrency(phone.cost * phone.quantity)}</td><td style="text-align: right;"><button class="remove-cart" onclick='removeItem(${phone.id})'  type='button' style="width:40px; ">Xoá</button></td>` ;
        cartContent.append(itemTr)
    }
}

function removeItem (id) {
    const index = cart.findIndex(item => item.id === id);
    if (index != -1) {
        cart.splice(index, 1);
    }
    const trRemove = document.querySelector('#tr_' + id);
    trRemove.remove();
    totalCart()
}

function inputChange(id, value) {
    console.log("id, quantity", id, value);
    const itemEdit = cart.find((item, index) => item.id == id);
    indexOfItem = cart.indexOf(itemEdit);
    if (indexOfItem != -1) {
        cart[indexOfItem].quantity = +value;
        const totalElement = document.getElementById(`total_${id}`);
        const total = itemEdit.cost * value;
        totalElement.innerText = formatCurrency(total)
    }
    console.log(cart);
    totalCart()
	
}

function totalCart () {
    const totalCost = cart.reduce((total, phone) => total + (phone.cost * phone.quantity), 0);
    
    document.querySelector('#totalAmount').innerHTML = formatCurrency(totalCost);
}

//Checkout
function handleCheckout() {
	alert("Đơn hàng đã thanh toán thành công");
    cart = []
    document.querySelector("#cartContent").innerHTML = ""
    totalCart()
}
