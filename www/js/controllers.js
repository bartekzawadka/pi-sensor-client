angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, SensorsInfoService) {
  $scope.sensors = SensorsInfoService.getLast();
  SensorsInfoService.subscribe($scope, function(){
    $scope.sensors = SensorsInfoService.getLast();
  });
})

.controller('SettingsCtrl', function($scope, Settings) {

  $scope.settings = {};

  Settings.getAddress(function(value){
     $scope.settings.address = value;
  });

  Settings.getInterval(function(value){
    $scope.settings.interval = value;
  });

  var saveSettings = function(){
    Settings.setAddress($scope.settings.address);
    Settings.setInterval($scope.settings.interval);
  };

  $scope.$on('$ionicView.leave', function(){
    saveSettings();
  });
});
