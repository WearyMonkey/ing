module.exports = {
  template: require('./logo.html'),
  controller: function($scope, $timeout, $state) {
    $scope.hideCover = function() {
      $state.go('home');
    }
  }};
