var $ = jQuery.noConflict(),_ww,_wh,_wl;

var Blank ={
	
	win_wid_hit : function(){
		_ww  = $(window).width();
		_wh  = $(window).height();	
		_wl =  window.location.href;
	},
	
	loadlogo : function(){
		$(".loader").fadeOut("slow");
	},
	loadpage : function(){
			
		$(document).on('click','.ajx',function(event){
			event.preventDefault();	
			Blank.win_wid_hit();
			var cur = $(this).attr('href');
			var host = window.location.hostname; //remove 4000 when live
			var page = 'http://'+host+cur;
			
			if(_wl == page) {
				return false;
			}
			
			if ( $(this).hasClass('information-page') ){
				$('body').addClass('information-page');
			}
			else if( $(this).hasClass('post-link') ){
				$('.page-wrapper').addClass('post-page');
			}
			else{
				$('body').removeClass('information-page');
				$('.page-wrapper').removeClass('post-page');
			}
			
			$.ajax({
				url: page ,
				type: 'get',
				beforeSend: function(){
					$('.page-content').removeClass('loaded');		
					$('.page-content').addClass('loading');
			   },				
				success: function(data){
					$('.page-wrapper').html($(data).find('.inset').html());
						var newTitle = $(data).filter('title').text();
						document.title = newTitle;
				}
			})
			if(page!=window.location){
				window.history.pushState({path:page},'',page);
			}
			
		});		
	},
	
	slider_func : function(){
		if(jQuery('.flexslider').length){
			jQuery('.flexslider').flexslider({
			animation: "fade",
			controlNav: false,
			directionNav: true,
			slideshowSpeed: 3000,
			animationSpeed: 600,
			touch: true,
			start: function(slider) {
						jQuery('#sliderNext').on('click', function(e){
							jQuery('.flex-next').trigger('click');
						});
						jQuery('#sliderPrev').on('click', function(e){
							jQuery('.flex-prev').trigger('click');
						});	
						jQuery('.total-slides').text(slider.count);
						$('.slides li img , .slide-image').click(function(event){
							event.preventDefault();
							slider.flexAnimate(slider.getTarget("next"));
						});						
					  },
					  after: function(slider) {
						jQuery('.current-slide').text(slider.currentSlide+1);
					 }
			});
		}		
	},	
	slider_height : function(){
		Blank.win_wid_hit();
		if( _ww > 769){
			var slide_image = _wh - 250;
			$(".slide-image").css({"height":slide_image});
		}
	},
	
	masonry_func : function(){
		$('.grid').masonry({
		  itemSelector: '.grid-item',
		  columnWidth: '.grid-sizer',
		  percentPosition: true,
		});				
	},
	
	share_info_clk : function(){

		var back_url = jQuery('.back').attr('href');
		   jQuery('li[data-related = "info"]').click(function(){
			   jQuery('div#share').removeClass('active');
			   jQuery('div#info').toggleClass('active');
			   jQuery('li[data-related = "share"] .close').hide();
			   jQuery(this).find('.close').toggle();
				if ( $('div.pop_up').hasClass('active') )
				{
					
					jQuery('.pop_up_wrapper').addClass('open');
					jQuery('.back').attr('href','javascript:void(0)');

				}
				else{
					
					jQuery('.pop_up_wrapper').removeClass('open');
					jQuery('.back').attr('href', back_url);		
				}		
		   });
			
		   jQuery('li[data-related = "share"]').click(function(){
			   jQuery('div#info').removeClass('active');   
			   jQuery('div#share').toggleClass('active');
			   jQuery('li[data-related = "info"] .close').hide();
			   jQuery(this).find('.close').toggle();
				
				if ( jQuery('div.pop_up').hasClass('active') )
				{
					   jQuery('.pop_up_wrapper').addClass('open');
					   jQuery('.back').attr('href','javascript:void(0)');
					   
				}
				else{
					jQuery('.pop_up_wrapper').removeClass('open');
					jQuery('.back').attr('href', back_url);
					
				}
			   
		   });
		   
		jQuery('.back').click(function(){
			jQuery('.pop_up_wrapper').removeClass('open');
			jQuery('.pop_up').removeClass('active');
			jQuery('.close').hide();
			var preUrl = $('.back').attr('href');
			jQuery('.back').attr('href', back_url);
			if(preUrl != back_url)
			{
				return false;
			}
		});	
		
		
	},

	
	ajx_reint : function() {
		Blank.masonry_func();
		Blank.slider_func();
		Blank.slider_height();
		Blank.share_info_clk();
	}
	
}



jQuery(window).on("load resize",function(){
	
	Blank.slider_height();
	slider_mobile();

	
});

jQuery(window).load(function(){
Blank.loadlogo();	
Blank.masonry_func();	
// for mobile
//jQuery('.post-page .page-content,.information-page .page-content').css({'opacity': 1});  

});

$( document ).ajaxComplete(function() {
  Blank.ajx_reint();
});

function slider_mobile(){
	if(jQuery(window).width() < 769){
		var winht = jQuery(window).height();
		var winwt = jQuery(window).width();
	  
	  var pgcont_w = jQuery('.post-page .page-content,.information-page .page-content').width();
	  var pgcont_h = jQuery('.post-page .page-content,.information-page .page-content').height();
	  
	  
	  jQuery('.slides img').width(pgcont_w);
	  
	  jQuery('.post-page .middle-container').css({'max-width': pgcont_w })
	  if(winht > winwt){
		//jQuery('.post-page .page-content,.information-page .page-content').height(winht);  
		jQuery('.post-page .page-content,.information-page .page-content').css({'min-height': winht});  
	  }
	  else{
		//jQuery('.post-page .page-content,.information-page .page-content').height(winwt);  
		jQuery('.post-page .page-content,.information-page .page-content').css({'min-height': winwt});  
	  }
  }
}



jQuery(document).ready(function(){
Blank.slider_height();
Blank.slider_func();
Blank.share_info_clk();
Blank.loadpage();


$(window).bind('popstate', function() {
	Blank.win_wid_hit();
	$.ajax({url:_wl,success: function(data){
		$('.page-wrapper').html($(data).find('.inset').html());
	}});
});

});