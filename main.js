/*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

const enumDeviceButton = document.getElementById('enumDevices');

function handleError(error) {
  errorMsg(`getDisplayMedia error: ${error.name}`, error);
}

function log(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
}

enumDeviceButton.addEventListener('click', () => {
  function getConnectedDevices(type, callback) {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach((device) => {
              log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            });
          
            // const filtered = devices.filter(device => device.kind === type);
            // callback(filtered);
        });
  }
  
  getConnectedDevices('audiooutput', cameras => log('speaker found:' + cameras));
});

