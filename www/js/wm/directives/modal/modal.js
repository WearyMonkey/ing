var template = require('./modal.html');
require('./modal.scss');

require('../module.js').module.directive('wmModal', function() {

  return {
    restrict: 'E',
    templateUrl: template,
    transclude: true,
    scope: {
      close: '='
    }
  }

});
