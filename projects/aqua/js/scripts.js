$(document).ready( function() {
	var $elements = {
		first : $('#first'),
		second : $('#second'),
		third : $('#third'),
		fourth : $('#fourth')
		}
		
//*** call the plugin

	//first section
	$("#wave", $elements.first).parallax({ "coeff": 0.2 }); //волна
	$("#bubbles", $elements.first).parallax({ "coeff": 0.9, "negative": true }); //пузыри
	$("#logo", $elements.first).parallax({ "coeff": 0.2 }); //логотип
	
	//second section
	
	//third section
	$("#bubbles", $elements.third).parallax({ "coeff": 0.9, "negative": true }); //пузыри
	$("#slippers", $elements.third).parallax({ "coeff": 0.25 }); //тапки
	$("#ball", $elements.third).parallax({ "coeff": 0.2 }); //мяч
	
	//fourth section
	$("#leaves", $elements.fourth).parallax({ "coeff": 0.2, "negative":true }); //листья
	$("#bubbles", $elements.fourth).parallax({ "coeff": 0.9, "negative": true }); //пузыри

//***
	
//init gallery
gallery.initGallery();
gallery.initRolls();

//header menu
menu.scroll();
menu.changeActive();
	
});


var menu = {}
menu.$context;
menu.$links;
menu.speed;

menu.changeActive = function() {
	var self = this;
	
	self.$context = $('#js-main-menu');
	self.$links = $('.b-main-menu_item', self.$context);
	
	if ( self.$links.length > 1 ) {
		var $sections = $('section', '#aqua');

			//add to $sections new properties
			$sections.each( function(){
				var $el = $(this),
					section = $el.attr('id');

				$sections.data( section , {
					'bottom': $el.offset().top+900 
					});
			});
			
			//window scroll event
			$(window).scroll( function() {
				var top = $(this).scrollTop();
					
				if ( ( top >= 0 )&&( top <= $sections.data('first').bottom ) ) {
					self.$links.removeClass('b-main-menu_item__active');
					self.$links.eq(0).addClass('b-main-menu_item__active');
				}
				if ( ( top >= $sections.data('first').bottom )&&( top <= $sections.data('second').bottom ) ) {
					self.$links.removeClass('b-main-menu_item__active');
					self.$links.eq(1).addClass('b-main-menu_item__active');
				}
				if ( ( top >= $sections.data('second').bottom )&&( top <= $sections.data('third').bottom ) ) {
					self.$links.removeClass('b-main-menu_item__active');
					self.$links.eq(2).addClass('b-main-menu_item__active');
				}
				if ( (top >= $sections.data('third').bottom)&&(top <= $sections.data('fourth').bottom) ) {
					self.$links.removeClass('b-main-menu_item__active');
					self.$links.eq(3).addClass('b-main-menu_item__active');
				}
					
			});
		
		
	}
}
	
menu.scroll = function() {
	var self = this;
	
	self.$context = $('#js-main-menu');
	self.$links = $('.b-main-menu_item', self.$context);
	//default speed
	self.speed = 500;
	
	if ( self.$links.length > 1 ) {
			
		self.$links.each( function() {
			var $el = $(this),
				href = $el.attr('href');
			
			//chech current section	
			function is_Active() {
				if ( $(this).hasClass('b-main-menu_item__active') ) return true; 
					else return false;
			}
			
			//click handler: scroll to *href* section
			function scrollTo(where) {
				if ( (where !== '')&&(where !== '#') ) {
					var $section = $(where);

					$('html').animate({
						scrollTop: $section.offset().top
					}, self.speed);
				}

			}
			//click event
			$el.click( function(e) {
				
				if ( !is_Active() ) { scrollTo(href); }
											
				e.preventDefault();	
			});				
					
		});
	}	
}


var gallery = {}

gallery.context;
gallery.arrowstime;
gallery.slidetime;

gallery.initGallery = function() {
	var self = this,
		$context = $('#gallery-wrap'),
		$viewport = $('#viewport', $context),
		$ul = $('ul', $viewport),
		$li = $('li', $ul),
		$nav = $('#nav',$context);

	//construct ul
	if ($li.length > 1) {		
		//append arrows
		$context.append('<a href="#" class="b-arrows b-arrows__left">Предыдущий слайд</a><a href="#" class="b-arrows b-arrows__right">Следующий слайд</a>');	
		
		//append dots
		$li.each(function(){
			$nav.css('width',26*$li.length);
			$nav.append('<i class="b-nav_dot"></i>');
		});
			
		var $dots = $('.b-nav_dot', $nav);
		$dots.first().addClass('b-nav_dot__active');
			
		var li_width = 1000,
			w = li_width*$li.length;
		
		//ul's style
		$ul.css({
			position: 'absolute',
			left: 0,
			top: 0,
			width: w+'px'
		});
	}
	
		var n = 0,
		    nav = {
				prev : $(".b-arrows__left", $context),
				next : $(".b-arrows__right", $context)
			};
		
		//arrows and gallery amimation's intervals
		self.arrowstime = 500;
		self.slidetime = 500;
			
		function checkArrows(n) {
			if (n == 0) {
				nav.prev.animate({
					opacity: 0.5
				}, self.arrowstime);
				
				nav.next.removeClass('disabled');
				nav.prev.addClass('disabled');
				
				nav.next.animate({
					opacity: 1
				}, self.arrowstime);
			}
			
			if (n == $li.length-1) {
				nav.next.animate({
					opacity: 0.5
				}, self.arrowstime);
				
				nav.prev.removeClass('disabled');
				nav.next.addClass('disabled');
				
				nav.prev.animate({
					opacity: 1
				}, self.arrowstime);
			}
			
			if ((n > 0)&&(n < $li.length-1)) {
				
				nav.prev.removeClass('disabled');
				nav.next.removeClass('disabled');
				
				nav.prev.animate({
					opacity: 1
				}, self.arrowstime);			
				
				nav.next.animate({
					opacity: 1
				}, self.arrowstime);
			}
		}
		
		//for the first time
		checkArrows(n);	
		
		//click handler
		function move(e) {
			var dir = e.data.dir;
			
			if (!$(e.delegateTarget).hasClass('disabled')) {
			
				self.showImg(false);
				
				//dots mark
				var $current_dot = $nav.find('.b-nav_dot__active'),
					$next_dot = $current_dot.next(),
					$prev_dot = $current_dot.prev();
				
	
					$current_dot.removeClass('b-nav_dot__active');
			
				if (dir == "prev") {
					n--;
					$prev_dot.addClass('b-nav_dot__active');
				} else {
					n++;
					$next_dot.addClass('b-nav_dot__active');
				}
	
					$ul.animate({
						left: -li_width*n
					}, self.slidetime);
				
				checkArrows(n);
			}	
			
			e.preventDefault();
		}
		
	//click event
		
			nav.next.bind('click',{dir : "next"}, move);		
			nav.prev.bind('click',{dir : "prev"}, move); 
		
		
}

gallery.initRolls = function() {
	var self = this,
		$a = $('.js-roll').parent(),
		is_open = false,
		$rolls = $('.js-roll', self.context);
	
	self.context = $('#gallery');

	//bind hover event for each $roll
	$a.each( function() {
		var $roll = $(this).find('.js-roll'),
			$text = $(this).find('span');	
	
		$text.hide();
		
		$(this).hover( function() {
			timeout_ID = setTimeout(function() {
						$text.animate({
							opacity: 1
						},700);
						$roll.animate({
							height: '100%'
						},300);
						$text.show();
					}, 250);	
		},
		function() {
			$roll.animate({
				height: '0'
			},300);
			$text.hide().css('opacity','0');
			clearTimeout(timeout_ID);
		});
		
		$(this).click( function(e) {
			e.preventDefault();
		})	
			
	});	
	
	//hard code for first $a click
	var $close = $('#close', self.context);
		
		$rolls.first().click(function(e){
			self.showImg(true);
			e.preventDefault();
		})
		
		$close.click(function(e){
			self.showImg(false);
			e.preventDefault();
		});
		
	
}

gallery.showImg = function(open) {
	var self = this,
		$img_wrap = $('#big-image', self.context);
		
		if (open) {
			$img_wrap.animate({
				width: '1000px',
				height: '600px'
			}, self.slidetime);
		} else {
			$img_wrap.animate({
				width: 0,
				height: 0
			}, self.slidetime);	
		}
}