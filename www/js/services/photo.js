angular.module('starter').factory('photo', function($q, $http) {
  return {
    getText: function() {
      return getPicture().then(function(dataUri) {
        return upload(dataUri);
      }).catch(function(err) {
        console.log(err);
      });
    }
  };

  function b64toBlob(b64Data) {
    var binary = atob(b64Data.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    return new Blob( [view], { type: "application/jpg" });
  }

  function upload(dataUri) {
    var fd = new FormData();
    fd.append('file', b64toBlob(dataUri));
    fd.append('apikey', '95d19549-8eff-41b6-9aab-1052f259e473');
    return $http.post('https://api.havenondemand.com/1/api/sync/ocrdocument/v1', fd, {
      headers : {'Content-Type': undefined}
    }).then(function(result) {
      return result.data;
    });
  }

  function getPicture() {
    return $q(function(resolve, reject) {
      navigator.camera.getPicture(resolve, reject, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        correctOrientation: true,
        quality: 90,
        targetWidth: 1024,
        targetHeight: 1024,
        saveToPhotoAlbum: false
      });
    })
  }
});
