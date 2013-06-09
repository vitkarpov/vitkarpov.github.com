var iv = function() {
	//private interface
	var SF = {
		contentClass: null,
		footerClass: null,
		footerHeight: null,
		headerHeight: null,
		$content: null,
		setClasses: function( contentClass, footerClass) {
			this.contentClass = contentClass;
			this.footerClass = footerClass;
		},
		fluid: function() {
			var self = this;
			$(window).resize( function() {

				$('#YMapsID').height( $(document).height() - self.footerHeight - self.headerHeight - 5);
			});
		},
		init: function() {
			var self = this,
				$content = $('#' + this.contentClass),
				$footer = $('#' + this.footerClass),
				$header = $('#js-SF-header');
				footerHeight = $footer.outerHeight();
				headerHeight = $header.outerHeight();
					
			this.footerHeight = footerHeight;	
			this.headerHeight = headerHeight;
			this.$content = $content;

			$('#YMapsID').height( $(document).height() - 2*footerHeight - headerHeight - 5);

			$footer.css('margin-top', '-' + footerHeight + 'px');
			$content.css('padding-bottom', footerHeight + 'px');	
		}
	}

	var scroll = {
		arBlocks: null,
		devices: function() {
			var $scrollWrapper = $('.js-scrollPane__devices');
				$devices = $('.devices-list'),
				$items = $devices.find('.devices-list__item-wrapper'),
				itemsCount = $items.length,
				width = 0,
				height = 0;

			$items.each( function() {
				var self = $(this),
				    margin = Math.round(parseFloat(self.css('margin-right'))) + 2*itemsCount,
				    selfWidth = self.outerWidth();

				    width += selfWidth + margin;
					if ( self.height() > height ) {
						height = self.height();
					}
			});
			$devices.width( width );
			$devices.height( height + 13 );
			$scrollWrapper.height( $devices.height() + parseFloat($devices.css('padding-top')) + parseFloat($devices.css('padding-bottom')) );
		},
		vertScroll: function() {
			var $wrapper = $('.popup .js-scrollPane_vertical');
				$wrapper.height( $wrapper.find('.table').height() );
		},
		events: function() {
			var self = this,
				$page = $('.page'),
				$arBlocks = [$('#js-SF-header'), $('#js-SF-footer'), $('.page__sub-header', $page), $('.page__table-wrapper > .table', $page)],
				$eventsWrapper = $('.page__scroll_events', $page),
				i = $arBlocks.length;

				height = $page.height();

				while (i--) {
					height -= $arBlocks[i].outerHeight();
				}
				$eventsWrapper.height( height - 65 );
		},
		init: function() {
			var self = this;

			this.devices();
			this.vertScroll();
			this.events();

			$(window).resize( function() {
				self.events();
			});
		}

	}

	var popup = {		
		context: ".popup",
		navItem: ".js-popup-nav",
		content: ".popup__inner",
		activeClass: 'popup__header-item_active',
		close: '#js-popup-close',
		first: 1,
		init: function() {
			var $popup = $(this.context),
				$navItem = $(this.navItem, $popup),
				$content = $(this.content, $popup),
				$close = $(this.close, $popup),
				mTop = $popup.height()/2,
				self = this;

				$popup.css('margin-top', '-' + mTop);

				$navItem.bind('click', function() {
					var count = $(this).data('count');
						
						$navItem.removeClass( self.activeClass );
						$content.hide();
				
						$navItem.filter('[data-count="'+ count +'"]').addClass( self.activeClass );						
						$content.filter('[data-count="'+ count +'"]').show();
				});
				
				$close.bind('click', function() {
					$popup.hide();
				});

				$navItem.eq( this.first - 1 ).trigger('click');
		}	
	}
	
	//public interface
	return {
		SF: {
			setClasses: SF.setClasses,
			fluid: SF.fluid,
			init: SF.init
		},
		init: function() {
			scroll.init();
			popup.init();

			var $jScroll = $('.js-scrollPane');

			$jScroll.jScrollPane({
				autoReinitialise: true
			});
			
			//sticky footer
			iv.SF.setClasses('js-SF-content', 'js-SF-footer');
			iv.SF.fluid();
			iv.SF.init();
		}
	}
}();

//dom's ready
$(function() {
	//js's ready
	$('html').addClass('i-js');
	
	iv.init();
});