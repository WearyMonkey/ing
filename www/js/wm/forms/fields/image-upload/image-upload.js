require('bower_components/ng-file-upload/angular-file-upload.js');
require('imports?this=>window!bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js');
require('wm/directives/image/image.js');
var loadImage = require('bower_components/blueimp-load-image/js/load-image.js');
var templateUrl = require('./image-upload.html');

require('../../module.js').module.directive('wmFileUpload', function($upload, $http, $q, config, session) {

  return {
    restrict: 'E',
    templateUrl: templateUrl,
    scope: {
      label: '@',
      imageUrl: '=?',
      targetPath: '@',
      width: '=',
      height: '=',
      scale: '@'
    },
    link: function(scope) {
      scope.upload = function(files) {
        if (!files.length) return;

        var width = scope.width || 200;
        var height = scope.height || 200;
        var scale = scope.scale || 'cover';
        var targetPath = scope.targetPath;
        var timestamp = +new Date();
        var path = cleanPath(targetPath + '/' + width + 'x' + height + '-' + timestamp + '.png');

        $q.all([
          resize(files[0], width, height, scale),
          $http.get(config.server + '/upload/s3-policy', {params: {path: path, apikey: session.sessionToken}})
        ]).then(function(results) {
          var blob = results[0];
          var bucketUrl = results[1].data.data.bucketUrl;
          var policy = results[1].data.data.policy;
          var signature = results[1].data.data.signature;
          var awsAccessKey = results[1].data.data.awsAccessKey;

          $upload.upload({
            url: bucketUrl,
            method: 'POST',
            file: blob,
            fields: {
              key: path,
              AWSAccessKeyId: awsAccessKey,
              acl: 'public-read',
              policy: policy,
              signature: signature,
              'Content-Type': blob.type,
              'Content-Length': ''
            }
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            scope.imageUrl = cleanPath(bucketUrl + '/' + path);
          });
        })
      }
    }
  };

  function cleanPath(str) {
    return str.replace(/([^:]\/)\//, '$1');
  }

  function resize(file, width, height, scale) {
    return $q(function(resolve, reject) {
      loadImage(file, function(canvas) {
        canvas.toBlob(function(blob) {
          resolve(blob);
        })
      }, {
        maxWidth: width,
        maxHeight: height,
        minWidth: width,
        minHeight: height,
        contain: scale === 'contain',
        cover: scale === 'cover',
        crop: scale === 'cover',
        canvas: true
      });
    })
  }

});
