require('js/wm/directives/load/load.js');
require('js/services/ingredients.js');
require('js/services/photo.js');
var _ = require('lodash');

module.exports = {
  template: require('./home.html'),
  controller: function($scope, $timeout, $ionicPopup, ingredients, photo) {
    $scope.getPhoto = function(fromLibrary) {
      $scope.loader = photo.getText(fromLibrary, $scope.input.useFake && $scope.ocrResult).then(function(result) {
        $scope.ocrResult = result;
        console.log(result);
      })
    };

    $scope.input = {
      useFake: true
    };

    $scope.ocrResult = {"text_block":[{"text":
      ingredients.map(function(ing) {return ing.regex.toString()}).join(',')
    }]};

    $scope.openPopover = function(ing) {
      var childScope = $scope.$new(true);
      childScope.ing = ing;
      $ionicPopup.show({
        template: require('./popup.html'),
        title: ing.name,
        scope: childScope,
        buttons: [
          { text: 'Close' }
        ]
      });
    };

    $scope.$watch('ocrResult', function(ocrResult) {
      if (!ocrResult) return;
      $scope.ocrResultStr = JSON.stringify(ocrResult);

      var matchedIngredients = [],
        ratingCounts = [0,0,0];
      ocrResult.text_block.forEach(function(textBlock) {
        var text = textBlock.text.toLowerCase().replace(/[\s\(\))]/g, '');
        ingredients.forEach(function(ingredient) {
          if (text.match(ingredient.regex)) {
            matchedIngredients.push(ingredient);
            ratingCounts[ingredient.rating] += 1;
          }
        });
      });

      $scope.ings = _.sortBy(matchedIngredients, 'rating');
      $scope.rating0Offset = 440;
      $scope.rating1Offset = 440;
      $scope.rating2Offset = 440;
      $scope.r0Count = ratingCounts[0];
      $scope.r1Count = ratingCounts[1];
      $scope.r2Count = ratingCounts[2];
      $scope.total = matchedIngredients.length;
      // var r0Ratio = ratingCounts[0] / matchedIngredients.length;
      var r1Ratio = ratingCounts[1] / matchedIngredients.length;
      var r2Ratio = ratingCounts[2] / matchedIngredients.length;
      $timeout(function() {
        $scope.rating0Offset = 0;
        $scope.rating1Offset = 440 - (r1Ratio + r2Ratio) * 440;
        $scope.rating2Offset = 440 - (r2Ratio) * 440;
      }, 0);
    });

    $scope.getPhoto();
  }
};

// angular.module('starter').directive('ratingCircles', function() {
//
// });
