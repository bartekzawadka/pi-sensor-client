angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, SensorsInfoService) {
  $scope.sensors = SensorsInfoService.getLast();
  SensorsInfoService.subscribe($scope, function(){
    $scope.sensors = SensorsInfoService.getLast();
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
