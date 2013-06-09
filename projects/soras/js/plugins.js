// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
 * jquery plugin for ie :after 'n' :before fix for IE
 * @author Vit Karpov (viktor.s.karpov@gmail.com)
 * https://github.com/vitkarpov/abFix
 */
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
        $(this).find('ul li, ol li').prepend( '<i class="' + settings.beforeClass + '" />' );
    });
  };
})( jQuery );

/*
 * simple plugin for fluid margins for list items
 */
(function($, w, u) {
    var Fluid = function(el) {
        this.$base = $(el);
        this.$items = $('.item', this.$base);
        this.count = this.$items.length;
        this.itemsLine = this.$base.data('lineitems');

        this.init = function() {
            var lastItemsCount,
                lastItems,
                margin;

            if (!this.itemsLine) {
                throw new Error('Не указан атрибут data-lineItems');
            }

            lastItemsCount = this.count % this.itemsLine;

            if (!lastItemsCount) {
                return;
            }
            
            lastItems = this.$items.filter(':gt(-'+lastItemsCount+')');
            margin = 40 / lastItemsCount;
            lastItems.css('margin-left', margin+'%');
        }   
    }
    $.fn.fluid = function() {
        return this.each(function() {
            (new Fluid(this)).init();
        });
    }
})(jQuery, window, undefined);