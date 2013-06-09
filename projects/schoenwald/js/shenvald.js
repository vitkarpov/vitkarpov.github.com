/**
 *  This tiny code was written for small one page site ;)
 *  @author Vit Karpov (viktor.s.karpov@gmail.com)
 */
 $(function() {
 	var slides = $('.js-slides'),
 		preview = $('.preview'),
 		fancyLinks = $('.fancybox');

 	$('body').css('background-image','url(images/body-bg-high.jpg)');	

 	slides.slides({
 		pagination: true,
 		generatePagination: false,
 		paginationClass: 'preview',
 		effect: 'fade',
 		preload: true,
        preloadImage: 'images/ajax-loader.gif'
 	});

 	preview.each(function() {
 		var self = $(this),
 			toggleBlock = $('.js-toggleBlock', self),
 			toggleLink = $('.js-toggle', self);

		toggleBlock.hide();

		toggleLink.click(function(){
			var self = $(this),
				val = self.html();

			if (val == 'mehr') {
				self.html('weniger');
			} else {
				self.html('mehr');
			}

			toggleBlock.slideToggle();
			return false;
		});
 	});

 	fancyLinks.fancybox({
 		fitToView: false,
 		openEffect: 'fade',
 		nextEffect: 'fade',
 		prevEffect: 'fade'
 	});

 });
