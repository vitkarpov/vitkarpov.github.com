/* This tine code was written by Vit Karpov (viktor.s.karpov@gmail.com)
 * @author Vit Karpov
 */
var app = (function($, window, undefined) {
	
	function ieAfterFix() {
		if ($('html').hasClass('lt-ie8')) {
			$('body').abFix();
		}
	}

	//toggle price
	function Toggle(link, container) {
		this.link = $(link);
		this.container = $(container);

		this._toggleContainer = function(self) {
			var id = $(this).data('id');

			if (!id) {
				throw new Error('Не указан data-id');
			}

			self.link.removeClass('current');
			$(this).addClass('current');
			self.container
						.removeClass('current')
						.filter('[data-id="'+id+'"]')
						.addClass('current');

			return false;			
		}
		this.init = function() {
			var self = this;
			this.link.click(function() {
				self._toggleContainer.call(this, self);
			});
		}
	}

	return {
		init: function() {
			//fix after and before pseudo for IE
			ieAfterFix();

			(new Toggle('.js-toggle__link', '.js-toggle__container')).init();

			$('.js-fluid-items').fluid();
		}
	}
})(window.jQuery, window, undefined);

app.init();
