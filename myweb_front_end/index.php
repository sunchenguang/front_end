<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>The Home Of Lolers</title>
<meta name="keywords" content="喜欢LOL的童鞋可以进来看看">
<meta name="description" content="发布一些LOL的文章和图片">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width; initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="author" content="LOL">


<link rel="icon" href="favicon.ico">

<link href="css/bootstrap1.css" rel="stylesheet">
<link href="css/custom.css" rel="stylesheet">
<script src="js/getcookie.js"></script>

</head>

<body id="top" >

<!--固定顶部导航栏  -->
<div class="navbar navbar-default navbar-fixed-top topbar">

  <div class="container topbar1">
  
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand fixleft" href="#">撸友之家</a>
     </div>
        
        <div class="navbar-collapse collapse fixtop">
        
          <ul class="nav navbar-nav fixleft1">
            <li class="active"><a href="#">主页</a></li>
            <li><a href="log/index.php">日志</a></li>
            <li><a href="photos/photos.html">照片</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">更多 <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#" target="_blank">论坛</a></li>
                <li><a href="#" target="_blank">攻略</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">视频</li>
                <li><a href="#" target="_blank">解说视频</a></li>
                <li><a href="#" target="_blank">比赛视频</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">游戏</li>
                <li><a href="game/tetris.html" target="_blank">俄罗斯方块</a></li>
                <li><a href="game/ball.html" target="_blank">空间保龄球</a></li>
                <li><a href="game/star.html" target="_blank">星际迷航</a></li>
              </ul>
            </li>
          </ul>
          
          <ul class="nav navbar-nav navbar-right">
            <li><button id="sina-login" type="button" class="btn btn-link navbar-btn btn-icon icon" title="用新浪微博帐号登录">
              <img src="img/weibo.jpg" alt="新浪微博图片"></button></li>
            <li><button id="qq-login" type="button" class="btn btn-link navbar-btn btn-icon icon" title="用QQ帐号登录">
              <img src="img/qq.png" alt="QQ图片"></button></li>
            <li><a href="account/login.html"><button class="btn btn-lg btn-primary" title="登录撸友之家">登录</button></a></li>
            <li><a href="account/register.html"><button class="btn btn-lg btn-warning" title="注册成为会员，享受更多服务" id="btn_register">注册</button></a></li>
            
            <li>
              
             <?php
			 if(!$_COOKIE[name])
			  {
			 
			 ?>
           <div class="right_top">未登录</div>
           <?php
			  }
			  else
			  {
		   ?>
           
           <li class="dropdown"> 
		   
		   
		   <a href="#" class="dropdown-toggle" data-toggle="dropdown"><div class="right_top"> <?php echo $_COOKIE[name]; ?>  已登录 <b class="caret"></b></div></a>
           <ul class="dropdown-menu drop">
                <li><a href="music_player/player.html" >我的音乐</a></li>
                <li><a href="phpfile/setting.php" >设置</a></li>
                <li><a href="phpfile/exit_login.php" >注销</a></li>
           </ul>
           
           
           </li>
           
        
           
           <?php
			  }
		   ?>
           
           </li>
          </ul>
            
        </div><!--/.nav-collapse -->
        
      </div>
      
    </div>
<!--固定顶部导航栏的结束  -->
      
           


<!--轮播模块 -->
<div id="myCarousel" class="carousel slide">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      
      <div class="carousel-inner">
      
        <div class="item active">
          <img src="img/1.jpg" alt="First photo" title="暗影之拳--阿卡丽">
          <div class="container">
            <div class="carousel-caption">
              <h1>穿越暮光的帷幕</h1>
              <p><a class="btn btn-large btn-primary" href="http://lol.duowan.com/akali/" target="_blank">Sign up today</a></p>
            </div>
          </div>
        </div>
        
        <div class="item">
          <img src="img/4.jpg"  alt="Second photo" title="蛮族之王--泰达米尔">
          <div class="container">
            <div class="carousel-caption">
              <h1>我的大刀早已饥渴难耐了</h1>
              <p><a class="btn btn-large btn-primary" href="http://lol.duowan.com/tryndamere/" target="_blank">Learn more</a></p>
            </div>
          </div>
        </div>
        
        <div class="item">
          <img src="img/7.jpg" alt="Third photo" title="放逐之刃--锐雯">
          <div class="container">
            <div class="carousel-caption">
              <h1>断剑重铸之日，骑士归来之时</h1>
             <p><a class="btn btn-large btn-primary" href="http://lol.duowan.com/riven/" target="_blank">To see Best Riven</a></p>
            </div>
          </div>
        </div>
      </div>
      
<a class="left carousel-control" href="#myCarousel" data-slide="prev" title="上一张">
  <span class="glyphicon glyphicon-chevron-left"></span></a>
<a class="right carousel-control" href="#myCarousel" data-slide="next" title="下一张">
  <span class="glyphicon glyphicon-chevron-right"></span></a>
</div>
<!--轮播模块的结束  -->


<!--主内容模块 -->
<div class="container move_left">
  <div class="row">
    <div class="col-md-8">
    
      <div class="page-header visible-md visible-lg list-header"> 
        <h3> 
        <a href="" title="前往欣赏 热门图片" target="_blank">
                热门周刊&nbsp;&nbsp;&nbsp;
                <small class="text-muted">景多图美，尽情观赏！</small>
                <small class="pull-right" >更多 <span class="glyphicon glyphicon-chevron-right"></span></small>
        </a>
        </h3>
      </div>
      
      <div class="row" id="ipost_list">
      
        <div class="col-sm-6">
          <div class="thumbnail list-theme list-theme-post">
            <a href="http://lol.duowan.com/ahri/" target="_blank"><img src="img/2.jpg" alt="九尾妖狐" class="img-responsive cover2"></a>
            <div class="caption">
              <h3>九尾妖狐</h3>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6">
          <div class="thumbnail list-theme list-theme-post">
            <a href="http://lol.duowan.com/riven/" target="_blank"><img src="img/5.jpg" alt="放逐之刃" class="img-responsive cover2"></a>
            <div class="caption">
              <h3>放逐之刃</h3>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6">
          <div class="thumbnail list-theme list-theme-post">
            <a href="http://lol.duowan.com/diana/" target="_blank"><img src="img/6.jpg" alt="皎月女神" class="img-responsive cover2"></a>
            <div class="caption">
              <h3>皎月女神</h3>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6">
          <div class="thumbnail list-theme list-theme-post">
            <a href="http://lol.duowan.com/sivir/" target="_blank"><img src="img/9.jpg" alt="战争女神" class="img-responsive cover2"></a>
            <div class="caption">
              <h3>战争女神</h3>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6">
          <div class="thumbnail list-theme list-theme-post">
            <a href="http://lol.duowan.com/syndra/" target="_blank"><img src="img/3.jpg" alt="暗黑元首" class="img-responsive cover2"></a>
            <div class="caption">
              <h3>暗黑元首</h3>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6">
          <div class="thumbnail list-theme list-theme-post">
            <a href="http://lol.duowan.com/akali/" target="_blank"><img src="img/8.jpg" alt="暗影之拳" class="img-responsive cover2"></a>
            <div class="caption">
              <h3>暗影之拳</h3>
            </div>
          </div>
        </div>
        
        
        
        
        
       </div>
                  
    </div>
  </div>
</div>
<!--主内容模块的结束  -->

<!--右侧边栏模块 -->
  <div class="siderbar">
  
    <div class="panel panel-default">
      <div class="panel-body">
      想好周末干嘛么？ <br/> <br/>我们与多玩英雄联盟一起，为小伙伴们游戏内外玩家休闲方案。  <br/> <br/>相信每个周末的美好时光都不会被辜负。
      </div>
    </div>
    
    <div class="thumbnail list-group visible-lg visible-md" >
      <a href="http://lol.duowan.com/" target="_blank"><img src="img/timor.jpg" class="img-responsive" title="多玩英雄联盟" alt=""></a>
    </div>
    <div class="thumbnail list-group visible-lg visible-md" >
      <a href="http://lol.duowan.com/hezi/" target="_blank"><img src="img/ez.jpg" class="img-responsive" title="多玩LOL盒子" alt=""></a>
    </div>
    
    
    
  </div>

<!--右侧边栏模块的结束  -->


<!-- 尾部导航-->
<footer class="container clearfix visible-lg visible-md tail" id="bottom">

  <div class="row">
    <div class="col-sm-12 text-muted text-center">
    友情链接：
    <a href="http://www.feekr.com/" class="text-muted" target="_blank">Feeker</a>  ·  
    
    <a href="http://www.e2e.cc/" class="text-muted" target="_blank">e2e</a>  ·  
    <a href="http://www.shejijia.com.cn/" class="text-muted" target="_blank">设计家</a>  ·  
    <a href="http://www.manshijian.com/" class="text-muted" target="_blank">慢时间</a>  ·  
    <a href="http://www.pinpaimima.com/" class="text-muted" target="_blank">品牌密码</a>  ·  
    <a href="http://www.ptu.so/" class="text-muted" target="_blank">旅游情报</a>  ·  
    <a href="http://lol.duowan.com/" class="text-muted" target="_blank">多玩游戏网</a>
    </div>
    <div class="col-sm-12 text-muted text-center">
      <a href="" class="text-muted">关于我们</a>  ·  
      <a href="" class="text-muted">联系我们</a>  ·   
      <a href="" class="text-muted">加入我们</a>  ·  
      <a href="" class="text-muted">服务协议</a>  ·  
      <a href="" class="text-muted">帮助中心</a>  ·  
      <a href="" class="text-muted">App</a>  ·  
      <a href="" target="_blank"  class="text-muted">订阅</a>
    </div>
    <div class="col-sm-12 text-muted text-center">
      &copy;2013-2014 scg版权所有  
    </div>
    
  </div>
</footer>
<!--尾部导航的结束  -->


<script src="js/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/open-connect.js"></script>

<!--   不使用<a href="">方式的跳转页面
<script>
$(function(){
      $('#btn_register').click(function(){
        window.location.href='account/register.html';
        });
      });
</script>
-->

<!--回到顶部模块  -->
<div class="go">
	<a title="返回顶部" class="top" href="#top"></a>
	<a title="如果您有意见，请反馈给我们！" class="feedback"  target="_blank" data-toggle="modal" data-target="#feedback"></a>
	<a title="返回底部" class="bottom" href="#bottom"></a>
</div>

<div class="modal fade" id="feedback" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">意见反馈</h4>
      </div>
      
      <div class="modal-body">
        <textarea id="fd" class="form-control" rows="7" placeholder="请写下你的意见"></textarea>
        <br>
        <input id="fdlink" type="text" class="form-control" placeholder="你的Email或QQ">
      </div>
      
      <div class="modal-footer">
        <button id="btn_fd_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button id="btn_fd" type="button" class="btn btn-primary">提交</button>
      </div>
      
    </div>
  </div>
</div> 
 
<script>
$('#btn_fd').click(function(){
	var fd = $('#fd').val();
	var fdlink = $('#fdlink').val();
	fd = $.trim(fd);//去掉首尾空格
	fdlink = $.trim(fdlink);
	
	if(fd == '' || fdlink == ''){
		alert('请填写你的意见和联系方式！');
		return false;
	}else{
	  alert("提交成功！");	
	}
	
		
	
});
</script>

<!--回到顶部模块的结束 -->




<!--底部标语模块  -->
<div class="bottom_guidance" id="bottom_guidance" >
  
  <div class="wrap">
    <span class="guide">为兴趣而生，欢迎来到撸友之家！</span>
    <a href="" class="more"></a>
  </div>
  
  <a href="javascript:void(0)" class="cancel" onClick="document.getElementById('bottom_guidance').style.display='none' "></a>
  
</div>
<!--底部标语模块的结束  -->







</body>
</html>

