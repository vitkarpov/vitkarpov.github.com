(function() {
  var app;

  app = (function($) {
    var initMaps;

    initMaps = function() {
      var mapId, mapInitOptions, onReadyMap;

      mapId = 'ya-map';
      mapInitOptions = {
        zoom: 12,
        center: [47.227763, 39.71937]
      };
      onReadyMap = function() {
        var myMap;

        myMap = new ymaps.Map(mapId, mapInitOptions);
        return this;
      };
      ymaps.ready(onReadyMap);
      return this;
    };
    return {
      init: function() {
        initMaps();
        return this;
      }
    };
  })(jQuery);

  app.init();

}).call(this);
