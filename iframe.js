let mainDeviceId = null;
let secondDeviceId = null;
let selectedDeviceId = null;
let output = null;

function logMessage(msg, error) {
  const errorElement = document.querySelector('#logMessage');
  errorElement.innerHTML = `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.log(error);
  }
}

function handleSuccess(msg) {
  logMessage(`Success: ${msg}`);
}

function handleError(msg) {
  logMessage(`Error: ${msg}`);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.log(error);
  }
}

const defaultButton = document.getElementById('default1');
defaultButton.addEventListener('click', () => {
  selectedDeviceId = "default";
  logMessage(`Selected DeviceId: ${selectedDeviceId}`);
});

const communicationsButton = document.getElementById('communications');
communicationsButton.addEventListener('click', () => {
  selectedDeviceId = "communications";
  logMessage(`Selected DeviceId: ${selectedDeviceId}`);
});

const customButton = document.getElementById('custom');
customButton.addEventListener('click', () => {
  let customDeviceId = document.getElementById("customInput").value;
  selectedDeviceId = customDeviceId;
  logMessage(`Selected DeviceId: ${selectedDeviceId}`);
});

const defaultSinkIdButton = document.getElementById('setDefaultSinkId');
defaultSinkIdButton.addEventListener('click', async () => {
  try {
    await navigator.mediaDevices.setPreferredSinkId(`${selectedDeviceId}`);
  } catch (e) {
    handleError(`setPreferredSinkId: ${selectedDeviceId}, ${e}`)
  }
});

window.addEventListener('message', (event) => {
  console.log('Message received in iframe:', event.data);
  selectedDeviceId = parseInt(event.data, 10);
  if (isNaN(selectedDeviceId)) {
    selectedDeviceId = event.data;
  }
});

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
