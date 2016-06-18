require('js/wm/directives/load/load.js');
require('js/services/ingredients.js');
require('js/services/photo.js');
var _ = require('lodash');

module.exports = {
  template: require('./home.html'),
  controller: function($scope, $timeout, $ionicPopup, ingredients, photo) {
    $scope.scan = function() {
      $scope.loader = photo.getText().then(function(result) {
        $scope.ocrResult = result;
        console.log(result);
      })
    };

    $scope.ocrResult = {"text_block":[{"text":"' 2 ingredients\n\" ' homebrand Reconstituted Apple Juice (99996), Acidity\n' \" Regulator (3301, Natural Flavour, Preservative\n(202), Vitamin C (BOO).\nx Apple Juice\nKeep refrigerated at l-4'C.\n'.\nl\nr\n' Once opened, use within 7 days.\nPam\"), va'ue paCk Packed ln Australlafromlmported\n\"'l fruit luke\nPreparation Instructions gavfi'lggms'xxnh'\ni Shake well before opening.\n5 Bella Vista NSW 2153, Australia\nNlltrition Information For more information free call:\n3 Servings Per Pack: 15 1800 103 515.\nServing Size: 200ml. www.woolworths•com•au\n00831 714443 ,\nPer Serving '\nREPLACE & REFUND GUARANTEE f'\n\"you're not happywith your Pummm\nEnergy 364kJ 182ld\n• 88Cal 44Cal\n21 Protein 0.29 Mg\nFat, Total 0.2g Mg\nSaturated 0.09 0•09\n(arbogrydrate 20.Gg 1039\n1 ugars ' .\nDietary Fibre WI\n3 Sodium 6mg < Smg V\nx Vitanlila c 40mg (100%RDI#) 20m9 ' É\n' lists??? are averages only. *Percentage \"\nse on an avera e ' fl\n< means Less Than. # Recommendesg gamma 9 3 O O 6 3 3 4 1 9 1 8 9 > if,\nax-*uwu..ow-\"\"","left":229,"top":187,"width":2589,"height":2261}]};

    var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

    $scope.openPopover = function(ing) {
      $ionicPopup.show({
        template: '<input type="password" ng-model="data.wifi">',
        title: ing.name,
        scope: $scope,
        buttons: [
          { text: 'Close' }
        ]
      });
    };

    $scope.$watch('ocrResult', function(ocrResult) {
      if (!ocrResult) return;

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
  }
};

// angular.module('starter').directive('ratingCircles', function() {
//
// });
