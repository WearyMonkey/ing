require('../module.js').module.directive('wmTabs', function() {

  return {
    restrict: 'E',
    templateUrl: bgTemplateUrl,
    transclude: true,
    scope: {
      activeTab: '=?'
    },
    controller: function($scope) {
      $scope.tabs = [];
      $scope.activeTab = $scope.activeTab || 0;

      this.addTab = function(tab) {
        if ($scope.tabs.length == $scope.activeTab) {
          tab.isOpen = true;
        }
        $scope.tabs.push(tab);
      };

      $scope.openTab = function(tab) {
        _.each($scope.tabs, function(tab) {
          tab.isOpen = false;
        });
        tab.isOpen = true;
      }
    }
  }

}).directive('wmTab', function() {

    return {
      restrict: 'E',
      require: '^^wmTabs',
      scope: {
        header: '@'
      },
      template: '<div role="tabpanel" class="tab-pane" ng-if="tab.isOpen" ng-transclude></div>',
      transclude: true,
      link: function(scope, element, attrs, wmTabsCtrl) {

        scope.tab = {
          header: scope.header,
          isOpen: false
        };

        wmTabsCtrl.addTab(scope.tab);
      }
    }

});

