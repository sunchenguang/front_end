<?php
session_start();

require "config.php";
$link=mysql_connect($db_host,$db_user,$db_pass) or die(mysql_error());
mysql_select_db($db_name,$link);

$name=$_POST[name];
$pass=md5($_POST[passwd]);
$mail=$_POST[mail];

mysql_query("SET NAMES UTF8");
$sql="select * from $table_user where u_name='$name'";
$result=mysql_query($sql,$link) or die(mysql_error());
$row=mysql_num_rows($result);

if($row==0)
{
	
  if($_POST['unum']==$_SESSION["randValid"])
  {
   $sql2="insert into $table_user(u_name,u_mail,u_passwd) values('$name','$mail','$pass')";
   if(mysql_query($sql2))
   {
    echo "<meta http-equiv='refresh' content='0.1; url=../index.php'>";
   }
   else
   {
	   ?>
       <script>alert("未知原因，注册失败,请重新注册!");</script>
       
       
       <?php
	   echo "<meta http-equiv='refresh' content='1; url=../account/register.html'>";
   
   }
  }
  else
{
?>
  <script>alert("对不起，验证码错误，请重新注册！");</script>
  
<?php
echo "<meta http-equiv='refresh' content='1; url=../account/register.html'>";
}

}

else
{
	?>
    <script>alert("对不起，你的名字已被注册，请重新注册！");</script>
    
    <?php
	echo "<meta http-equiv='refresh' content='1; url=../account/register.html'>";

}




?>








