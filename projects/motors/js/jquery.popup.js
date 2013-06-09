(function($){
	$.fn.popup = function(options) {
		var defSettings = {
			className: '#popup',
			overlay: '#overlay',
			offsetTop: '20'
		},
		settings = $.extend(options, defSettings);

		p = {
			popup: $(settings.className),
			overlay: $(settings.overlay),
			close: null,
			w: null,
			h: null,
			$body: $('body'),
			show: function() {
				var self = this;

				self.popup.show();
				self.overlay.show();

				self.$body.addClass('fixed');
			},
			hide: function() {
				var self = this;

				self.popup.hide();
				self.overlay.hide();

				self.$body.removeClass('fixed');
			},
			init: function() {
				var self = this;

				console.log('df');

				self.hide();
				self.popup.append('<div class="js-close" />');
				self.close = self.popup.find('.js-close');

				self.h = self.popup.height();
				self.w = self.popup.width();
				self.popup.css({
					'margin-left': '-' + self.w/2 + 'px',
					'top': settings.offsetTop+'px'
				});

				self.close.bind('click', function() {
					self.hide();
				});
				self.overlay.bind('click', function() {
					self.hide();
				});
			}
		}

		return this.each( function() {
			p.init();
			$(this).live('click', function() {
				p.show();
			});
		});
	}
})(jQuery);