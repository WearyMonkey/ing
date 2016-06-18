require('../../module.js').module.directive('wmConfirm', function() {

  return {
    restrict: 'E',
    templateUrl: bgTemplateUrl,
    transclude: true,
    scope: {
      onSelect: '=',
      okLabel: '=',
      cancelLabel: '=',
      header: '='
    },
    link: function(scope) {
      scope.okLabel = scope.okLabel || 'Ok';
      scope.cancelLabel = scope.cancelLabel || 'Cancel';
      scope.header = scope.header || 'Confirm';
    }
  }

});
