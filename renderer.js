const connectButton = document.getElementById('serialconnect');
const disconnectButton = document.getElementById('serialdisconnect');

const initDataContainer = document.getElementById('init-data-container');
const liveDataContainer = document.getElementById('live-data-container');
const faultCodeDataContainer = document.getElementById('fault-code-data-container');
let faultCodeType = 0;

const alert = new Alert(document.getElementById('alert'));

const initDataContainerMessage = document.getElementById('init-data-container-message');
const loadingSpinner = document.getElementById('spinner-overlay');
loadingSpinner.style.display = 'none';

const faultCodeFields = [
  document.getElementById('fault-code-1'),
  document.getElementById('fault-code-2'),
  document.getElementById('fault-code-3'),
  document.getElementById('fault-code-4'),
  document.getElementById('fault-code-5'),
  document.getElementById('fault-code-6'),
  document.getElementById('fault-code-7'),
  document.getElementById('fault-code-8'),
  document.getElementById('fault-code-9'),
  document.getElementById('fault-code-10'),
  document.getElementById('fault-code-11'),
  document.getElementById('fault-code-12'),
]

const faultCodeDescFields = [
  document.getElementById('fault-code-desc-1'),
  document.getElementById('fault-code-desc-2'),
  document.getElementById('fault-code-desc-3'),
  document.getElementById('fault-code-desc-4'),
  document.getElementById('fault-code-desc-5'),
  document.getElementById('fault-code-desc-6'),
  document.getElementById('fault-code-desc-7'),
  document.getElementById('fault-code-desc-8'),
  document.getElementById('fault-code-desc-9'),
  document.getElementById('fault-code-desc-10'),
  document.getElementById('fault-code-desc-11'),
  document.getElementById('fault-code-desc-12'),
]

const liveDataRpm = document.getElementById('data-rpm');
const liveDataLambda = document.getElementById('data-lambda');
const liveDataSupplyVoltage = document.getElementById('data-supply-voltage');
const liveDataThrottle = document.getElementById('data-throttle');
const liveDataShortFuleCorrection = document.getElementById('data-short-fuel-correction');
const liveDataThrottleMode = document.getElementById('data-throttle-mode');
const liveDataCoolantTemp = document.getElementById('data-coolant-temp');
const liveDataAirTemp = document.getElementById('data-air-temp');
const liveDataIdleValve = document.getElementById('data-idle-valve');
const liveDataAirFlowMeter = document.getElementById('data-air-flow-meter');
const liveDataEgr = document.getElementById('data-egr');
const liveDataInjectionPulse = document.getElementById('data-injection-pulse');
const liveDataIgnitionTiming = document.getElementById('data-ignition-timing');
const liveDataSensorPowerVoltage = document.getElementById('data-sensor-power-voltage');

connectButton.addEventListener('click', serialConnect);
disconnectButton.addEventListener('click', serialDisconnect);

const serial = new Serial();

async function serialDisconnect() {
  console.log("Disconnecting");
  loadingSpinner.style.display = 'block';
  await serial.disconnect();
  loadingSpinner.style.display = 'none';
  alert.showAndFade("EEC-IV-Reader disconnected"); 
  connectButton.disabled = false;
  disconnectButton.disabled = true;

  initDataContainerMessage.innerHTML = 'Please connect EEC-IV-Reader';
  loadingSpinner.style.display = 'none';
  
  initDataContainer.style.display = 'flex';
  faultCodeDataContainer.style.display = 'none';
  liveDataContainer.style.display = 'none';
}

async function serialConnect() {
  connectButton.disabled = true;
  alert.show("Connecting to EEC-IV-Reader..."); 
  initDataContainerMessage.innerHTML = '';
  loadingSpinner.style.display = 'block';
  console.log("Connecting");

  const ports = await serial.getPorts();
  // TODO check for ports, make select menu
  const port = ports[0];

  serial.connect(port, exception => {
    console.log("Connection error");
    console.log(exception);
    alert.show("An error occured while connecting"); 
    connectButton.disabled = false;
    disconnectButton.disabled = true;

    initDataContainerMessage.innerHTML = 'Please connect EEC-IV-Reader';
    loadingSpinner.style.display = 'none';
    
    initDataContainer.style.display = 'flex';
    faultCodeDataContainer.style.display = 'none';
    liveDataContainer.style.display = 'none';
  }, () => {
    console.log("Connected");
    disconnectButton.disabled = false;
  });

  serial.onReaderOnline = () => {
    alert.showAndFade("EEC-IV-Reader connected!"); 
    initDataContainerMessage.innerHTML = 'Please select mode on EEC-IV-Reader';
    loadingSpinner.style.display = 'none';
  };

  serial.onTimeoutError = () => {
    alert.show("Reader could not connect to ECU. Is the ignition on?");
    loadingSpinner.style.display = 'none';
  }

  serial.onReadingStarted = type => {
    if (type == 0x01) {
      alert.showAndFade("Fault Code Memory Reading started...");
      loadingSpinner.style.display = 'block';

      faultCodeFields.forEach((field) => field.innerHTML = "");
      faultCodeDescFields.forEach((field) => field.innerHTML = "");
      faultCodeDataContainer.style.opacity = 0.4;

      initDataContainer.style.display = 'none';
      faultCodeDataContainer.style.display = 'flex';
      liveDataContainer.style.display = 'none';

      faultCodeType = type;
    } else if (type == 0x02) {
      alert.showAndFade("KOEO/KOER Test started...");
      loadingSpinner.style.display = 'block';

      faultCodeFields.forEach((field) => field.innerHTML = "");
      faultCodeDescFields.forEach((field) => field.innerHTML = "");
      faultCodeDataContainer.style.opacity = 0.4;

      initDataContainer.style.display = 'none';
      faultCodeDataContainer.style.display = 'flex';
      liveDataContainer.style.display = 'none';

      faultCodeType = type;
    } else if (type == 0x03) {
      alert.showAndFade("Live Data Reading started...");
      loadingSpinner.style.display = 'block';
      liveDataContainer.style.opacity = 0.4;

      initDataContainer.style.display = 'none';
      faultCodeDataContainer.style.display = 'none';
      liveDataContainer.style.display = 'flex';
    } else {
      alert.showAndFade("Unknown Reading started");
      loadingSpinner.style.display = 'block';
      initDataContainer.style.display = 'flex';
      faultCodeDataContainer.style.display = 'none';
      liveDataContainer.style.display = 'none';
    }
  }

  serial.onFaultCodes = (data) => {
    const eecIvDecoder = new EecIvDecoder();
    faultCodeDataContainer.style.opacity = 1;
    loadingSpinner.style.display = 'none';

    if (faultCodeType == 0x02) {
      alert.show("Received Fault Codes. Please turn Ignition off and on for further readings!");
    } else {
      alert.showAndFade("Received Fault Codes");
    }

    eecIvDecoder.getAllFaultCodes(data).forEach((code, i) => {
      faultCodeFields[i].innerHTML = code;
      faultCodeDescFields[i].innerHTML = eecIvDecoder.faultCodeDescription[code];
    });
  }

  serial.onLiveData = (data) => {
    // only first time and fade out
    alert.show("Receiving Live Data")
    liveDataContainer.style.opacity = 1;
    loadingSpinner.style.display = 'none';

    const eecIvDecoder = new EecIvDecoder();
    liveDataRpm.innerHTML=eecIvDecoder.toRpm(data.slice(0, 2));
    liveDataLambda.innerHTML=eecIvDecoder.toLambda(data.slice(2, 4));
    liveDataSupplyVoltage.innerHTML="" + eecIvDecoder.toSupplyVoltage(data.slice(4, 6)) + " V";
    liveDataThrottle.innerHTML="" + eecIvDecoder.toThrottlePositionRef(data.slice(6, 8)) + " mV - " + eecIvDecoder.toHexString(data.slice(6, 8));
    liveDataShortFuleCorrection.innerHTML="" + eecIvDecoder.toShortFuelCorrectionRef(data.slice(8, 10)) + " % - " + eecIvDecoder.toHexString(data.slice(8, 10));
    liveDataThrottleMode.innerHTML="" + eecIvDecoder.toThrottleModeRef(data.slice(10, 12)) + " - " + eecIvDecoder.toHexString(data.slice(10, 12));
    liveDataCoolantTemp.innerHTML="" + eecIvDecoder.toTemperature(data.slice(14, 16)) + " °C - " + eecIvDecoder.toTemperatureRef(data.slice(14, 16)) + " °C - " + eecIvDecoder.toHexString(data.slice(12, 14));
    liveDataAirTemp.innerHTML="" + eecIvDecoder.toTemperature(data.slice(18, 20)) + " °C - " + eecIvDecoder.toTemperatureRef(data.slice(18, 20)) + " °C - " + eecIvDecoder.toHexString(data.slice(16, 18));
    liveDataIdleValve.innerHTML=eecIvDecoder.toHexString(data.slice(20, 22));
    liveDataAirFlowMeter.innerHTML="" + eecIvDecoder.toAirFlowMeterRef(data.slice(22, 24)) + " mV - " + eecIvDecoder.toHexString(data.slice(22, 24));
    liveDataEgr.innerHTML=eecIvDecoder.toHexString(data.slice(24, 26));
    liveDataInjectionPulse.innerHTML="" + eecIvDecoder.toInjectionPulseRef(data.slice(26, 28)) + " us - " + eecIvDecoder.toHexString(data.slice(26, 28));
    liveDataIgnitionTiming.innerHTML="" + eecIvDecoder.toIgnitionTimingRef(data.slice(28, 30)) + "° - " + eecIvDecoder.toHexString(data.slice(28, 30));
    liveDataSensorPowerVoltage.innerHTML=eecIvDecoder.toHexString(data.slice(30, 32));
  }
}

