require('../module').module.directive('wmGrid', function($q) {

  return {
    restrict: 'E',
    templateUrl: require('./grid.html'),
    scope: {
      options: '='
    },
    link: function(scope) {
      scope.$watch('options', function(options) {
        if (options) {
          setup(scope, options);
        }
      });
    }
  };

  function setup(scope, options) {
    scope.paging = {from: 0, size: (options.paging && options.paging.size) || 20};

    scope.getValue = function(row, column) {
      if (column.getter) {
        return column.getter(row)
      } else {
        return row[column.key];
      }
    };

    scope.nextPage = function() {
      scope.paging.from += scope.paging.size;
      loadData(scope, options);
    };

    scope.prevPage = function() {
      scope.paging.from = Math.max(0, scope.paging.from - scope.paging.size);
      loadData(scope, options);
    };

    loadData(scope, options);
  }

  function loadData(scope, options) {
    var dataPromise = $q.when(_.isFunction(options.data) ?
      options.data(scope.paging, options) :
      options.data);

    scope.loading = true;
    dataPromise.then(function(result) {
      scope.rows = result.rows;
      scope.total = result.total;
      scope.loading = false;
    }, function() {
      scope.loading = false;
      scope.error = true;
    });
  }

});
