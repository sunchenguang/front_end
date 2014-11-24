// JavaScript Document
$(function(){
	
	//广告滚动图片部分的开始
	var len=$(".num > li").length;
	var index=0;
	var adTimer;
	$(".num li").mouseover(function(){
		index=$(".num li").index(this);
		showImg(index);
	}).eq(0).mouseover();
	
	$(".ad").hover(function(){
		clearInterval(adTimer);
		
	},function(){
	    adTimer=setInterval(function(){
			showImg(index);
			index++;
			if(index==len){index=0;}
			
		},3000 );
		
	}).trigger("mouseleave");
	//广告滚动图片部分的结束
	
	
	//右侧下部产品列表横向滚动的开始(单个照片连续滚动)--（也可以4张照片一起滚动）
	var page=1;
	var i=4;
	var len=$(".prolist_content ul li").length;
	//var page_count=Math.ceil(len/i);
	//var none_unit_width=$(".prolist").width();
	//var none_unit_width=$(".prolist_content ul li").width();
	var none_unit_width=279;
	var $parent=$(".prolist_content");
	
	$(".goRight").click(function(){
		if(!$parent.is(":animated")){
			if(page==len){
				$parent.animate({left:0},800);
				page=1;
			}else{
				$parent.animate({left:"-="+none_unit_width},800);
				page++;
			}
			
		}
		
		
	});
	
	$(".goLeft").click(function(){
		if(!$parent.is(":animated")){
			if(page==1){
				$parent.animate({left:"-="+none_unit_width*(len-1)},800);
				page=len;
			}else{
				$parent.animate({left:"+="+none_unit_width},800);
				page--;
			}
			
		}
		
		
	});
	
	
	//右侧下部产品列表横向滚动的结束
	
	//右侧下部光标滑过产品列表的开始
	$(".content_right .prolist ul li").each(function(index) {
        var position=$(this).position();
		var li_left=position.left;
		var li_top=position.top;
		var img_width=$(this).find("img").width();
		var img_height=$(this).find("img").height();
var spanHtml='<span style="position:absolute; top:'+li_top+'px;left:'+li_left+'px;width:'+img_width+'px;height:'+img_height+'px; cursor:pointer;" class="imageMask"></span>';
        $(spanHtml).hover(function(){
		   $(this).addClass("imageOver");
			
		},function(){
			$(this).removeClass("imageOver");
		}).appendTo($(this).find("a"));		
		
		
    });
	
	
	
	
	
	
	
	//右侧下部光标滑过产品列表的结束
	
	
	
	
});


function showImg(index){
	var adHeight=$(".content_right .ad").height();
	$(".slider").stop(true,false).animate({top:-adHeight*index},1000);
	$(".num li").removeClass("on").eq(index).addClass("on");
	
}








