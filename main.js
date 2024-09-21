'use strict';

let selectedDeviceId = "";

let mediaRecorder;
let recordedBlobs;

function logMessage(msg, add) {
  const log = document.querySelector('#logMessage');
  if (add) {
    log.innerHTML += `<p>${msg}</p>`;
  } else {
    log.innerHTML = `<p>${msg}</p>`;
  }
}

function handleSuccess(msg) {
  logMessage(`Success: ${msg}`, true);
}

function handleError(msg) {
  logMessage(`Error: ${msg}`, true);
}

let iframe1 = document.getElementById('iframe1');
let iframe2 = document.getElementById('iframe2');

const defaultButton = document.getElementById('default1');
defaultButton.addEventListener('click', () => {
  selectedDeviceId = "default";
  logMessage(`Selected DeviceId: ${selectedDeviceId}`);
  iframe1.contentWindow.postMessage(`${selectedDeviceId}`, '*');
  iframe2.contentWindow.postMessage(`${selectedDeviceId}`, '*');  
});

const communicationsButton = document.getElementById('communications');
communicationsButton.addEventListener('click', () => {
  selectedDeviceId = "communications";
  logMessage(`Selected DeviceId: ${selectedDeviceId}`);
  iframe1.contentWindow.postMessage(`${selectedDeviceId}`, '*');
  iframe2.contentWindow.postMessage(`${selectedDeviceId}`, '*');  
});

const customButton = document.getElementById('custom');
customButton.addEventListener('click', () => {
  let customDeviceId = document.getElementById("customInput").value;
  selectedDeviceId = customDeviceId;
  logMessage(`Selected DeviceId: ${selectedDeviceId}`);

  iframe1.contentWindow.postMessage(`${selectedDeviceId}`, '*');
  iframe2.contentWindow.postMessage(`${selectedDeviceId}`, '*');
});

const defaultSinkIdButton = document.getElementById('setDefaultSinkId');
defaultSinkIdButton.addEventListener('click', async () => {
  try {
    await navigator.mediaDevices.setPreferredSinkId(`${selectedDeviceId}`);
  } catch (e) {
    handleError(`setPreferredSinkId: ${selectedDeviceId}, ${e}`)
  }
});

// let audioCtx = null;
// const audioContextButton = document.getElementById('setSinkId_audioContext');
// audioContextButton.addEventListener('click', () => {
//   const videoElem = document.getElementById('video1');
//     // Create an AudioContext
//     if (!audioCtx) {
//       audioCtx = new AudioContext();
//     }

//     console.log(`init audioContext sinkId: ${audioCtx.sinkId}`);

//     let audioDefaultDeviceId = selectedDeviceId === "default" ? "" : selectedDeviceId;
//     console.log(`set audioContext sinkId with: ${audioDefaultDeviceId}`);

//     audioCtx.setSinkId(audioDefaultDeviceId)
//     .then(handleSuccess(`audioContext: ${audioDefaultDeviceId}`))
//     .catch(err => handleError(`audioContext: ${err}`));

//     // Create an oscillator node (generates sound)
//     const oscillatorNode = audioCtx.createOscillator();

//     // Create a gain node (controls volume)
//     const gainNode = audioCtx.createGain();

//     // Connect the oscillator to the gain node
//     oscillatorNode.connect(gainNode);

//     // Connect the gain node to the audio output (speakers)
//     gainNode.connect(audioCtx.destination);

//     // Set oscillator properties (e.g., frequency)
//     oscillatorNode.type = 'sine'; // Sine wave
//     oscillatorNode.frequency.value = 440; // Frequency in Hz

//     // Set gain properties (e.g., volume)
//     gainNode.gain.value = 0.8; // Volume (0 to 1)

//     // Start the oscillator
//     oscillatorNode.start();

//     // Stop the oscillator after 0.5 seconds
//     oscillatorNode.stop(audioCtx.currentTime + 0.5);
// });

document.addEventListener('DOMContentLoaded', (event) => {
  navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        if (device.kind === 'audiooutput') {
          logMessage(`${device.label}, ${device.deviceId}`, true);
        }
      });
    }).catch(handleError);
});

