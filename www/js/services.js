angular.module('starter.services', ['ngCordova'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Settings', function($window){

  return {

    getAddress: function(okCallback){
      $window.plugins.appPreferences.fetch(function(value){
        if(okCallback) {
          if(!value || value == null){
            value = "http://localhost:888/get_temp_hum"
          }
          okCallback(value);
        }
      }, function(error){
        console.log(error);
      }, 'address');
    },

    setAddress: function(address){
      if(!address|| address == null)
        return;
      $window.plugins.appPreferences.store(function(value){
        return value;
      }, function(error){
        console.log(error);
      }, 'address', address);
    },

    getInterval: function(callback){
      $window.plugins.appPreferences.fetch(function(value){
        if(callback){
          if(!value || value == null){
            value = 30;
          }
          callback(value);
        }
      }, function(error){
        console.log(error);
      }, 'interval');
    },

    setInterval: function(interval){
      if(!interval || interval == null)
        return;

      $window.plugins.appPreferences.store(function(value){
        return value;
      }, function(er){
        console.log(er);
      }, 'interval', interval);
    }
  }
})

.factory('SensorsInfoService', function($rootScope){

  var lastData = {
    "Sensor1":{
      "temperature": "- ",
      "humidity": "- "
    },
    "Sensor2":{
      "temperature": "- ",
      "humidity": "- "
    }
  };

  return{
    getLast: function(){
      return lastData;
    },
    subscribe: function(scope, callback){
      var handler = $rootScope.$on('sensors-updated', callback);
      scope.$on('$destroy', handler);
      //scope.$on('$ionicView.leave', handler);
    },
    notify: function(sensorsData){
      console.log('NOTIFICATIOOOOOOOOOOOOON');
      lastData = sensorsData;
      $rootScope.$emit('sensors-updated');
    }
  }
});
