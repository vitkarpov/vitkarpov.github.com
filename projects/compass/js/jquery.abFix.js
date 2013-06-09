(function( $ ) {
  $.fn.abFix = function( options ) {
  	var settings = $.extend( {
      beforeSelector : 'before-fix',
      afterSelector  : 'after-fix',
      beforeClass    : 'ie-prepend',
      afterClass     : 'ie-append'
    }, options);

  	return this.each(function() {
  		$(this).find( '.' + settings.beforeSelector ).prepend( '<i class="' + settings.beforeClass + '" />' );
  		$(this).find( '.' + settings.afterSelector ).append( '<i class="' + settings.afterClass + '" />' );
  	});
  };
})( jQuery );