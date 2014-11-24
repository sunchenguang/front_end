// JavaScript Document
function a(){
  var cookiecheck='<?php echo $_COOKIE["name"];  ?>';
  if(cookiecheck==' '){
	  alert("cookie没有设置");
	  
  }
  else{
	alert(cookiecheck);  
  }
	
}









