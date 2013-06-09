var krylov = {
	slider: {
		container: null,
		init: function() {
			this.container = $('.js-slider');

			this.container.slides({
				preloader: true,
				preloadImage: '/images/loading.gif',
				generateNextPrev: false,
				pagination: true,
				generatePagination: false,
				effect: 'fade'
			});
		}	
	},
	ieAfterFix: function() {
		$('.ie7 .after-fix').each(function() {
			$(this).append('<i class="ie-after" />');
		});
		$('.ie7 .before-fix').each(function() {
			$(this).append('<i class="ie-before" />');
		});
	},
	init: function() {
		this.ieAfterFix();
		this.slider.init();
	}
};

$(function() {
	krylov.init();
});