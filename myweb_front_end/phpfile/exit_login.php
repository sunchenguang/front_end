<?php
ob_start();
session_start();
setcookie("name","",time()-3600,"/myweb_front_end/");
echo "<meta http-equiv='refresh' content='0.1; url=../index.php'>";
ob_end_flush();
?>