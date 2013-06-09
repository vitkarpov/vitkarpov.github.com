/**
  *  Light plugin for auto rotate content
  *  @author Vir Karpov (viktor.s.karpov@gmail.com)
  */
jQuery.fn.rotator = function(options){
    

	function Rotator(context) {
		var container, menu, menuItems, content, settings,
			timerID, current, menuLinks;

		this.__construct = function() {
			this.container = $(context);
			this.menu = $('.menu', this.container);
			this.menuItems = this.menu.find('> li');
			this.content = $('.content', this.container);
			this.menuLinks = this.menuItems.find('> a');

			this.settings = $.extend(options, {
				duration: 4000,
				hoverStop: true,
				start: 1
			});

			this.current = this.settings.start;
		}

		this.rotateToCurrent = function() {
			var i = this.current;

			this.menuItems.removeClass('current')
						  .eq(i - 1)
						  .addClass('current');

			this.content.hide()
					    .eq(i - 1)
					    .show();

			if (i == this.menuItems.length) {
				this.current = 1;
				return;
			}

			i++;
			this.current = i;
		}

		this.startRotation = function() {
			var self = this;

			return setInterval(function() {
				self.rotateToCurrent.call(self);
			}, this.settings.duration);	
		}

		this.stopRotation = function() {
			clearInterval(this.timerID);
		}

		this.init = function() {
			var self = this;

			this.__construct();

			this.rotateToCurrent();
			this.timerID = this.startRotation();

			this.container.hover(function() {
				self.stopRotation();
			}, function() {
				self.timerID = self.startRotation();
			});

			this.menuLinks.click(function(e) {
				var item = $(this),
					index = self.menuLinks.index(item);

					self.current = index + 1;

					self.rotateToCurrent();

					return false;
			});
		}
	}

    return this.each(function(){
       r = new Rotator(this);
       r.init();
    });
}