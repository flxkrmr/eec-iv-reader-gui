const connectButton = document.getElementById('serialconnect');
const disconnectButton = document.getElementById('serialdisconnect');

const initDataContainer = document.getElementById('init-data-container');
const liveDataContainer = document.getElementById('live-data-container');
const faultCodeDataContainer = document.getElementById('fault-code-data-container');
let faultCodeType = 0;
const liveDataDot = document.getElementById('live-data-dot');
let liveDataTimeoutId = 0;
let firstLiveData = true;

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
const liveDataSpeed = document.getElementById('data-speed');
const liveDataFuelVaporMode = document.getElementById('data-fuel-vapor-mode');
const liveDataFuelPumpMode = document.getElementById('data-fuel-pump-mode');

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

  initDataContainerMessage.innerHTML = 'Please connect EEC-IV Reader and click the Connect Button.';
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

  if (ports.length == 0) {
    alert.show("No ports found. Is Reader connected?", true); 
    connectButton.disabled = false;
    disconnectButton.disabled = true;

    initDataContainerMessage.innerHTML = 'Please connect EEC-IV Reader and click the Connect Button.';
    loadingSpinner.style.display = 'none';
    
    initDataContainer.style.display = 'flex';
    faultCodeDataContainer.style.display = 'none';
    liveDataContainer.style.display = 'none';
    return;
  }
  console.log(ports);
  // TODO check for ports, make select menu
  const port = ports[0];

  serial.connect(port, exception => {
    console.log("Connection error");
    console.log(exception);
    alert.show("An error occured while connecting", true); 
    connectButton.disabled = false;
    disconnectButton.disabled = true;

    initDataContainerMessage.innerHTML = 'Please connect EEC-IV Reader and click the Connect Button.';
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
    alert.show("Reader could not connect to ECU. Is the ignition on?", true);
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
      firstLiveData = true;
      liveDataDot.classList.remove("go-red");
      liveDataDot.classList.remove("green");
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
    clearTimeout(liveDataTimeoutId);
    liveDataDot.classList.remove("go-red");
    liveDataDot.classList.add("green");
    liveDataTimeoutId = setTimeout(liveDataDot => {
      liveDataDot.classList.remove("green");
      liveDataDot.classList.add("go-red");
    }, 2000, liveDataDot)

    // only first time and fade out
    if (firstLiveData) {
      alert.showAndFade("Receiving Live Data");
      firstLiveData = false;
    }

    liveDataContainer.style.opacity = 1;
    loadingSpinner.style.display = 'none';

    const eecIvDecoder = new EecIvDecoder();
    liveData = eecIvDecoder.getAllLiveData(data);
    console.log(liveData);
    liveDataRpm.innerHTML=liveData.rpm;
    liveDataLambda.innerHTML=liveData.lambda;
    liveDataSupplyVoltage.innerHTML="" + liveData.supplyVoltage + " V";
    liveDataThrottle.innerHTML="" + liveData.throttlePosition + " mV - " + liveData.throttlePositionHex;
    liveDataShortFuleCorrection.innerHTML="" + liveData.shortFuelCorrection + " % - " + liveData.shortFuelCorrectionHex;
    liveDataThrottleMode.innerHTML="" + liveData.throttleMode + " - " + liveData.throttleModeHex;
    liveDataCoolantTemp.innerHTML="" + liveData.coolantTemp + " °C";
    liveDataAirTemp.innerHTML="" + liveData.airTemp + " °C";
    liveDataIdleValve.innerHTML="" + liveData.idleValve + " - " + liveData.idleValveHex;
    liveDataAirFlowMeter.innerHTML="" + liveData.airFlowMeter + " mV - " + liveData.airFlowMeterHex;
    liveDataEgr.innerHTML="" + liveData.egr + " - " + liveData.egrHex;
    liveDataInjectionPulse.innerHTML="" + liveData.injectionPulse + " us";
    liveDataIgnitionTiming.innerHTML="" + liveData.ignitionTiming + "°";
    liveDataSpeed.innerHTML="" + liveData.speed + " km/h";
    liveDataFuelVaporMode.innerHTML="" + liveData.fuelVaporMode + " - " + liveData.fuelVaporModeDec + " - " + liveData.fuelVaporModeHex;
    liveDataFuelPumpMode.innerHTML="" + liveData.fuelPumpMode + " - " + liveData.fuelPumpModeHex;
  }
}

