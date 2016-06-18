(function(window, undefined) {

  window.wm = {

    mapArrayToObj: function(array, key, obj) {
      obj = obj || {};
      _.each(array, function(val) {
        obj[val[key]] = val;
      });
      return obj;
    },

    parseJson: function(value) {
      if (typeof value !== 'string') {
        return value;
      } else {
        try {
          return JSON.parse(value);
        } catch (e) {
          return null;
        }
      }
    },

    getService: function(serviceName, elementSelector) {
      return angular.element(elementSelector || document.body).injector().get(serviceName);
    },

    benchDigest: function(times) {
      times = times || 1;
      var rootScope = this.getService('$rootScope');
      var before = new Date();
      for (var i = 0; i < times; ++i) {
        rootScope.$digest();
      }
      var after = new Date();

      console.log('total: ' + (after - before) + 'ms avg: ' + ((after - before) / times) + 'ms' )
    }
  }

})(window);
