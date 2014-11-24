// JavaScript Document
function show_name_tip(){
	$("#name-tip").show();
}

function hide_name_tip(){
	$("#name-tip").hide();
}

function show_mail_tip(){
	$("#mail-tip").show();
}

function hide_mail_tip(){
	$("#mail-tip").hide();
}

function show_passwd_tip(){
	$("#passwd-tip").show();
}

function hide_passwd_tip(){
	$("#passwd-tip").hide();
}
//昵称验证
function nameValidate(){
	var elem = $("#name");
	var name = elem.val();
	name = $.trim(name);
	if(name==""){
		$("#name-empty").show();
	}else{
		var reg=/^[-_a-zA-Z0-9\u4e00-\u9fa5]{2,30}$/;
		if(!reg.test(name)){
			$("#name-empty").text("昵称格式不正确！");
		}else{
			$("#name-empty").text("正确！");
		}
	}
}

//邮箱验证
function mailValidate(){
	var elem = $("#mail");
	var mail = elem.val();
	//mail = mail.replace(/^\s+|\s+$/g, "");
	mail = $.trim(mail);
	if(mail==""){
		$("#mail-empty").show();
	}else{
		var reg=/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if(!reg.test(mail)){
			$("#mail-empty").text("邮箱格式不正确！");
		}else{
			$("#mail-empty").text("正确！");
		}
	}
}

//密码验证
function passwdValidate(){
	var elem = $("#passwd");
	var passwd = elem.val();
	passwd = $.trim(passwd);
	if(passwd==""){
		$("#passwd-empty").show();
	}else{
		var reg = "";
		if(passwd.length < 8){
			$("#passwd-empty").text("密码长度不足8个字符!");
		}else if(!(/\d/.test(passwd))){
			$("#passwd-empty").text("密码过于简单，请包含字母和数字!");
		}else if(!(/[a-zA-Z\~\)\!$\%\*\(\_\+\-\=\{\}\[\]\|\:\;\<\>\?\,\.\/\@#\^\"\'\`\?\&]/.test(passwd))){
			$("#passwd-empty").text("密码过于简单，请包含字母和数字!");
		}else{
			$("#passwd-empty").text("正确！");
		}
	}
}








