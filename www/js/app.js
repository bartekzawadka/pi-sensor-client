// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, Settings, SensorsInfoService, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Settings.getInterval(function(interval){
      var miliseconds = interval * 1000;

        window.setInterval(intervalAction, miliseconds);
    });
  });

  var intervalAction = function(){
    var parentElement = document.getElementById('notifier');
    var waitingElement = parentElement.querySelector('.waiting');
    var errorElement = parentElement.querySelector('.error');

    errorElement.setAttribute('style', 'display:none');
    waitingElement.setAttribute('style', 'display:block');

    Settings.getAddress(function (address) {

      var req = {
        method: 'GET',
        url: address
      };

      $http(req).then(function(value){
        SensorsInfoService.notify(value.data);
        errorElement.setAttribute('style', 'display:none');
        waitingElement.setAttribute('style', 'display:none');
      }, function(error){
        console.log(error);
        errorElement.setAttribute('style', 'display:block');
        waitingElement.setAttribute('style', 'display:none');
      })
    });
  };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  //
  //.state('tab.chats', {
  //    url: '/chats',
  //    views: {
  //      'tab-chats': {
  //        templateUrl: 'templates/tab-chats.html',
  //        controller: 'ChatsCtrl'
  //      }
  //    }
  //  })
  //  .state('tab.chat-detail', {
  //    url: '/chats/:chatId',
  //    views: {
  //      'tab-chats': {
  //        templateUrl: 'templates/chat-detail.html',
  //        controller: 'ChatDetailCtrl'
  //      }
  //    }
  //  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);
