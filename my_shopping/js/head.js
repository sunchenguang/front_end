// JavaScript Document
$(function(){
	
	//导航栏悬停效果的开始
	$("#navigation ul li:has(ul)").hover(function(){
	       $(this).children("ul").stop(true,true).slideDown(400);	
	},function(){
		    $(this).children("ul").stop(true,true).slideUp("fast");	
	});
	//导航栏悬停效果的结束
	
	//换皮肤颜色功能的开始
	var $li=$("#skin li");
	$li.click(function(){
	   	switchSkin(this.id);
	});
	var cookie_skin=$.cookie('MyCssSkin');
	if(cookie_skin){
	    switchSkin(cookie_skin);
	}
	//换皮肤颜色功能的结束
	
	
	
	
	
	
	
	
});

function switchSkin(skinName){
	$("#"+skinName).addClass("selected").siblings().removeClass("selected");
	$("#cssfile").attr("href","css/"+skinName+".css");
	$.cookie('MyCssSkin',skinName,{path:'/',expires:10});
	
}









