let url = 'http://gordoncollegeccs-ssite.net/macionmart/coc/pracapi'
function x(val){
	return document.querySelector(val);
}

document.addEventListener('DOMContentLoaded',function(){
	x('#reg_user').addEventListener('submit',function(e){
		let code = Math.floor((Math.random() * 3000) + 10000);
		let data = {
			fldUsername:document.getElementById("user_username").value,		
			fldPassword:document.getElementById("user_password").value,
			fldFirstname:document.getElementById("user_firstname").value,
			fldLastname:document.getElementById("user_lastname").value,
			fldUserType:'laborer',
			fldEmail:document.getElementById("user_email").value,
			fldContactNo:document.getElementById("user_phone").value,
			fldConfirmation:code
		}
		let data2 = 'message=Successfully Registered you Confirmation Number is '+code+'&number='+document.getElementById('user_phone').value;
		e.preventDefault();
		fetch(url+"/insert/tbl_users",{
			method:"POST",
			body:JSON.stringify([data])
		}).then(function(data){

			fetch('https://sms-test.bayadcenter.net/sms/push',{
				method:"POST",
				body:data2,
				headers: {
		    		'Content-Type': 'application/x-www-form-urlencoded'
		  		}
			}).then(function(data){
				if (data['status'] === 200) {
					M.toast({html: 'Confirmation Code Successfully Sent.'})
				}else{
					M.toast({html: 'Confirmation Code Not Sent.'})
				}
			});
			
		});
	});
});
	



		