require('../module.js').module.directive('wmAvailable', function($q, $timeout, $http) {
  return {
    require: 'ngModel',
    scope: {
      wmAvailable: '='
    },
    link: function(scope, elm, attrs, ctrl) {
      var feedback = angular.element('<span></span>');
      var icons = "fa-spin fa-circle-o-notch fa-check fa-times";
      feedback.addClass('fa form-control-feedback');

      elm.after(feedback);

      ctrl.$asyncValidators.available = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        feedback.removeClass(icons).addClass('fa-spin fa-circle-o-notch');

        return $http.get(scope.wmAvailable, {params: {check: modelValue}}).then(function(result) {
          if (result.data.available) {
            feedback.removeClass(icons).addClass('fa-check');
          } else {
            feedback.removeClass(icons).addClass('fa-times');
            return $q.reject();
          }
        });
      };
    }
  };
});
