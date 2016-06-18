require('./module.js').module.directive('wmTap', function($timeout) {
  return {
    scope: {
      expr: '&wmTap'
    },
    link: function(scope, element) {
      element.on('touchstart mousedown', function(event) {
        $timeout(function() {
          scope.expr({$event: event});
        });
        event.preventDefault();
        event.stopPropagation();
      });
    }
  }
});
