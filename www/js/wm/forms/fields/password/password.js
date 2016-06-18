require('../../module.js').module
  .directive('wmFormsPassword', function() {
    return {
      restrict: 'E',
      scope: {
        model: '='
      },
      templateUrl: require('./password.html')
    };
  });

require('../../validations/wm-messages.js');
require('../../validations/input-match.js');
