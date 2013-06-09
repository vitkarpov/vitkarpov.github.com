var APP = (function($) {
	var isIE7;

	function menuExpand() {
		var menuButton = $('.js-expand');

		menuButton.live('click', function() {
			$(this).toggleClass('expanded');
		})
	}

	function footerDecoration() {
		var footer = $('#f'),
			ico = $('> i', footer),
			footInner = $('.page__f', footer);

		function setIcoPlace() {
			var w = footInner.width()/2;

			ico.css({
				'margin-left': w+'px'
			});
		}

		setIcoPlace();

		$(window).resize(function() {
			setIcoPlace();
		});
	}

	function authMenu() {
		var authWrapper = $('.js-auth'),
			link = $('.link_dashed', authWrapper),
			form = $('.js-form', authWrapper),
			close = $('.close', authWrapper);

		close.click(function() {
			authWrapper.removeClass('expanded');
			link.removeClass('active');
			form.hide();
		});

		link.click(function() {
			var self = $(this),
				blockID = self.data('action');

			if (self.hasClass('active')) {
				return;
			}

			authWrapper.addClass('expanded');
			link.removeClass('active');
			self.addClass('active');

			form.hide();
			$('#'+blockID).show();

			return false;
		});
	}
	
	function promoToggle() {
		var triggerButton = $('#js-promo'),
			promo = $('#js-promo-wrapper');
			
			promo.hide();
			
			triggerButton.bind('click', function() {
				$(this).toggleClass('expanded');
				promo.toggle(300);
			});
			
	}
	
	function subMenu() {
		var mainMenuItem = $('.main-nav__holder','.js-menu');

		mainMenuItem.click(function() {
			var self = $(this);

			self.toggleClass('fixed');
		});

		mainMenuItem.hover(
			function() {
				var subMenu = $('.sub-menu', this);

				if (subMenu.length) {
					$(this).addClass('expanded');
				}
			},
			function() {
				var subMenu = $('.sub-menu', this),
					self = $(this);

				if (!self.hasClass('fixed')) {
					self.removeClass('expanded');
				}					
			}
		);

	}

	function emulateIcons() {
		var icos = $('.ico'),
			tags = $('.tags__item'),
			navMenu = $('.foot-nav__item'),
			subMenu = $('.sub-menu li'),
			breadcrubms = $('.breadcrumbs__item');

		icos.prepend('<i></i>');
		subMenu.prepend('<i>►</i>')
		tags.not(':last-child').append('<i>•</i>');
		navMenu.not(':first-child').append('<i></i>');
		breadcrubms.not(':first-child').prepend('<i>→</i>');
	}

	function emulateElastic() {
		var elastic = $('.elastic');

			elastic.append('<li class="ie-gum"></li>');
	}

	return {
		defineIE: function() {
			isIE7 = true;
		},
		init: function() {
			if (isIE7) {
				emulateElastic.apply(this, arguments);
				emulateIcons.apply(this, arguments);	
			}
			
			promoToggle.apply(this, arguments);
			menuExpand.apply(this, arguments);
			subMenu.apply(this, arguments);
			authMenu.apply(this, arguments);
			footerDecoration.apply(this, arguments);
		}
	}
}(jQuery));

$(function() {
	APP.init();
})