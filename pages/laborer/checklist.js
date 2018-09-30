$(document).ready(function() {
	fetchUser();
});
function fetchUser() {
	fetch("http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi/tbl_transaction/fldRemarks/New").then(res=>res.json()).then(function(data){
		
		fetch("http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi/tbl_users/fldUserId/"+data[0].fldBuyerID).then(res=>res.json()).then(function(data){
			let body = ``;
			data.forEach(user => {
				body+=`	<div class="col s12 l6">
				<div class="card-panel grey lighten-5 z-depth-1">
				<div class="row valign-wrapper">
				<div class="col s6">
				<img src="../../img/logos/student.jpg" alt="" class="circle responsive-img">
				</div>
				<div class="col s10">
				<h5 class="green-text">${user.fldFirstname} ${user.fldLastname}</h5>
				<span class="black-text">
				<ul style="color:#000000a6" id="fetch_orders">
				</ul>
				</span>
				<a href="#checklist" class="btn waves-effect modal-trigger" onclick="fetchNowOrder()">View info</a>
				</div>
				</div>
				</div>
				</div>`;
			});
			$('#fetch_users').html(body);
		});
		fetchOrder(data[0].fldTransactionID);
	});
}

function fetchOrder(id) {
	fetch('http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi/tbl_transactiondet/fldTransactionID/'+id).then(res => res.json()).then(data => {
		let body = ``;
		data.forEach(order => {
			body+= `<li>${order.fldQty} - ${order.fldProductId}</li>`;
		});
		$('#fetch_orders').html(body);
	});
}

function fetchNowOrder(id){
	let body = ``;
	fetch('http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi/tbl_transactiondet/fldTransactionID/'+id).then(res => res.json()).then(data => {
		let body = ``;
		data.forEach(order => {
			body+= `	<div class="col s12">
			<p>
			<label>
			<input type="checkbox" class="filled-in" />
			<span>Sili</span>
			</label>
			</p>
			</div>`;
		});
		$('#fetch_checklistOrder').html(body);
	});
	
}