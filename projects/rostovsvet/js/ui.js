// ie after/before fix
var ieFix = (function($) {
	var appendEl, prependEl;

	function init() {
		appendEl = $('.ie-append');
		prependEl = $('.ie-prepend');

		if ($('html').hasClass('ie7')) {
			appendEl.append('<i class="after-fix"></i>');
			prependEl.prepend('<i class="before-fix"></i>');	
		}		
	}

	return {
		init: function() {
			init();
		}
	}
})(jQuery);

//cloud zoom
var zoomer = (function($) {
	var image,
		opt = {
			zoomWidth: 315,
			zoomHeight: 483
		};

	function init() {
		image = $('.cloud-zoom');

		if (!image.length) {
			return;
		}

		image.CloudZoom(opt);
	}

	return {
		init: function() {
			init();
		}
	}
})(jQuery);

// sidebar container sliders
var openContainer = (function($){
	var context;

	function init() {
		context = $('.js-open-wrapper');

		if (!context.length) {
			return;
		}
		context.each(function() {
			var self = $(this),
				trigger = $('.js-trigger', self),
				container = $('.js-container', self);

			self.not('.active').find('.js-container').hide();	

			if (container.length) {
				trigger.prepend('<i class="close fr">×</i>');
				trigger.live('click', function() {
					container.slideToggle();
					self.toggleClass('active');
					return false;
				});
			} else {
				trigger.addClass('noContainer')
			}				
		});
	}

	return {
		init: function() {
			init();
		}
	}
})(jQuery);

// uniform
var customFormControls = (function($){
	var checkBox, radioButton, select;

	function checkState() {
		if ($(this).attr('checked') == "checked") {
			$(this).parent().addClass('checked');
		} else {
			$(this).parent().removeClass('checked');
		}
	}

	function changeSelectSpan() {
		$(this).parent()
			   .find('span')
			   .html($(this).find('option:selected').html());
	}

	function init() {
		checkBox = $('#wrapper input[type=checkbox]');
		radioButton = $('#wrapper input[type=radio]');
		select = $('#wrapper select');

		var radioButtonWrapper = radioButton.parent(),
			selectWrapper;

		select.wrap('<div class="select-wrapper" />');
		selectWrapper = select.parent();

		selectWrapper.append('<span />');
		selectWrapper.append('<i class="append-ico" />');

		checkBox.parent().addClass('custom-checkbox ie-append');
		
		radioButtonWrapper.addClass('button-radio');
		radioButtonWrapper.parent().addClass('button-radio-wrapper')
		radioButtonWrapper.first().addClass('first');
		radioButtonWrapper.last().addClass('last');

		select.each(function() {
			changeSelectSpan.apply(this, arguments);
		});
		select.change(function() {
			changeSelectSpan.apply(this, arguments);
		});

		radioButton.each(function(){
			checkState.apply(this, arguments);
		});
		radioButton.change(function() {
			radioButtonWrapper.removeClass('checked');
			$(this).parent().addClass('checked')
		});

		checkBox.each(function() {
			checkState.apply(this, arguments);
		});
		checkBox.change(function(){
			checkState.apply(this, arguments);
		});
	}

	return {
		init: function() {
			init();
		}
	}

})(jQuery);

//trigger tabs on detail page
var tabs = (function($) {
	var context, trigger, container = [];

	function init() {
		context = $('.js-tabs');
		trigger = $('.js-trigger', context);

		if (!context.length) {
			return;
		}

		trigger.each(function(i) {
			container[i] = $($(this).attr('href'));
			if (!$(this).hasClass('current')) {
				container[i].hide();
			}
		});

		trigger.click(function() {
			var num = trigger.index($(this));

			trigger.removeClass('current');
			for (var i = container.length - 1; i >= 0; i--) {
				container[i].hide();
			};
			if (num >= 0) {
				$(this).addClass('current');
				container[num].show();
			}

			return false;
		});
	}

	return {
		init: function() {
			init();
		}
	}

})(jQuery);

//jquery-ui slider for price
var priceRange = (function($){
	var leftInput, rightInput, slider;

	function init() {
		slider = $('#range-slider');
		leftInput = $('.js-left-value');
		rightInput = $('.js-right-value');

		if (!slider.length) {
			return;
		}

		slider.slider({
		    range: true,
            min: 0,
            max: 200000,
            values: [ 10000, 80000 ],
            slide: function( event, ui ) {
                leftInput.val(ui.values[0]);
                rightInput.val(ui.values[1]);
            }
		});

		leftInput.val(slider.slider('values', 0));
        rightInput.val(slider.slider('values', 1));

        slider.find('.ui-slider-handle').first().addClass('first');
				
	}

	return {
		init: function() {
			init();
		}
	}
})(jQuery);

//init all on domready
$(function(){
	openContainer.init();
	customFormControls.init();
	tabs.init();
	ieFix.init();
	priceRange.init();
	zoomer.init();

	//catalog hack
	$('.catalog > ul > li:odd').addClass('odd');
});