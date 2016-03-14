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
        document.getElementById('btncapture').addEventListener('click', this.capturePhoto);
        document.getElementById('btnphotoedit').addEventListener('click', this.capturePhotoEdit);
        document.getElementById('btnphotoget').addEventListener('click', function(){
            app.getPhoto(pictureSource.PHOTOLIBRARY);
        });
        document.getElementById('btnphotoalbum').addEventListener('click', function(){
            app.getPhoto(pictureSource.SAVEDPHOTOALBUM);
        });
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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        console.log('Received Event2: ' + id);
    },


    // Called when a photo is successfully retrieved
    //
    onPhotoDataSuccess:function(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    },

    // Called when a photo is successfully retrieved
    //
    onPhotoURISuccess:function(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    },

    // A button will call this function
    //
    capturePhoto:function() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    },

    // A button will call this function
    //
    capturePhotoEdit:function() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    },

    // A button will call this function
    //
    getPhoto:function(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(app.onPhotoURISuccess, app.onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    },

    // Called if something bad happens.
    //
    onFail:function(message) {
      alert('Failed because: ' + message);
    },

};

app.initialize();