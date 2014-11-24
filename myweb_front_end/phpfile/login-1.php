<?php 
ob_start();
session_start();
if(!$_COOKIE[name]){
$name=$_POST["name"];
$passwd=md5($_POST["passwd"]);

require "config.php";
$link=mysql_connect($db_host,$db_user,$db_pass) or die(mysql_error());
mysql_select_db($db_name,$link);
mysql_query("SET NAMES UTF8");
$sql="select * from $table_user where u_name='$name' && u_passwd='$passwd'";
$result=mysql_query($sql,$link) or die(mysql_error());
$row=mysql_num_rows($result);

if($row==1)
{
	
  if($_POST['unum']==$_SESSION["randValid"])
  {
	  setcookie("name","$name",time()+3600,"/myweb_front_end/");
      echo "<meta http-equiv='refresh' content='0.1; url=../index.php'>";
  }
  else
  {
  ?>
  
  <script>alert("验证码填写错误，请返回重新填写！");</script>
  
  <?php
  echo "<meta http-equiv='refresh' content='1; url=../account/login.html'>";
  }
}
else
{
?>

<script>alert("用户登录信息不正确，请返回重新填写！");</script>

<?php
echo "<meta http-equiv='refresh' content='1; url=../account/login.html'>";
}

ob_end_flush();

}
else{
echo "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>";
echo "<meta http-equiv='refresh' content='3; url=../index.php'>";
echo "</head>";
echo "<body>已登录！请退出登录后再重新登录。。。</body>";
echo "</html>";
	
}


?>
