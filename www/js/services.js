angular.module('starter.services', ['ngCordova'])

.factory('Settings', function($window){

  return {

    getAddress: function(okCallback){
      $window.plugins.appPreferences.fetch(function(value){
        if(okCallback) {
          if(!value || value == null){
            value = "http://barser.com:888/get_temp_hum"
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
    },
    notify: function(sensorsData){
      lastData = sensorsData;
      $rootScope.$emit('sensors-updated');
    }
  }
});
