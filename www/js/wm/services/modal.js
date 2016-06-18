require('../directives/modal/modal.js');
require('../directives/modal/confirm/confirm.js');

require('./module.js').module.factory('wmModal', function($rootScope, $q, $compile) {

  var self = {
    confirm: function(options) {
      return $q(function(resolve, reject) {
        var modal = self.showModal({
          template: '<wm-confirm on-select="onSelect" ok-label="okLabel" cancel-label="cancelLabel" header="header">'+options.template+'</wm-confirm>',
          scope: _.extend({
            onSelect: function(result) {
              if (result) {
                resolve();
              } else {
                reject();
              }
              modal.close();
            },
            header: options.header,
            okLabel: options.okLabel,
            cancelLabel: options.cancelLabel
          }, options.scope)
        })
      });
    },

    alert: function(options) {
      var modal = self.showModal({
        template: '<wm-confirm on-select="onSelect" ok-label="okLabel" cancel-label="cancelLabel" header="header">'+options.template+'</wm-confirm>',
        scope: _.extend({
          onSelect: function() {
            modal.close();
          },
          header: options.header,
          okLabel: options.okLabel,
          cancelLabel: options.cancelLabel
        }, options.scope)
      })
    },

    showModal: function(options) {
      var scope = _.extend($rootScope.$new(), options.scope, {
        closeModal: close
      });
      var template = "<wm-modal close='closeModal'>" + options.template + "</wm-modal>";
      var modalEle = $compile(template)(scope);


      angular.element(document.body).prepend(modalEle);

      return {
        close: close
      };

      function close() {
        modalEle.remove();
      }
    }
  };

  return self;
});
