var defaultImage = require('./default.png');

require('../module').module.directive('wmImage', function($timeout) {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      src: '=',
      scale: '=',
      defaultSrc: '='
    },
    templateUrl: bgTemplateUrl,
    link: function(scope) {
      scope.$watch('src', function(src) {
        var image = new Image();
        scope.displaySrc = null;
        if (src) {
          image.onerror = function() {
            $timeout(function() {
              scope.displaySrc = scope.defaultSrc || defaultImage;
            });
          };
          image.onload = function() {
            $timeout(function() {
              scope.displaySrc = scope.src;
            });
          };
          image.src = scope.src;
        } else {
          scope.displaySrc = scope.defaultSrc;
        }
      });
    }
  }
});
