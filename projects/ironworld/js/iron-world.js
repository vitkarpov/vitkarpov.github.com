var ironWorld = (function($){
	var $sliders;
	function initSlider() {
		$sliders = $('.js-slider');
		$sliders.each(function() {
			var options	= $(this).data('options'),
				$el = $(this);

			if (!options) {
				options = {
					width: 990,
					height: 360
				}	
			}
			$el.slidesjs($.extend({
				callback: {
					loaded: function() {
						if ($el.hasClass('catalog')) {
							$el.parent('.catalog__wrapper').addClass('js-inited');
						}
					}
				}
			}, options));
		});
	}
	function initRotator() {
		var $rotator = $('.js-rotator');
		$rotator.rotator();
	}
	function customForms() {
		var $inputs = $('.js-custom-input'),
			$spinner = $('.js-spinner');
		$inputs.uniform();
		$spinner.spinner();
	}
	function initAbFix() {
		$('.lt-ie8').abFix();
	}
	return {
		init: function() {
			initSlider();
			initRotator();
			customForms();
			initAbFix();
		}
	}
}(jQuery));

ironWorld.init();
