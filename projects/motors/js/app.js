//Helpers
helpers = {
	in_array: function(val, array) {
		for(var i = 0, l = array.length; i < l; i++)  {
	        if(array[i] == val) {
	            return true;
	        }
	    }
	    return false;
	},
	getNumEnding: function(iNumber, aEndings){
			var sEnding, i;
			iNumber = iNumber % 100;

			if (iNumber>=11 && iNumber<=19) {
				sEnding=aEndings[2];
			}
			else {
				i = iNumber % 10;
				switch (i) {
								case (1): sEnding = aEndings[0]; break;
								case (2):
								case (3):
								case (4): sEnding = aEndings[1]; break;
								default: sEnding = aEndings[2];
				}
			}
			return sEnding;
	},
	randomNumber: function(m,n) {
		m = parseInt(m);
		n = parseInt(n);
		return Math.floor( Math.random() * (n - m + 1) ) + m;
	}
}

//Main app
motors = {	
	count: 23,
	prevL: 24,
	filter: function() {
		var self = this,
			$panel = $('.ui-tabs-panel').not('.ui-tabs-hide'),
			$loader = $('#loader'),
			ids = [],
			curL = 0;

			for (var i = self.count - 1; i >= 0; i--) {
				ids[i] = helpers.randomNumber(0, self.count);
			}

			ids = ids.sort();

			for (var i = self.count - 1; i >= 0; i--) {
				if (ids[i+1] != ids[i]) {
					curL++;
				} 
			}

		if (curL != self.prevL) {

			$loader.show();
			$panel.hide('highlight', {'direction': 'up'}, 300, function() {
				var cont = $(this),
					items = cont.find('.js-item'),
					l = ids.length - 1;

				items.hide();

				cont.show();
				$loader.hide();

				while(l--) {
					items.eq(ids[l]).show();
				}
			});

			self.prevL = curL;
			self.carCount.count();

		} else {
			self.filter();
		}
	},
	filterAction: function() {
		var self = this;

		$('.js-cb').bind('selectableselected', function() {
			self.filter();
		});
		$('.js-radio').bind('selectableselected', function() {
			self.filter();
		});
		$('.js-range').bind('slidestop', function() {
			self.filter();
		});	
		$('.js-price').bind('slidestop', function() {
			self.filter();
		});
	},
	carCount: {
		text: null,
		panel: null,
		count: function() {
			var self = this,
				n = motors.prevL;

			self.text.html( n + ' ' + helpers.getNumEnding(n, ['машина', 'машины', 'машин']) );
		},
		init: function() {
			var self = this;

			self.text = $('.js-carCount');
			self.count();
		}
	},
	//radio buttons
	radio: {
		textField: [],
		defaultChecked: [0, 1, 2, 1, 0],
		defaultCheck: function( ctx ) {
			var self = this,
				$el = ctx.find('.ui-selectee'),
				id = ctx.data('id'),
				$defaultEl = $el.filter( function(index) {
					return index == self.defaultChecked[id];
				});


				$defaultEl.addClass('ui-selected');
				self.textField[id].html( $defaultEl.html() );
		},
		init: function() {
			var self = this;
			$('.js-radio').selectable({
				create: function() {
					var id = $(this).data('id');
					self.textField[id] = $('.js-radio__text').filter('[data-id="'+ id +'"]');
					
					self.defaultCheck( $(this) );							
				},
				selected: function(e, ui) {
					var $el = $(ui.selected),
						id = $(this).data('id'),
						text = $el.html();

					self.textField[id].html(text); 	
				}
			});
		}
	},
	//checkboxes
	cb: {
		textField: [],
		defaultChecked: [4, 7],
		selected: [],
		_checkDefaultText: function() {
			var self = this;
			if (helpers.in_array(true, self.selected)) {
				$('.js-cb__default').hide()
			} else {
				$('.js-cb__default').show();
			}
		},
		init: function() {
			var self = this;
			$('.js-cb').selectable({
				create: function() {
					var $ctx = $(this),
						$el = $ctx.find('.ui-selectee'),
						text = $el.html(),
						id = $ctx.data('id'),
						l = self.defaultChecked.length;

					self.textField[id] = $('.js-cb__text').filter('[data-id="'+ id +'"]');					
									
					while(l--) {
						if (id == self.defaultChecked[l]) {
							$el.addClass('ui-selected');
							self.textField[id].html(text);
							self.selected[id] = true;
						}
					}

					self._checkDefaultText();						
				},
				stop: function(e, ui) {
					var $el = $(this).find('.ui-selectee'),
						id = $(this).data('id'),
						l = self.selected.length;


						if (!self.selected.length) {
							$('.js-cb__default').show();
						} else {
							$('.js-cb__default').hide();
						}

						if(self.selected[id]) {
							$el.removeClass('ui-selected');
							self.textField[id].html('');
							self.selected[id] = false;
						} else {
							self.selected[id] = true;
						}

						self._checkDefaultText();	
				},
				selected: function(e, ui) {
					var $el = $(ui.selected),
						id = $(this).data('id'),
						text = $el.html();

					self.textField[id].html(text); 	
				}
			});
		}
	},
	//range sliders
	range: {
		$els: null,
		$texts: null,
		sliders: 
		[
			{
				range: true,
				min: 0,
				max: 5,
				step: 1,
				values: [ 0, 5 ]
			},
			{
				range: true,
				min: 0,
				max: 500000,
				step: 10000,
				values: [ 0, 500000 ]
			},
		],
		init: function() {
			var self = this;

			self.$els = $('.js-range'),
			self.$texts = $('.js-range__text');

			self.$els.each(function( i ) {
				var $el = $(this),
					id = $el.data('id'),
					options = $.extend(self.sliders[i], {slide: function(e, ui) {
						var $text = self.$texts.filter('[data-id="'+ id +'"]'),
							ending, minPrice, maxPrice;

							switch (id) {
								case 11: 
									ending = helpers.getNumEnding(ui.values[ 1 ],['года', 'лет', 'лет']);
									break;
								case 12:
									ending = "км";
								case 13:
									ending = "руб";
							}
							$text.html( "от " + ui.values[ 0 ] + " до " + ui.values[ 1 ] + " " + ending );
						}					
					});

				$el.slider( options );
			});		

		}
	},
	price: {
		init: function(){
			var $el = $('.js-price'),
				min = 100000, max = 3000000;

			$el.slider({
				range: true,
				min: min,
				max: max,
				step: 10000,
				values: [ 500000, 2500000 ],
				create: function(e, ui) {
					var self = $(this),
						left = self.find('.ui-slider-handle').eq(0),
						right = self.find('.ui-slider-handle').eq(1);

					left.html(min);
					right.html(max);
				},
				slide: function(e,ui) {
					var self = $(this),
						left = self.find('.ui-slider-handle').eq(0),
						right = self.find('.ui-slider-handle').eq(1);

					left.html(ui.values[ 0 ]);
					right.html(ui.values[ 1 ]);
				}
			});
		}
	},
	tabs: {
		init: function() {
			$('#tabs').tabs({
				show: function(e, ui) {
					$panel = $(ui.panel);
					$panel.css('opacity', 0);
					$panel.animate({'opacity': 1}, 500);
				}
			});
		}
	},
	popup : {
		popup: $('#popup'),
		overlay: $('#overlay'),
		links: $('.js-open'),
		offsetTop: 20,
		close: null,
		w: null,
		h: null,
		$body: $('.js-global'),
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

			self.popup.append('<div class="js-close"></div>');
			self.close = self.popup.find('.js-close');

			self.close.bind('click', function() {
				self.hide();
			});
			self.overlay.bind('click', function() {
				self.hide();
			});

			self.links.live('click', function() {
				self.show();
			});
		}
	},
	slideDown: {
		init: function() {
			$('.js-slideDown').live('click', function() {
				$(this).find('.js-slideDown__content').toggle('highlight', {'direction': 'up'}, 300, function() {
					$('.js-slideDown__content').not($(this)).hide();
				});
				return false;
			});
			$('.region-link').live('click', function() {
				var cont = $(this).parent();
				cont.toggleClass('expanded', 300);
				return false;
			});
		}
	},
	promo: {
		init: function() {
			var time = 5000,
				$promoLink  = $('.promo-link'),
				$promo = $('.promo'),
				messages = ['Акция! Только сегодня 5 колес по цене 4-х!', 'ААА Моторс — абсолютный лидер', 'Промоблок! Промоблок?', 'Математика — это вкусно!'];

			$promoLink.bind('click', function() {
				$promo.toggleClass('expanded', 300);
			});

			setInterval(function(){
				$promoLink.html( messages[helpers.randomNumber(0, messages.length - 1)] ).effect('bounce', 300);
			}, time)
		}
	},
	init: function() {
		var self = this;

		self.range.init();
		self.cb.init();
		self.radio.init();
		self.tabs.init();
		self.slideDown.init();
		self.price.init();
		self.filterAction();
		self.popup.init();
		self.carCount.init();
		self.promo.init();
	}
}
$(function() {
	motors.init();
	$('.container').show();
	$('body').removeClass('loading');
});
