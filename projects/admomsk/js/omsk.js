$(function(){

	var scrollWrapper = $('.scroll-bar-container');

	scrollWrapper.each(function() {
		var self = $(this),
			scrollPane = $('#' + self.data('content') + '-content'),
			scrollContent = scrollPane.find('> ul'),
			scrollItems = scrollContent.find('> li'),
			scrollbar = self.find('> .scroll-bar-wrapper');

		self.show();

		self.append('<a href="#" class="arrow-button left"></a><a href="#" class="arrow-button right"></a>');

		var buttons = self.find('.arrow-button');

		scrollContent.width(scrollItems.length * scrollItems.width());

	    scrollbar.slider({
	    	step: 100/scrollItems.length,
	        slide: function( event, ui ) {
	            if ( scrollContent.width() > scrollPane.width() ) {
	                scrollContent.css( "margin-left", Math.round(
	                    ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
	                ) + "px" );
	            } else {
	                scrollContent.css( "margin-left", 0 );
	            }
	        }
	    });

	    var handleHelper = scrollbar.find( ".ui-slider-handle" )
	    							.addClass("scroll-bar")							  
							        .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
							        

		buttons.click(function(){
			var self = $(this),
				s = scrollbar,
				dir = (self.hasClass('left')) ? -1 : 1,
				val = s.slider('value') + dir*s.slider('option','step')

				if ((s.slider('option', 'value').toFixed(0) == 0 && dir < 0) || (s.slider('option', 'value').toFixed(0) == 100 && dir > 0)) {
					return false;
				}


				s.slider('value', val);
				s.slider('option', 'slide').call(s.slider, null, { handle: scrollbar.find( ".ui-slider-handle" ), value: val });

			return false;
		});

		function sizeScrollbar() {
	            var remainder = scrollContent.width() - scrollPane.width();
	            var proportion = remainder / scrollContent.width();
	            var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );

	            scrollbar.find( ".ui-slider-handle" ).css({
	                width: handleSize,
	                "margin-left": -handleSize / 2
	            });
	            handleHelper.width( "" ).width( scrollbar.width() - handleSize );
	        }
	         
	    function resetValue() {
	        var remainder = scrollPane.width() - scrollContent.width();
	        var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
	            parseInt( scrollContent.css( "margin-left" ) );
	        var percentage = Math.round( leftVal / remainder * 100 );
	        scrollbar.slider( "value", percentage );
	    }
	     
	    function reflowContent() {
	            var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
	            var gap = scrollPane.width() - showing;
	            if ( gap > 0 ) {
	                scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
	            }
	    }
	     
	    $( window ).resize(function() {
	        resetValue();
	        sizeScrollbar();
	        reflowContent();
	    });

	    setTimeout( sizeScrollbar, 10 );//safari wants a timeout
	});
	// scrollbars init and logic

	$('#head-carousel').rotator();
	// rotator

	var indexBanner = $('#index-banner');

	if ( $.cookies.get('showIndexBanner') == 'N' ) {
		indexBanner.hide();
	}

	indexBanner.find('.js-close').click(function() {
		var date = new Date();

		indexBanner.slideUp();
		$.cookies.set('showIndexBanner', 'N', {
			expiresAt: date.setTime(date.getTime() + 365*24*60*60*1000)
		});
		return false;
	});
	//hide banners and write cookie

	var slideWrapper = $('.slider-wrapper'),
		slideClose = slideWrapper.find('.js-slider-close');

	if ( $.cookies.get('showSliders') == 'N' ) {
		slideWrapper.hide();
	}

	slideClose.click(function() {
		var date = new Date();

		slideWrapper.slideUp();
		$.cookies.set('showSliders', 'N', {
			expiresAt: date.setTime(date.getTime() + 365*24*60*60*1000)
		});
		return false;
	});
	//hide photo-video blocks and write cookie
});    