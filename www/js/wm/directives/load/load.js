require('../module').module.directive('wmLoad', function() {

  return {
    restrict: 'A',
    scope: {
      wmLoad: '='
    },
    transclude: true,
    template: require('./load.html'),
    link: function(scope) {

      scope.$watch('wmLoad', function(loader) {

        while (_.isFunction(loader)) {
          loader = loader();
        }

        if (loader && _.isFunction(loader.then)) {
          loading();
          loader.then(loaded, error)
        } else {
          loaded();
        }

        function loading() {
          scope.state = 'loading';
        }

        function loaded() {
          scope.state = 'loaded';
        }

        function error() {
          scope.state = 'error';
        }

      });

    }
  }
});
