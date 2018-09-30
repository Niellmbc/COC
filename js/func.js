let url = "http://gordoncollegeccs-ssite.net/";
data = [];
let lastData = 0;

let getData = () =>{
    data = JSON.parse(localStorage.add_to_cart);
    console.log(data);
}

$.ajaxSetup({
    async: false
});

$.getJSON(url + "macionmart/coc/pracapi/tbl_transaction?ORDERBY=fldTransactionID DESC&LIMIT=1", function(data){
    console.log(data);
    lastData = parseInt(data[0].fldTransactionID) + 1;
})

let getUser = () => {

    fetch(url + "macionmart/coc/pracapi/tbl_users").then((res) => res.json()).then(function (data) {
        let ls = "";
        data.map(x => {
            ls += '<div class="col s12 l6"><div class="card-panel grey lighten-5 z-depth-1"><div class="row valign-wrapper"><div class="col s6"><img src="../../img/logos/student.jpg" alt="" class="circle responsive-img"></div><div class="col s10">';

            ls += '<h5 class="green-text">' + x.fldFirstname + ' ' + x.fldLastname + '</h5>';
            ls += '<span class="black-text">';
            ls += '<p>Ratings: <i class="la la-star orange-text"></i><i class="la la-star orange-text"></i><i class="la la-star orange-text"></i><i class="la la-star orange-text"></i><i class="la la-star"></i></p>';

            ls += '<p>Number:' + x.fldContactNo + '</p></span><a href="#checklist" class="btn waves-effect modal-trigger" onclick="laborerCheck('+x.fldUserID+', '+x.fldContactNo+')">Select this laborer</a></div></div></div></div>';
        })
        $("#userList").html(ls);
    });

}

let userId = 0;
let userContact = 0;

let laborerCheck = (x, y) =>{
    userId = x;
    userContact = y;
}

let vamount = 1000;
let vtxnid = 1;
let name = "coffeedevs";
let datas = 'amount=1000&txnid=2&callback-url=generate&name=coffeedevs';

let submitdata = () => {
    fetch("http://localhost/curl/coc.php", {
        method: "POST",
        body: datas,
        headers: {
            'X-MultiPay-Token': '9ed98c02548aefad00eee6e87ea5bf2cc2c2cd9a',
            'X-MultiPay-Code': 'COC',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => res.json()).then(function (response) {
        sendSms();
        sendData();
        sendAll();
        window.location.assign(response.data.url);
    });
    sendSms();
}

let sendSms = () =>{
    
	let data2 = 'message=You have new pending orders please login to check it&number='+ ("0"+ userContact);
	fetch('https://sms-test.bayadcenter.net/sms/push',{
		method:"POST",
		body:data2,
		headers: {
    		'Content-Type': 'application/x-www-form-urlencoded'
  		}
	}).then(function(data){
		if (data['status'] === 200) {
			console.log('Successfully Sent.');
		}else{
			console.log('Error');
		}
	});    
    
}

let getdata = () => {
    fetch("https://bpf-api-test.bayadcenter.net/biller?name=" + name).then((res) => res.json()).then(function (data) {
        console.log(data);
    });
}


let sendData = () =>{
    let userId = 2;
    let laborerId = 1;
    let x = {
        a: userId,
        b: laborerId,
        c: getTimeNow(),
        d: getDateNow(),
        e: "New"
    }
    fetch(url + "macionmart/coc/pracapi/insert/tbl_transaction", {
        method: "POST",
        body: JSON.stringify([x])
    }).then((res)=>res.json()).then(function(data){
         
    });
}

let sendAll = () =>{
    
    let x = [];
    
    for(let i = 0; i < data.length;i++){
        let y = {
            a: lastData,
            b: data[i].fldProductName,
            c: data[i].fldQty,
            d: data[i].fldQty * data[i].fldProductPrice
        }
        x.push(y)
    }
    
    fetch(url + "macionmart/coc/pracapi/insert/tbl_transactiondet", {
        method: "POST",
        body: JSON.stringify(x)
    });
}

let getTimeNow = () =>{
      var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
}

let getDateNow = () =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;  
    
    return today;
    
}