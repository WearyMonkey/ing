require('./module.js').module.directive('wmFormHandler', function($q, $timeout, $location) {
  return {
    restrict: 'A',
    require: 'form',
    scope: {
      wmFormHandler: '&',
      state: '=?',
      loader: '=?',
      submitter: '=?'
    },
    link: function(scope, element, attrs, form) {

      scope.flash = $location.search().flash;
      scope.submitter = onSubmit;
      element.on('submit', onSubmit);

      function onSubmit() {
        $timeout(function () {
          scope.state = 'loading';
          scope.loader = $q.when(scope.wmFormHandler()).then(function () {
            scope.state = 'loaded';
          }, function (result) {
            scope.state = 'error';
            _.each(result.data.errors, function (error) {
              form.$setValidity(error.param, false);
              if (form[error.param]) {
                form[error.param].$error.server = error.msg;
              }
            })
          })
        });
      }
    }
  }
});
