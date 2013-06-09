(function( $ ) {
  $.fn.abFix = function( options ) {
  	var settings = $.extend( {
      beforeSelector : 'before-fix',
      afterSelector  : 'after-fix',
      beforeClass    : 'ie-prepend',
      afterClass     : 'ie-append'
    }, options);

  	return this.each(function() {
  		$(this).find( '.' + settings.beforeSelector ).prepend( '<i class="' + settings.beforeClass + '" />' );
  		$(this).find( '.' + settings.afterSelector ).append( '<i class="' + settings.afterClass + '" />' );
  	});
  };
})( jQuery );

var arabia = (function($, global) {
	
	var doubleHover = function(selector, hoverClass) {
	  $(document).on('mouseover mouseout', selector, function(e) {
	    var $this = $(this),
	    	href = $this.attr('href');

	    if (!href || (href == '#')) {
	    	return;
	    }

	    $(selector)
	      .filter('[href="' + href + '"]')
	      .toggleClass(hoverClass, e.type == 'mouseover');
	  });
	}

	var promoSlider = {
		slider: null,
		init: function() {
			var self = this;

			this.slider = $('.js-promo-slider');

			if (typeof $.fn.slides == 'function') {
				this.slider.slides({
					effect: 'fade',
					crossfade: true,
					preload: true,
					preloadImage: 'images/ajax-loader.gif',
					slidesLoaded: function() {
						$('.ie7 #head .nav').css('position', 'relative');
					}
				});
			}
		}
	};

	return {
		init: function() {
			promoSlider.init();
			doubleHover('a', 'hover');
			$('.ie7').abFix();
		}
	}
})(jQuery, window);

$(function() {
	arabia.init();
});