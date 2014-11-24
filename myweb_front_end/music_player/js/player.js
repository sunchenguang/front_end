//html5音乐播放器（jquery）
//scg 2014.8.1
//update 2014.8.6
//-----------------页面初始化
function init(){
//读取音乐
readmusic(0);
//绑定事件
closelist();
playlistclick();	
modeSwitch();
lrcSwitch();
styleSwitch();
closeTip();
optips();
}
//----------------------------------------------------------------播放器初始化
function initPlayer(){
var player =new Player();
//播放按钮
$("#play").bind("click",function(){
		playclick();
});
//上一曲
$("#beforesong").bind("click",function(){
	prePlay();
});
//下一曲
$("#aftersong").bind("click",function(){
	nextPlay();
});
getVol();
mute();
changeCurrTime();
listenkey();
}

//-------------------------------------------------------------------------------------读取歌曲信息
function readmusic(id){
		var stylename =$("#stylechange").attr("name");
		var e=0;
		$.ajax({
				url: "music/"+stylename+".xml",
				dataType: "xml",
				type: 'GET',
				timeout: 2000,
				error: function(jqXHR, textStatus, errorThrown)
				{
					var mes = "读取歌曲列表失败，请刷新后重试！";
					tipSwitch("on",mes);
				},
				success: function(data)
				{
					 var xml; 
					if (/msie/.test(navigator.userAgent.toLowerCase())) {
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async = false;
						xml.loadXML(data);
					} else {
						xml = data;
					}
					if(id == 0){
								//获取曲目数
								$(xml).find("music").each(function(i){
										e++;
								});
								$("#count").text(e);
								//填充播放列表
								fill_list(xml);
					}else{
						 getmusic(xml,id);
					}
				}
			});
}
//-----------------------------------------------------------------------------------------------初始化播放列表
function fill_list(xml){
	$("#m_list").html("");
	$(xml).find("music").each(function(i){
		var name = $(this).children("name").text();
		var mid = $(this).attr("id");
		//初始化UL
		var m_content='<ul id="music_info" class="music_info">';
		//添加歌曲名
		var mname = name == "" ? "暂无" : name ;
		var li_name ="<li id = 'music_name" + mid + "' class = 'music_name'  title = '曲目" + mid + "' >" + mname + "</li>";
		m_content+=li_name;
		//添加id
		var li_id ="<li id='music_id' >" + mid + "</li>";
		m_content += li_id + "</ul>";
		$("#m_list").append(m_content);
	});
	//绑定播放列表功能
		movelist();
}
//-----------------------------------------------------------------------------------------------【功能】播放列表开关
function closelist(){
	$("#closelist").click(function(){
	  $("#musiclist").hide();
	});
	$("#showlist").click(function(){
		if($("#musiclist").is(":hidden")?true:false){
				$("#musiclist").show();
				$("#showlist").attr("title","关闭播放列表");
		}else{
				$("#musiclist").hide();
				$("#showlist").attr("title","打开播放列表");
		}
	});
}
//---------------------------------------------------------------------------------------【功能】拖拽播放列表
function movelist(){
	var _move =false;
	$("#listcount").click(function(){ 
       //（松开后触发）  
        }).mousedown(function(e){  
        _move=true;  
    
	
	    _x=e.pageX-parseInt($("#musiclist").css("left"));  
        _y=e.pageY-parseInt($("#musiclist").css("top"));  
	
		
        $("#musiclist").fadeTo(20, 0.5);//点击后开始拖动并透明显示  
		}).mouseup(function(){  
			$("#musiclist").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明  
			_move=false;  
			return false;		
			});  
		$(document).mousemove(function(e){  
			if(_move){  
				var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
				var y=e.pageY-_y;  
				$("#musiclist").css({top:y,left:x});//控件新位置  
			}  
		});
}
//------------------------------------------------------------------------------------------【功能】点选歌曲播放
function playlistclick(){
	$('#m_list').on('click', '.music_name', function(e){
		playingHigh(this);
		readmusic($(this).next().text());
		musicReady();
    });
}
//---------------------------------------------------------------------------------------【子系统：播放列高亮】
function playingHigh(_this){
			$(".playing_img").detach();
			$(".music_name").removeClass("playing");
			$(_this).addClass("playing").prepend("<div class='playing_img'></div>");
}
//-------------------------------------------------------------------------------------------获取指定音乐信息
function getmusic(xml,id){
		$(xml).find("music").each(function(i){
			var mid = $(this).attr("id");
			if((mid*1) == id){
				//添加歌曲名
				var name = $(this).children("name").text();
				$(".musicname").html( name == "" ? "暂无" : name);
				$(document).attr("title",name);//修改title值
				//添加作者
				var author = $(this).children("author").text();
				$(".singer").html( author == "" ? "暂无" : author);
				//添加专辑
				var album = $(this).children("album").text();
				$(".album").html( album == "" ? "暂无" : album);
				//添加专辑图
				var coverimg = $(this).children("cover").text() ;
				var cover = coverimg == "" ? "images/123.jpg" : coverimg;
				$("#m_img").css("background", "url(" + cover + ")" );
				//添加滚动信息
				var marr = "<p>歌手：" + author + "</p><p>歌曲：" + name + "</p><p>专辑：" + album + "</p>";
				$("marquee").html(marr);
					//添加地址
					var url = $(this).children("src").text();
					if(url == ""){
						var mes = "播放失败，音乐读取错误！";
						tipSwitch("on",mes);
					}else{
						var lrc = $(this).children("lrc").text();
						play(url,id,lrc);
					}
				}
	});	
}
//---------------------------------------------------------------------------播放和暂停
function playclick(){
	var playbtn =$(".playbutton").attr("id");
	if (playbtn=="playbutton") toPlay("play");
	if (playbtn=="pausebutton") toPlay("pause");	
}
//----------------------------------------------------------------------------------------------装填地址，并高亮选中的曲目
function play(url,id,lrc){
	
		$("#musicplayer").attr("src",url);
		var $playid =$("#music_name"+id);
		playingHigh($playid);
		if(lrc == null || lrc == ""){
			$("#lrc_content").html("<li class='nolrc'>暂无歌词</li>");
		}else{
			$("#lrc_content").html("<li class=\"nolrc\">歌词加载中</li>");
			readlrc(lrc);
		}
}
//----------------------------------------------------------------------------------------------------【功能】播放与暂停
function toPlay(toplay){
	//播放第一首
	if($(".playing").length == 0){
			  readmusic(1);
		}
	 if(toplay=="play"){
		setTimeout("isplay()",100);
    }
    if(toplay =="pause"){
       ispause();
    }
}
//---------------------------------------------------------------------------------------【子系统：播放与暂停执行操作】
function isplay(){
	 $("#musicplayer")[0].play();
	 $("#play").attr("title","暂停");
	  animation("running");
      $(".playbutton").removeAttr("id").attr("id","pausebutton");
	  setTimeout("getTime()",100);	
	  $(".playing_img").removeClass("pause_img");
	   lrcMove(true);
}
function ispause(){
	$("#musicplayer")[0].pause();
	$("#play").attr("title","播放");
	animation("paused");
     $(".playbutton").removeAttr("id").attr("id","playbutton");	
	 $(".playing_img").addClass("pause_img");
	  lrcMove(false);
}
//---------------------------------------------------------------------------------------------------【功能】上/下一曲
function prePlay(){
	var curr_mode =$(".modebtn").attr("id");
	var curr_id= $(".playing").next().text();
	alert(curr_id);
	if(curr_id ==null||curr_id==""){
		toPlay("play");
	}else{
		playMode(curr_mode,"pre");
	}

}
//下一曲
function nextPlay(){
	var curr_mode =$(".modebtn").attr("id");
	var curr_id= $(".playing").next().text();
	if(curr_id ==null||curr_id==""){
		toPlay("play");
	}else{
		playMode(curr_mode,"next");
	}
}
//----------------------------------------------------------------------------------------------------播放模式
function  playMode(mode,direction){
	//第一首id
	var first_id =parseInt($(".m_list>ul:first>#music_id").text());
	//当前播放id
	var curr_id= parseInt($(".playing").next().text());
	//最后一首id
	var last_id =parseInt($(".m_list>ul:last>#music_id").text());
	//计算出来的id
	var result=0;
	//-------------------------------------------------------------------------子系统【列表循环】【单曲循环】
	if(mode=="looptype"||mode=="single"){
		//-----------------上一曲
		if(direction=="pre"){
			
			//当前播放的是第一首,播放最后一首
			if(curr_id==first_id){
				result=last_id;
			}else{
				result=curr_id-1;
			}
		}
		//-----------------下一曲
		if(direction=="next"){
			//当前播放的是最后一首,播放第一首
			if(curr_id==last_id){
				result=first_id;
			}else{
				result=curr_id+1;
			}
		}
	}
	//--------------------------------------------------------------------------	子系统【顺序播放】
	//这里播放完最后一曲的处理是直接停止，但是会导致点击下一曲也无法播放
	if(mode=="seqtype"){
		//上一曲
		if(direction=="pre"){
			//当前播放的是第一首,stop
			if(curr_id==first_id){
				return;
			}else{
				result=curr_id-1;
			}
		}
		//下一曲
		if(direction=="next"){
			//当前播放的是最后一首,stop
			if(curr_id==last_id){
				return;
			}else{
				result=curr_id+1;
			}
		}
	}
	//--------------------------------------------------------------------------- 子系统【随机播放】
	if(mode=="randtype"){
		result =parseInt((last_id-1)*Math.random()+1);
	}
	//启动播放
	readmusic(result);
	musicReady();
}

//----------------------------------------------------------------------------------------歌曲读取完毕
function musicReady(){
	toPlay('play');
	$("#lrc_content").css("margin-top", "0px");
}

//--------------------------------------------------------------------------------------------------【播放时间及进度条】
function getTime(){
 var audio=$("#musicplayer")[0];
 $("#musicplayer").bind("timeupdate","audio",function(){
  if (!isNaN(audio.duration)) {
        //剩余时间
        var surplus= audio.duration-audio.currentTime;
        var surplusMin = format(surplus,"m");
        var surplusSecond = format(surplus,"s");
        $('#rest_time').html( surplusMin + ":" +surplusSecond);
        //播放进度条
        var progressValue = audio.currentTime/audio.duration*410;
        $('.curr_bar').css("width",parseInt(progressValue) + 'px') ;
		var currtimeValue = format(audio.currentTime,"m")+":"+format(audio.currentTime,"s");
		$('.curr_bar').attr("title",currtimeValue);
    };
 },false);
}
 //-------------------------------------------------------------------------------------------------格式化时间 获得分钟数和秒数
 function format(_time,ms){
 //返回分
	 if(ms=="m") {
		return parseInt(_time/60);
	 }
 //返回秒
 if(ms=="s"){
     var Second = parseInt(_time%60);
	if (Second < 10 ) {
            Second = '0'+Second;
        };
		return Second;
	}
 }
//----------------------------------------------------------------------------------------------创建播放器
function Player(){
		var musicplay = document.createElement("audio");
		musicplay.id = "musicplayer";
		document.getElementById("player").appendChild(musicplay);
		subSystem();
}
//-----------------------------------------------------------------------子系统【播放器事件监听】
function subSystem(){
	 var audio=$("#musicplayer")[0];
	 //播放完毕
	 $("#musicplayer").bind("ended","audio",function(){
		nextPlay();
	 },false);
	 //加载错误
	  $("#musicplayer").bind("error","audio",function(){
			var mes ="音乐加载失败，请检查网络或者歌曲链接！";
			tipSwitch("on",mes);
	 },false);
	 
	 //切换到静音
	  $("#musicplayer").bind("volumechange","audio",function(){
		if(audio.volume == 0){
		$(".volume_bg").css("background-position","-20px -185px");
		}else{
		$(".volume_bg").css("background-position","  0   -185px");
		}
	 },false);
}
//-----------------------------------------------------------------------------------------音量控制器初始化
function  getVol(){
	var audio=$("#musicplayer"); //$("#musicplayer")[0]
	// 初始化音量
	var init_vol=((audio.volume/1)*70)+"px";
	var init_volcover=(70-((audio.volume/1)*70))+"px";
	//白色条
    $(".cur_vol_bar").css("height",init_vol);
	//空白条
	$(".cur_vol_cover").css("height",init_volcover);
	//音量调节
	volSwitch();
	
}
//------------------------------------------------------------------------------------------【功能】音量调节
function  volSwitch(){
	var _move =false;
	var minbtn =214;
	var maxbtn=274;
	$(".volbutton").click(function(){ //click 是按下又松开后触发
       //（松开后触发）  
        }).mousedown(function(e){   //mousedown是按下就触发
			_move=true;  
			_y=e.pageY-parseInt($(".volbutton").css("top"));  
		}).mouseup(function(){   
			_move=false;  
			return false;		
		});
		$('#volbar').bind("mouseleave",function(){ 
				_move=false;  
		});   
		$(document).mousemove(function(e){  
				if(_move){  
					var y=e.pageY-_y;  
					if( y>maxbtn) y=maxbtn;
					if( y<minbtn) y=minbtn;
					$(".volbutton").css("top",y);//控件新位置  
					var curr_scale=(y-minbtn)/60;
					volmove(curr_scale);
					changeVol(curr_scale);
				}  
		});	
}
//--------------------------------------------------------------------------------------------音量条移动
//这里处理的不好
function  volmove(curr_scale){
					// 获取当前位置距离底部的百分比
					var currvol=  1-curr_scale;
					//截取小数点后两位
					var vol_h = currvol*60+10;
					var curr_bar =vol_h.toFixed(0)+"px";                        //toFixed(x) 四舍五入取x位小数 
					var curr_h = (70-vol_h).toFixed(0)+"px";
					//白色条
					$(".cur_vol_bar").css("height",curr_bar);
					 //空白条
					$(".cur_vol_cover").css("height",curr_h);
}
// ---------------------------------------------------------------------------------------------设置播放器音量
function  changeVol(curr_scale){
	var audio =$("#musicplayer")[0];
	var volscale = (1-curr_scale).toFixed(1);
	audio.volume=volscale;
	$(".volbutton").attr("title",volscale);
}
 //---------------------------------------------------------------------------------------------旋转动画开关
 function animation(state){
	 if(state =="paused"){
	  $(".m_img").css({
	  "animation-play-state":"paused",
	  "-webkit-animation-play-state" : "paused",
	  "-moz-animation-play-state ": "paused"
	  });
	  }
	 if(state =="running"){
	   $(".m_img").css({ 
	   "animation-play-state":"running",
	   "-webkit-animation-play-state ": "running",
	   "-moz-animation-play-state ": "running"
	   });
	  }
 }
//-----------------------------------------------------------------------------------------播放模式开关
 function modeSwitch(){
	//打开
	$("#playmode").click(function(){
		$(this).hide();
		$("#modearea").show();
	});
	//选择后关闭
	$("#modearea>div").click(function(){
			$("#playmode").show();
			$("#modearea").hide();
			//获取图标
			var newposition =$(this).css("background-position");
			//获取模式
			var newmode=$(this).attr("class");
			$(".modebtn").removeAttr("id").attr("id",newmode).css("background-position",newposition);
			//如果设定模式为单曲
			 var audio=$("#musicplayer")[0];
			if(newmode=="single"){
				 audio.loop=true;
			}else{
				 audio.loop=false;
			}
	});
	//鼠标移开关闭
	$("#modearea").mouseleave(function(){
			$("#modearea").hide();
			$("#playmode").show();
	});
 }
//------------------------------------------------------------------------------------------静音开关
function  mute(){
	var audio =$("#musicplayer")[0];
	$(".volume_bg").click(function(){
		var curr_volnum=$(".volbutton").attr("title");
		var title= $(this).attr("title")
		if(title=="静音"){
			$(this).css("background-position","-20px -185px").attr("title","关闭静音");
			audio.volume=0;
			$(".volbutton").attr("title",curr_volnum);
		}
		if(title=="关闭静音"){
			$(".volume_bg").css("background-position","0 -185px").attr("title","静音");	
			audio.volume=curr_volnum;
		}
	});
}	
//-------------------------------------------------------------------------------------调节歌曲进度
function  changeCurrTime(){
	var audio =$("#musicplayer")[0];
   $("#pg_bar_bg").click(function(e){
		if(!audio.paused){
		//点击的位置
		 var wx=e.pageX -$(this).offset().left;
		$('.curr_bar').css("width",parseInt(wx) + 'px') ;
		//计算点击歌曲百分比
		var clicktime =(wx/410)*audio.duration;
		audio.currentTime=clicktime.toFixed(0);
		//清除歌词高亮
			$("#lrc_content>li").removeClass("currlrc");
		}
   }).mousemove(function(e){
   	if(!audio.paused){
	var show_w =e.pageX -$("#player").offset().left-15;
	$("#timetips").css("left",show_w);
		var wx=e.pageX -$(this).offset().left;
		//计算点击歌曲百分比
		var clicktime =(wx/410)*audio.duration;
		var surplusMin = format(clicktime,"m");
        var surplusSecond = format(clicktime,"s");
        $('#wordtip').html( surplusMin + ":" +surplusSecond);
	}
   }).mouseover(function(){
   	if(!audio.paused){
	$("#timetips").show();
	}
   }).mouseout(function(){
   	if(!audio.paused){
   $("#timetips").hide();
   }
   })
}
//------------------------------------------------------------------------------歌词开关

function lrcSwitch(){
	$("#lrcswitch").click(function(){
			if($(this).attr("title") =="开启中"){
					$(this).css("text-decoration","line-through").attr("title","关闭中");
					$("#lrcshow").hide();
					 lrcMove(false);
					return;
			}
			
			if($(this).attr("title") =="关闭中"){
					$(this).attr("title","开启中").css("text-decoration","none");
					$("#lrcshow").show();
					 lrcMove(true);
			}
	})
}
//-------------------------------------------------------------------------------读取lrc文件
function readlrc(lrcname){
		$.ajax({
				url: lrcname,
				dataType: "text",
				type: 'GET',
				timeout: 1000,
				error: function()
				{
					$("#lrc_content").html("<li class=\"nolrc\">读取歌词失败，请刷新后重试！</li>");
				},
				success: function(data)
				{
					var lrcArray=[],timeArray=[];
					var lrcVal = decodeURIComponent(data.replace(/\[\d\d:\d\d.\d\d]/g , ""));
					lrcArray = lrcVal.split('\n');
					data.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){
                    var min = arguments[1] | 0, //分
                        sec = arguments[2] | 0, //秒
                        realMin = min * 60 + sec; //计算总秒数
						timeArray.push(realMin);
					});
					$("#lrc_content").html("");
					for(var i = 0;i < 3; i++){
						$("#lrc_content").append("<li timeline=''></li>");
					}
					for(var j = 0;j < lrcArray.length; j++){
						$("#lrc_content").append("<li timeline = '"+timeArray[j] + "'>" + lrcArray[j] + "</li>");
					}
				}
			});
}
//-------------------------------------------------------------------------------------歌词展示
function lrcShow(currtime){
	var $li = $("#lrc_content>li");
	for(var i = 0; i < $li.length; i++){
		var currlrc = $li.eq(i).attr("timeline");
		if(currlrc > 0 && currlrc == currtime){
				$li.eq(i-1).removeClass("currlrc");
				$li.eq(i).addClass("currlrc");
				//歌词滚动
				var distance = -24*(i-2)
				 $("#lrc_content").animate({"margin-top": distance+"px"}, "fast");  
		}
	}
}
//----------------------------------------------------------------------------------------歌词滚动

function lrcMove(move){
	if(typeof(timer) != 'undefined')  clearInterval(timer);
	var audio =$("#musicplayer")[0];
		if(move){
			timer = setInterval(function(){
			 lrcShow(audio.currentTime.toFixed(0));
			},500);
		}else{
		  clearInterval(timer);
		}
    }
//------------------------------------------------------------------------------风格切换开关

function styleSwitch(){
	//打开动画
	$("#stylechange").click(function(){
			 $("#player").fadeOut("slow");
			 $("#musicstyle").show().css({
			   "-webkit-animation":"fadeInLeftBig 1s .1s ease both",
			   "-moz-animation":"fadeInLeftBig 1s .1s ease both",
			   "animation":"fadeInLeftBig 1s .1s ease both"
			 })
	});
	//点击风格 关闭操作
	$("#musicstyle > div[class ^= 'style']").click( function(){
		var stylename =$(this).attr("id");
		$("#stylechange").attr("name",stylename);
		$("#explain").html("当前频道:" + $(this).attr("title"));
		$("body").css("background-image","url(images/" + stylename + ".jpg)");
		 $("#player").fadeIn("slow");
		 $("#musicstyle").slideUp("slow").css({
			 "-webkit-animation":"",
			"-moz-animation":"",
			"animation":""
			 });
			readmusic(0);
			//延时播放，防止网络不好情况下失效
			setTimeout("nextPlay()",1000);
			
		});
		$(".stlclose").click( function(){
			 $("#player").fadeIn("slow");
		 $("#musicstyle").slideUp("slow").css({
			 "-webkit-animation":"",
			"-moz-animation":"",
			"animation":""
			 })
		});

}
//------------------------------------------------------------------------------------提示功能
function  closeTip(){
	$("#confbtn").click(function(){
		tipSwitch("off","");
	});
}
function tipSwitch(on,mes){
	$("#tipcontent").html("");
	if(on == "on"){
		$("#tipcontent").html(mes);
		$("#tipbg").show();
		$("#tips").show();
		return;
	}
	if(on == "off"){
		$("#tipbg").hide();
		$("#tips").hide();
	}
}
//------------------------------------------------------监听键盘事件
function listenkey(){
	    $(document).keypress(function(e)    
        {    
            switch(e.keyCode )    
            {    
                // 空格    
                case 0:   playclick();    
                            break;              
                // 左
                case 37:   prePlay(); 
                            break;    
                //  右
                case 39:  nextPlay(); 
                            break;   
            }    
        });  
}
//---------------------操作说明
function optips(){
 $("#optips").click(function(){
	 $("#opsm").animate({right: '0px'}, "slow");
 });
 $("#opsm").mouseleave(function(){
	 $("#opsm").animate({right: '-160px'}, "slow");
 });
}