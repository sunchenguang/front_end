// JavaScript Document
$(function(){
	
	//最新动态自定义超链接提示的开始
  var x=10;
  var y=20;  	
  $("a.tooltip").mouseover(function(e){
	  this.myTitle=this.title;
	  this.title="";
	  var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
	  $("body").append(tooltip);
	  $("#tooltip").css({
		  "top":(e.pageY+y)+"px",  
		  "left":(e.pageX+x)+"px"
      }).show("fast");
	  
	  
  }).mouseout(function(){
	  this.title=this.myTitle;
	  $("#tooltip").remove();
	  
  }).mousemove(function(e){
	  $("#tooltip").css({
		   "top":(e.pageY+y)+"px",  
		   "left":(e.pageX+x)+"px"
	  });  
	  
  });	
	//最新动态自定义超链接提示的结束
	
	//产品分类节点伸缩部分的开始
	$(".m-treeview > li > span").click(function(){
		var $ul=$(this).siblings("ul");
		if($ul.is(":visible")){
			$(this).parent().attr("class","m-collapsed");
			$ul.hide();
		}else{
			$(this).parent().attr("class","m-expanded");
			$ul.show("slow");
		}
		
		
		
		
		return false;
		
	});
	//产品分类节点伸缩部分的结束
	
	//最新动态，产品分类模块伸缩的开始
	$(".module_up_down1").click(function(){
	   $self=$(this);
	   $self.prev().slideToggle(600);
	var aa=$("img",$self)[0].src;
	 if(aa=="file:///G:/wamp5/WAMP5-v1.7.4/wamp/www/shopping/img/up.png"){
		 $("img",$self).attr("src","img/down.png");
		 
	 }else if(aa=="file:///G:/wamp5/WAMP5-v1.7.4/wamp/www/shopping/img/down.png"){
		 $("img",$self).attr("src","img/up.png");
		 
	 }
	
	
	});
	
	
	$(".module_up_down2").click(function(){
	   $self=$(this);
	   $self.prev().slideToggle(600);
	var aa=$("img",$self)[0].src;
	 if(aa=="file:///G:/wamp5/WAMP5-v1.7.4/wamp/www/shopping/img/up.png"){
		 $("img",$self).attr("src","img/down.png");
		 
	 }else if(aa=="file:///G:/wamp5/WAMP5-v1.7.4/wamp/www/shopping/img/down.png"){
		 $("img",$self).attr("src","img/up.png");
		 
	 }
	
	
	});
	//最新动态，产品分类模块伸缩的结束
	
	//最新动态部分滚动的开始
	var $this=$(".scrollNews");
	var scrollTimer;
	$this.hover(function(){
	   clearInterval(scrollTimer);
	
	},function(){
		scrollTimer=setInterval(function(){
			scrollNews($this);
			},3000);
	
	
	}).trigger("mouseleave");
	//最新动态部分滚动的结束
	
	
	
});


function scrollNews(obj){
	var $self=obj.find("ul:first");
	var lineHeight=$self.find("li:first").height();
	$self.animate({"marginTop":-lineHeight+"px"},600,function(){
	   $self.css({marginTop:0}).find("li:first").appendTo($self);	
		
	});
	
	
}