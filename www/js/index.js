/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        app.getSensorsData();
        window.setInterval(app.getSensorsData, 30000);
    },
    getSensorsData: function(){
        var parentElement = document.getElementById("deviceready");
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var failedElement = parentElement.querySelector('.failed');

        receivedElement.setAttribute('style', 'display:none;');
        failedElement.setAttribute('style', 'display:none;');
        listeningElement.setAttribute('style', 'display:block;');

        var req = new plugin.HttpRequest();
        req.get("http://barser.com:888/get_temp_hum", function(status, dat){

            console.log(JSON.stringify(dat));
            if(dat) {
                var data = JSON.parse(dat);

                    if (data["Sensor1"]) {
                        var sensor1 = data["Sensor1"];
                        if (sensor1["temperature"]) {
                            var t1 = document.getElementById("divT1Value");
                            t1.innerHTML = sensor1["temperature"] + " C";
                        }
                        if (sensor1["humidity"]) {
                            var h1 = document.getElementById("divH1Value");
                            h1.innerHTML = sensor1["humidity"] + " %";
                        }
                    }
                    if (data["Sensor2"]) {
                        var sensor2 = data["Sensor2"];
                        if (sensor2["temperature"]) {
                            var t2 = document.getElementById("divT2Value");
                            t2.innerHTML = sensor2["temperature"] + " C";
                        }
                        if (sensor2["humidity"]) {
                            var h2 = document.getElementById("divH2Value");
                            h2.innerHTML = sensor2["humidity"] + " %";
                        }
                    }

                    receivedElement.setAttribute('style', 'display:block;');
                    failedElement.setAttribute('style', 'display:none;');
                    listeningElement.setAttribute('style', 'display:none;');

            }else{
                receivedElement.setAttribute('style', 'display:none;');
                failedElement.setAttribute('style', 'display:block;');
                listeningElement.setAttribute('style', 'display:none;');
            }
        });
    }
};

app.initialize();