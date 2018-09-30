let jsonArr = [];
let cart = [];
$(document).ready(function() {
	fetchLaborer();
	fetchProducts();
});
function fetchLaborer() {
	fetch('http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi/tbl_users/fldUserType/laborer').then(res => res.json()).then(data => {
		let body = ``;
		body+=`<option  disabled selected>Choose your laborer</option>`;
		data.forEach(laborer => {	
			body+=`<option class="capitalize" value="${laborer.fldLaborerID}">${laborer.fldUsername} ${laborer.fldLastname}</option>`;
		});
		$('#fetch_laborer').html(body);
	});
}
function fetchProducts() {
	fetch('http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi/tbl_product').then(res => res.json()).then(data => {
		let body = ``;
		data.forEach(products => {	
			body+=`	<div class="col s12 l6">
			<div class="card-panel grey lighten-5 z-depth-1">
			<div class="row valign-wrapper">
			<div class="col s6">
			<img src="../../img/vegetables.png" alt="" class="circle responsive-img">
			</div>
			<div class="col s10">
			<h5 class="green-text">${products.fldProductName}</h5>
			<span class="black-text">
			<ul style="color:#000000a6">
			<li><b>Price:</b> P${parseInt(products.fldProductPrice).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )}</li>
			</ul>
			</span>
			<a href="#!" class="btn waves-effect gradient-body" onclick="addToCart(${products.fldProductId},'${products.fldProductName}','${products.fldCategory}',${products.fldProductPrice})">Add to Cart</a>
			</div>
			</div>
			</div>
			</div>`;
		});
		$('#fetch_products').html(body);
	});
}
function addToCart(id,prod_name,categ,price) {
	cart.push({'fldProductId': id, 'fldProductName': prod_name, 'fldCategory': categ, 'fldQty' : 1, 'fldProductPrice': price});
	 localStorage.setItem("add_to_cart", JSON.stringify(cart));
	 alert('Product Added Successfully');
}
function checkCart() {
	let get_cart = JSON.parse(localStorage.getItem("add_to_cart"));
	let body = ``;
	get_cart.forEach(prod=> {
		body+=`<tr>`;
		body+=`<td>${prod.fldProductName}</td>`;
		body+=`<td>${prod.fldQty}</td>`;
		body+=`<td>P${parseInt(prod.fldProductPrice).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )}</td>`;
		body+=`</tr>`;
	});
	$('#fetch_cart').html(body);
}