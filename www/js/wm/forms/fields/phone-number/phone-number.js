require('../../module.js').module
  .directive('wmFormsPhoneNumber', function(wmCountries) {

    return {
      restrict: 'E',
      scope: {
        model: '='
      },
      templateUrl: require('./phone-number.html'),
      link: function(scope) {
        scope.countries = _.map(wmCountries.countries, function(country) {
          return {callingCode: country.dialCode, label: '(+'+country.dialCode+') ' + country.name};
        });
      }
    };
  });

require('advo/services/countries.js');
