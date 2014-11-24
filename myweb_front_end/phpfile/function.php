<?php
 session_start();
 header("Content-type:image/png");
 
 //srand( microtime() * 1000000);
 $imagewidth = 200;
 $imageheight = 50;
 $font = "../fonts/yaya.ttf";
 $fontSize = 40;
 $authimage = imagecreate($imagewidth, $imageheight);
 
 $black = imagecolorallocate($authimage, 0, 0, 0);
 $white = imagecolorallocate($authimage, 255, 255, 255);
 $red = imagecolorallocate($authimage, 255, 0, 0);
 $gray = imagecolorallocate($authimage, 200, 200, 200);
 //背景颜色为灰色
 imagefill($authimage, 0, 0, $black);


//随机的画几条线段
 for($i = 0; $i < 6; $i++)
 {
  $randcolor = imagecolorallocate($authimage, rand(0, 255), rand(0, 255), rand(0, 255) );
  imageline($authimage, rand(0 ,$imagewidth), rand(0 ,$imageheight), rand(0 ,$imagewidth),rand(0 ,$imageheight),$randcolor);
 }

 //随机的生成一些干扰像素
 for($i = 0; $i < 400; $i++)
 {
    $randcolor = imagecolorallocate($authimage, rand(0, 255), rand(0, 255), rand(0, 255) );
    imagesetpixel($authimage, rand(0 , $imagewidth), rand(0 , $imageheight), $randcolor); 
	
 
 }
 
 
 
 
 //生成验证串
 $array = "0123456789abcdefghijklmnopqrstuvwxyz";
 
 for($i = 0; $i < 4; $i++)
 {
  $authcode .= substr($array, rand(0, 35), 1);
 }
 
 
 imagettftext($authimage, $fontSize, -10,30, 30, $red, $font, $authcode);
 //imagestring($authimage, 5, 50, 20, $authcode, $white);


 imagepng($authimage);
 imagedestroy($authimage);

 $_SESSION['randValid'] = $authcode;

?>
