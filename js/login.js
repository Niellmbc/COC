function x(val){
	return document.querySelector(val);
}
document.addEventListener('DOMContentLoaded',function(){
	x('#login_user').addEventListener('submit',function(e){
		let datas = {
			fldUsername:document.getElementById("user_username").value,		
			fldPassword:document.getElementById("user_password").value
		}
		e.preventDefault();
		fetch(url+"/tbl_users/fldUsername/"+datas.fldUsername).then((res)=>res.json()).then(function(data){
			if(data[0].fldUsername === datas.fldUsername && data[0].fldPassword === datas.fldPassword){
					if(data[0].fldConfirmation != null){
						M.toast({html: 'Please Confirm Your Account',completeCallback: function(){
							window.location.assign('confirm.html');
						}});
					}else{
						window.location.assign('confirm.html');
						M.toast({html: 'Welcome'});
					}
			}else{
				M.toast({html: 'not Welcome'});
			}
		});
	});
});