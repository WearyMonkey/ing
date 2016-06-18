require('./module.js').module.factory('wmStore', function () {

  return _.extend(create(window.localStorage), {
    session: create(window.sessionStorage)
  });

  function create(store) {
    return {
      get: function(key) {
        try {
          return store[key];
        } catch (e) {
          return null;
        }
      },

      set: function(key, value) {
        try {
          store[key] = value;
        } catch (e) { }
      },

      getJson: function(key) {
        return wm.parseJson(this.get(key));
      },

      setJson: function(key, value) {
        this.set(key, JSON.stringify(value));
      },

      clear: function() {
        store.clear();
      }
    }
  }

});
