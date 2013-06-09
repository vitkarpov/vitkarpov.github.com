var compass = (function($) {
	function shadowHack() {		
		$('.js-shadowVertical').each(function() {
			var h = $(this).height();
			$(this).height(h - 160);
		});
	};
	
	compassAnimation = {
		compass: null,
		arrow: null,
		targets: null,
		compassPos: null,
		halfSize: 128,
		angle: 90,
		construct: function() {
			var compassOffset;
				
			this.compass = $('.js-compass');	
			this.compass.append('<div class="compass-arrow" />');
			this.compass.append('<div class="compass-pin" />')
			this.arrow = this.compass.find('.compass-arrow');
			this.targets = $('.js-compass__target');
			
			compassOffset = this.compass.offset();			
			this.compassPos = {
				left: compassOffset.left + this.halfSize,
				top: compassOffset.top + this.halfSize
			};
		},
		onTargetHoverHandler: function(e) {
			var x = e.clientX,
				y = e.clientY,
				newX, newY, cosAlpha, alpha;
			
			newX = -(x - this.compassPos.left);
			newY = -(y - this.compassPos.top);
			
			cosAlpha = newX/(Math.sqrt(newX*newX + newY*newY));
			alpha = (Math.acos( cosAlpha ) * 180) / Math.PI;
			
			this.arrow.stop().rotateAnimation(alpha - 90);
		},
		init: function() {
			var self = this;
			
			this.construct();			
			this.targets.hover($.proxy(this.onTargetHoverHandler, this));
			
			this.arrow.rotate({
				maxAngle:180,
				minAngle:-180
			});
		}
	}
	
	return {
		init: function() {
			$('.ie7').abFix();
			shadowHack();
			compassAnimation.init();
		}
	}	
})(jQuery);

$(function() {
	compass.init();
});
