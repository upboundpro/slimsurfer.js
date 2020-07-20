/* global angular */

var app = angular.module('ngWavesurfer', []);

app.directive('ngWavesurfer', function() {
    return {
        restrict: 'E',

        link: function($scope, $element, $attrs) {
            $element.css('display', 'block');

            var options = angular.extend({ container: $element[0] }, $attrs);
            var slimsurfer = SlimSurfer.create(options);

            if ($attrs.url) {
                slimsurfer.load($attrs.url, $attrs.data || null);
            }

            $scope.$emit('wavesurferInit', slimsurfer);
        }
    };
});

app.controller('PlaylistController', function($scope) {
    var activeUrl = null;

    $scope.paused = true;

    $scope.$on('wavesurferInit', function(e, slimsurfer) {
        $scope.slimsurfer = slimsurfer;

        $scope.slimsurfer.on('play', function() {
            $scope.paused = false;
        });

        $scope.slimsurfer.on('pause', function() {
            $scope.paused = true;
        });

        $scope.slimsurfer.on('finish', function() {
            $scope.paused = true;
            $scope.slimsurfer.seekTo(0);
            $scope.$apply();
        });
    });

    $scope.play = function(url) {
        if (!$scope.slimsurfer) {
            return;
        }

        activeUrl = url;

        $scope.slimsurfer.once('ready', function() {
            $scope.slimsurfer.play();
            $scope.$apply();
        });

        $scope.slimsurfer.load(activeUrl);
    };

    $scope.isPlaying = function(url) {
        return url == activeUrl;
    };
});
