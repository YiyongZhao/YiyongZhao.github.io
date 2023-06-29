String.prototype.trim = function(){  
	return this.replace(/[ ]/g,"");   
}  
$(function(){
	
	var ind = 4;
	var nav= jQuery(".nav");
	var init = jQuery(".nav .m").eq(ind);
	var block = jQuery(".nav .block"); 
	block.css({"left":init.position().left-3}); 
	nav.hover(function(){},function(){ block.animate({"left":init.position().left-3},100); }); 

	jQuery(".nav").slide({ 
		type:"menu", 
		titCell:".m", 
		targetCell:".sub", 
		delayTime:300, 
		triggerTime:0, 
		returnDefault:true,
		defaultIndex:ind,
		startFun:function(i,c,s,tit){ 
			block.animate({"left":tit.eq(i).position().left-3},100);
		}
	});
	jQuery(".full_banner").slide({
		 titCell:".hd ul", 
		 mainCell:".bd ul", 
		 effect:"fold",  
		 autoPlay:true, 
		 autoPage:true,
		 trigger:"click",
		 interTime:3500
	});	
	jQuery(".notice_box").slide({mainCell:"#notice_scroll",effect:"topLoop", autoPlay:true,interTime:3500});
	
		$('.input_focus').focusout(function() {
		var _this_val = $(this).val().trim();
		if(_this_val == ''){
			$(this).val('请输入关键字...');
		}
	});
	
	
	$(document).keydown(function(e){
		var e = window.event||e;
		if(e.keyCode == 13){
			search_data_submit();
		}	
	})
	
	
	var kefu_list = $('.kefu_list');
	$('.kefu_icon').click(function(){
		var _this = $(this);
		_this.removeClass('kefu_icon_hide');
		_this.removeClass('kefu_icon_show');
		if(kefu_list.is(':visible')){
			_this.animate({'right':0},100);
			kefu_list.animate({'right':-134},100,function(){
				$(this).hide(0);	
				_this.addClass('kefu_icon_hide');
			});
		}else{
			_this.addClass('kefu_icon_show');
			_this.animate({'right':134},100);
			kefu_list.show(0).animate({'right':0},100);
		}
	});
	$('.kefu_list a').click(function(){
		$('.kefu_icon').removeClass('kefu_icon_hide');
		$('.kefu_icon').removeClass('kefu_icon_show');	
		kefu_list.hide(0);
		$('.kefu_icon').css('right',0);
	});
});

function focus_input(this_obj,default_str){
	var _this = $(this_obj);
	var _this_val = _this.val();
	if(_this_val == default_str){
		_this.val('');
		return false;
	}
}

function search_data_submit(){
	var seach_str = $('#seach_text').val().trim();
	if(seach_str.length < 1){
		return false;
	}
	$('#search_form_data').submit();
}



$(function() {

    $('.jdt').each(Slide);

});

function Slide() {
    var t; var n = 0; var p = $(this);
    var count = p.find('.pic a').size();
    p.find('.pic a:not(:first-child)').hide();
    p.find('.info').html(p.find('.pic a:first-child').find('img').attr('alt'));
    p.find('.btn li:first-child').css('background-image', 'url(./images/dot2.png)');
    p.find('.info').click(function() { window.open(p.find('.pic a:first-child').attr('href'), '_blank') });
    p.find('.btn li').click(function() {
        var i = $(this).attr('idx') - 1;
        n = i;
        if (i >= count) return;
        p.find('.info').html(p.find('.pic a').eq(i).find('img').attr('alt'));
        p.find('.info').unbind().click(function() { window.open(p.find('.pic a').eq(i).attr('href'), '_blank') })
        p.find('.pic a').filter(':visible').fadeOut(500).parent().children().eq(i).fadeIn(1000);
        $(this).css('background-image', 'url(./images/dot2.png)').siblings().css('background-image', 'url(./images/dot1.png)');
    });
    t = setInterval(function() {
        n = n >= (count - 1) ? 0 : n + 1;
        p.find('.btn li').eq(n).trigger('click');
    }, 5000);
    p.hover(function() { clearInterval(t) }, function() {
        t = setInterval(function() {
            n = n >= (count - 1) ? 0 : n + 1;
            p.find('.btn li').eq(n).trigger('click');
        }, 5000);
    });
}