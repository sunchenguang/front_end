// JavaScript Document
$(function(){
	
	//左侧产品图片放大镜效果的开始
	$(".jqzoom").jqueryzoom({
		xzoom:300,
		yzoom:300,
		offset:10,
		position:"right",
		preload:1
	});
	//左侧产品图片放大镜效果的结束
	
	//单击左侧产品小图片切换为大图片的开始
	$(".small_photo img").livequery("click",function(){
		var imgSrc=$(this).attr("src");
		//alert(imgSrc);
		var i=imgSrc.lastIndexOf(".");
		var uit=imgSrc.substring(i);
		imgSrc=imgSrc.substring(0,i);
		var imgSrc_small=imgSrc+"_small"+uit;
		var imgSrc_big=imgSrc+"_big"+uit;
		$("#bigImg").attr({"src":imgSrc_small,"jqimg":imgSrc_big});
		$("#thickImg").attr("href",imgSrc_big);
	});
	//单击左侧产品小图片切换为大图片的结束
	
	//左侧产品属性介绍之类的选项卡的开始
	var $div_li=$("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		var index=$div_li.index(this);
		$("div.tab_box > div").eq(index).show().siblings().hide();
		
	}).hover(function(){
		$(this).addClass("hover");
		
	},function(){
		$(this).removeClass("hover");
	});
	//左侧产品属性介绍之类的选项卡的结束
	
	//右侧产品颜色切换的开始
	$(".color_change ul li img").click(function(){
		var imgSrc=$(this).attr("src");
		var i=imgSrc.lastIndexOf(".");
		var uit=imgSrc.substring(i);
		imgSrc=imgSrc.substring(0,i);
		var imgSrc_small=imgSrc+"_one_small"+uit;
		var imgSrc_big=imgSrc+"_one_big"+uit;
		$("#bigImg").attr({"src":imgSrc_small,"jqimg":imgSrc_big});
		$("#thickImg").attr("href",imgSrc_big);
		var alt=$(this).attr("alt");
		$(".color_change strong").text(alt);
	});
	//右侧产品颜色切换的结束
	
	//右侧产品尺寸切换的开始
	$(".pro_size li span").click(function(){
		$(this).parents("ul").siblings("strong").text( $(this).text() );
		
		
	});
	//右侧产品尺寸切换的结束
	
	//右侧产品数量和价格联动的开始
	var $span=$("div.pro_price span");
	var price=$span.text();
	$("#num_sort").change(function(){
		var num=$(this).val();
		var amount=num*price;
		$span.text(amount);
		
		
	}).change();
	//右侧产品数量和价格联动的结束
	
	//右侧给产品评分效果的开始
	$("ul.rating li").click(function(){
		var title=$(this).attr("title");
		//alert("你给此商品的评分是"+title);
		var cl=$(this).attr("class");
		$(this).parent().removeClass().addClass("rating "+cl+"star");
		//$(this).blur();
		
		
	});
	//右侧给产品评分效果的结束
	
	//最终提示用户购买的开始
	var $product=$(".pro_detail_right");
	$("#cart a").click(function(){
		var pro_name=$product.find("h4:first").text();
		var pro_size=$product.find(".pro_size strong").text();
		var pro_color=$(".color_change strong").text();
		var pro_num=$product.find("#num_sort").val();
		var pro_price=$product.find(".pro_price span").text();
		var dialog="感谢您的购买。\n您购买的\n"+"产品是："+pro_name+" ;\n"+"尺寸是："+pro_size+" ;\n"+"颜色是："+pro_color+" ;\n"+"数量是："+pro_num+" ;\n"+"总价是："+pro_price+" 元";
		
		if(confirm(dialog)){
		   alert("您已经下单！");
		}
		return false;
	 	
	});
	
	
	
	
	//最终提示用户购买的结束
	
	
	
});


