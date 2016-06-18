var commonTemplate = require('./common.html');

require('../module.js').module.directive('wmMessages', function() {

  return {
    restrict: 'E',
    require: '^form',
    template: '<ng-messages ng-if="form.$submitted || form[for].$touched" for="form[for].$error" include="'+commonTemplate+'" ng-transclude></ng-messages>',
    transclude: true,
    scope: {
      for: '@',
      displayName: '@'
    },
    link: function(scope, ele, attrs, form) {
      scope.form = form;
    }
  }
});
