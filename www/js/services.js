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

  var lastDataDate = '';

  var getCurrentDate = function(){
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    if(dd<10) {
      dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }

    var hh = date.getHours();
    var MM = date.getMinutes();
    var ss = date.getSeconds();

    if(hh<10){
      hh='0'+hh;
    }
    if(MM<10){
      MM = '0'+MM;
    }
    if(ss<10){
      ss='0'+ss;
    }

    return yyyy+'/'+mm+'/'+dd + ' '+hh+':'+MM+':'+ss;
  };

  return{
    getLastUpdateTimestamp: function(){
      return lastDataDate;
    },
    getLastSensorsData: function(){
      return lastData;
    },
    subscribe: function(scope, callback){
      var handler = $rootScope.$on('sensors-updated', callback);
      scope.$on('$destroy', handler);
    },
    notify: function(sensorsData){
      lastData = sensorsData;

      lastDataDate = getCurrentDate();

      $rootScope.$emit('sensors-updated');
    }
  }
})

.factory('SensorsUpdater', function(SensorsInfoService, Settings, $http){

  var updateNotifications = function(isError){
    var notifier = document.getElementById("update-failed-notifier");
    if(isError){
      notifier.setAttribute('style', 'display: block');
    }else{
      notifier.setAttribute('style', 'display: none');
    }
  };

  return{
    updateSensors: function(success, error){
      Settings.getAddress(function (address) {

        $http.get(address).then(function(value){
          SensorsInfoService.notify(value.data);
          updateNotifications(false);
          if(success){
            success();
          }
        }, function(e){
          console.log(JSON.stringify(e));
          updateNotifications(true);
          if(error)
            error();
        })
      });
    }
  }
});
