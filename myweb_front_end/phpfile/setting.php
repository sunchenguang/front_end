<?php
ob_start();
session_start();

require "config.php";
$link=mysql_connect($db_host,$db_user,$db_pass) or die(mysql_error()."数据库连接错误");
mysql_select_db($db_name,$link);
mysql_query("SET NAMES UTF8");

//判断是否输入了新昵称
if($_POST["nameNew"])
{
$nameNew=$_POST["nameNew"];
$myid=$_POST[id];

$sql="update $table_user set u_name='$nameNew' where id='$myid' ";
mysql_query($sql,$link);

setcookie("name","",time()-3600,"/myweb_front_end/");
setcookie("name","$nameNew",time()+3600,"/myweb_front_end/");

$sql="select * from $table_user where u_name='$nameNew' ";
$result=mysql_query($sql);
$row=mysql_fetch_array($result);
$mail=$row['u_mail'];
$id=$row['id'];
$name=$row['u_name'];
}
//结束

//判断是否输入了新邮箱
else if($_POST["mailNew"])
{
$mailNew=$_POST["mailNew"];
$myid=$_POST[id];

$sql="update $table_user set u_mail='$mailNew' where id='$myid' ";
mysql_query($sql,$link);	
	
$sql="select * from $table_user where u_mail='$mailNew' ";
$result=mysql_query($sql);
$row=mysql_fetch_array($result);
$mail=$row['u_mail'];
$id=$row['id'];
$name=$row['u_name'];
}
//结束


//判断是否输入了新密码
else if($_POST["repasswdNew"])
{
$myid=$_POST["id"];
$sql="select * from $table_user where id='$myid' ";
$result=mysql_query($sql,$link);
$row=mysql_fetch_array($result);
$mail=$row['u_mail'];
$id=$row['id'];
$name=$row['u_name'];

$passwd=$row['u_passwd'];
$passwd1=md5($_POST["passwdOld"]);	
$passwd2=md5($_POST["passwdNew"]);

  if($passwd!=$passwd1){
	?>
    <script>alert("原密码输入错误！");</script>
    <?php
    }
  else{
    $sql="update $table_user set u_passwd='$passwd2' where id='$myid' ";
    mysql_query($sql,$link);

  }
	
	
}
//结束

//判断什么都没有更改时的情况
else
{
$name1=$_COOKIE[name];
$sql="select * from $table_user where u_name='$name1' ";

$result=mysql_query($sql);
$row=mysql_fetch_array($result);
$mail=$row['u_mail'];
$id=$row['id'];
$name=$row['u_name'];


}
//结束


ob_end_flush();
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php $_COOKIE["name"] ?>个人设置</title>



<link href="../css/bootstrap1.css" rel="stylesheet">
<link href="../css/setting.css" rel="stylesheet">

<script src="../js/jquery.js"></script>
<script src="../js/bootstrap.min.js"></script>

<script>
function checkPasswd(){
	if($("#passwdNew").val()!=$("#repasswdNew").val()){
		alert("两次输入的密码不一致，请重新输入！");
		
	}
	
}

</script>

</head>

<body style="background-image:url(../img/tiger.jpg)">







<!--整个折叠面板 -->
<div class="settingbar">
  <div class="container box">
  
    <h1 style="color:#999">个人设置<small class="pull-right title"><a href="../index.php" class="text-muted">返回个人主页</a></small></h1>
    
      <div class="panel-group" id="accordion">
      
      <!--个人资料折叠条模块    -->
        <div class="panel panel-default">
        
          <div class="panel-heading">
            <h4 class="panel-title clearfix">
              <a data-toggle="collapse" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" >
                个人资料<span class="pull-right">展开<span class="glyphicon glyphicon-chevron-down"></span></span>
              </a>
              
            </h4>
         </div>
         
         <div id="collapseOne" class="panel-collapse collapse">
           <div class="panel-body form-horizontal">
           
           <form method="post" action="setting.php" id="form1" name="form1">
           
             <div class="form-group">
               <label class="col-sm-2 control-label">昵称</label>    
                <div class="col-sm-4">
                      <p id="p_name" class="form-control-static"><?php echo $name;  ?></p>
                </div>
             </div>
             
             <div class="form-group">
                    <label for="" class="col-sm-2 control-label">新昵称</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="nameNew" name="nameNew">
                    </div>
             </div>
               
               <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button id="btn_uinfo" type="submit" class="btn btn-primary">保存</button>
                    </div>
               </div>
               <input type="hidden" name="id" value="<?php echo $id; ?>" />
               
             </form>
               
            </div>
           </div>
           
        </div> 
        <!--个人资料折叠条模块的结束  -->
        
        <!--登录邮箱折叠条模块  -->
        <div class="panel panel-default">
        
          <div class="panel-heading">
            <h4 class="panel-title clearfix">
              <a data-toggle="collapse" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" >
                登录邮箱<span class="pull-right">展开<span class="glyphicon glyphicon-chevron-down"></span></span>
              </a>
            </h4>
         </div>
         
         <div id="collapseTwo" class="panel-collapse collapse">
           <div class="panel-body form-horizontal">
           
           <form method="post" action="setting.php" id="form2" name="form2">
           
             <div class="form-group">
               <label class="col-sm-2 control-label">当前邮箱</label>    
                <div class="col-sm-4">
                      <p id="p_name" class="form-control-static"><?php echo $mail;  ?></p>
                </div>
             </div>
             
             <div class="form-group">
                    <label for="" class="col-sm-2 control-label">新邮箱</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="mailNew" name="mailNew">
                    </div>
             </div>
               
               <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button id="btn_mail" type="submit" class="btn btn-primary">保存</button>
                    </div>
               </div>
                <input type="hidden" name="id" value="<?php echo $id; ?>" />
              </form> 
               
            </div>
           </div>
           
        </div> 
        <!--登录邮箱折叠条模块的结束  -->
        
        <!--密码折叠条模块  -->
        <div class="panel panel-default">
        
          <div class="panel-heading">
            <h4 class="panel-title clearfix">
              <a data-toggle="collapse" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" >
                密码<span class="pull-right">展开<span class="glyphicon glyphicon-chevron-down"></span></span>
              </a>
            </h4>
         </div>
         
         <div id="collapseThree" class="panel-collapse collapse">
           <div class="panel-body form-horizontal">
           
           <form method="post" action="setting.php" id="form3" name="form3" onSubmit="checkPasswd()">
           
             <div class="form-group">
               <label class="col-sm-2 control-label">当前密码</label>    
                <div class="col-sm-4">
                      <input type="password" class="form-control" id="passwdOld" name="passwdOld">
                </div>
             </div>
             
             <div class="form-group">
                    <label class="col-sm-2 control-label">新密码</label>
                    <div class="col-sm-4">
                      <input type="password" class="form-control" id="passwdNew" name="passwdNew">
                    </div>
             </div>
             
             <div class="form-group">
                    <label class="col-sm-2 control-label">确认新密码</label>
                    <div class="col-sm-4">
                      <input type="password" class="form-control" id="repasswdNew" name="repasswdNew">
                    </div>
             </div>
               
               <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button id="btn_passwd" type="submit" class="btn btn-primary">保存</button>
                    </div>
               </div>
               
                <input type="hidden" name="id" value="<?php echo $id; ?>" />
              </form>  
                
            </div>
           </div>
           
        </div> 
        <!--密码折叠条模块的结束  -->
        
        
        
    </div>
    
  </div>
</div>
<!-- 整个折叠面板的结束 -->



</body>
</html>