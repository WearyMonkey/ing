exports.setup = function($provide, prefix) {
  $provide.decorator('$templateFactory', ['$delegate', function($delegate) {
    var orgFn = $delegate.fromConfig;
    $delegate.fromConfig = function(config, params, locals) {
      var stateClass = prefix + '-' + config.self.name.replace(/\./g, '-');
      return orgFn.call($delegate, config, params, locals).then(function(html) {
        return '<span class="'+stateClass+'">' + html + '</span>';
      });

    };
    return $delegate;
  }])

};
