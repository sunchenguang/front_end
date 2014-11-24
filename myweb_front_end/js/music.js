// JavaScript Document

var myMusic = null;

var MyMusic = function(){
	var _this = this;
	var musicBox_H = document.getElementById("musicBox"); 
	var people = "../img/people/";
	
	//音乐列表
	var musicFiles=[new MusicObj("God is a girl","../musics/god is a girl.mp3","Groove Coverage","Covergirl",people+"GC.jpg",0,1),
					new MusicObj("画心","../musics/drawheart.mp3","张靓颖","画皮主题曲",people+"画心.jpg",0,1),
					new MusicObj("喜欢你","../musics/loveyou.mp3","邓紫棋","我是歌手某期",people+"邓紫棋.jpg",0,0),
					new MusicObj("虹之间","../musics/rainbow.mp3","金贵晟","爱情公寓4",people+"虹之间.jpg",1,0),
					new MusicObj("In another life","../musics/In Another Life.mp3","The Veronicas","Hook me up",people+"twins.jpg",0,0)];
					
	//播放模式 1-全部循环 2-单曲循环  3-随机播放
	var playMode = 1;
	//当前音乐播放的下标
	var index = -1;
	var length = musicFiles.length;
	var playMode_H = $("#playMode");
	var musicList_H = $("#musicList");
	var playMsg_H = $("#playMsg");
	var name = $("#name");
	var author = $("#author");
	var CD = $("#CD");
	var picInfo = $("#picInfo");
	var pop =$("#pop");
	var playMsg = null;
	
	_this.fristMusic = function(){
		index = 0;
		_this.play();
	}
	
	_this.playOrPause=function(){
		pop.addClass("Gray");
		var popVal = pop.attr("imgVal");
		if(popVal == 0){
			pop.attr("class","play");
			pop.attr("title","点击播放");
			pop.attr("imgVal","1");
			musicBox_H.pause();
		}else{
			pop.attr("class","stop");
			pop.attr("title","点击暂停");
			pop.attr("imgVal","0");
			musicBox_H.play();
		}
		
	}
	
	
	_this.end = function(){
		index = length -1;
		_this.play();
	}
	
	_this.lastMusic = function(){
		if(index == 0){
			index = length-1; 
		}else{
			index --;
		}
		_this.play();
	}
	
	
	_this.loadMusic = function(){
		for(var i in musicFiles){
			var html = "<li>"+musicFiles[i].name;
			if(musicFiles[i].hot == 1){
			    html+="<div class='hot'></div>";
			}
			if(musicFiles[i].newSong == 1){
				html+="<div class='new'></div>";
			}
			html+= "</li>";
			musicList_H.append(html);
	　　}
	};
	
	
	_this.nextMusic = function(){
		var currentMusic = null;
		
		switch(parseInt(playMode)){
			case 1:
			index ++;
			if(index>=length){
				index = 0;
			}
			break;
			case 2:
			if(index == -1){
				index = 0;
			}
			break;
			case 3:
			index = Math.floor(Math.random()*length);
			
			break;
		}
		_this.play();
	};
	
	
	_this.loadInfo = function(){
		name.text(musicFiles[index].name);
		author.text(musicFiles[index].author);
		CD.text(musicFiles[index].CD);
		picInfo.attr("src",musicFiles[index].people);
	};
	
	
	_this.play = function(){
		currentMusic = musicFiles[index];
		playMsg_H.text(musicFiles[index].name+"【"+musicFiles[index].author+"】");
		$(musicBox_H).attr("src",musicFiles[index].url);
		$("#musicList").children().each(function(i){
				$($("#musicList").children().get(i)).removeClass("liOn");
		}); 
		$($("#musicList").children().get(index)).addClass("liOn");
		_this.loadInfo();
		
		var popVal = pop.attr("imgVal");
		if(popVal == 1){
			pop.attr("class","stop");
			pop.attr("title","点击暂停");
			pop.attr("imgVal","0");
			musicBox_H.pause();
		}
		
		musicBox_H.play();
	};
	
	
	_this.init = function(){
		_this.loadMusic();
		var songheight = $("#songs").height();
		$("#infos").css("height",songheight+"px");
		playMode_H.change(function(){
			playMode = playMode_H.val();
		});
	};
	
	
}



$().ready(function(){
	myMusic = new MyMusic();
	myMusic.init();
	myMusic.nextMusic();
});


//音乐对象
function MusicObj(name,url,author,cd,people,hot,newSong)
{
	var _this = this;
	this.name = name;
	this.url = url;
	this.author = author;
	this.CD = cd;
	this.people = people;
	this.hot = hot;
	this.newSong= newSong;
}

