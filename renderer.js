const setVersion = async () => {
  const version = await window.mainprocess.version()
  document.getElementById('version').textContent = version;
}

setVersion()

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

const downloadButton = document.getElementById('download');

let liveDataDump = [];
downloadButton.addEventListener('click', () => {
  const csvData = createCsvString(liveDataDump)
  window.mainprocess.download(csvData);
});

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
const liveDataSupplyVoltage = document.getElementById('data-supply-voltage');
const liveDataThrottle = document.getElementById('data-throttle');
const liveDataThrottleMode = document.getElementById('data-throttle-mode');
const liveDataCoolantTemp = document.getElementById('data-coolant-temp');
const liveDataCoolantTempSensor = document.getElementById('data-coolant-temp-sensor');
const liveDataAirTemp = document.getElementById('data-air-temp');
const liveDataAirTempSensor = document.getElementById('data-air-temp-sensor');
const liveDataEgr = document.getElementById('data-egr');
const liveDataEgrDutyCycle = document.getElementById('data-egr-duty-cycle');
const liveDataLambda1 = document.getElementById('data-lambda-1');
const liveDataLambda2 = document.getElementById('data-lambda-2');
const liveDataEgo = document.getElementById('data-ego');
const liveDataFuelPulsewidth = document.getElementById('data-fuel-pulsewidth');
const liveDataIgnitionTiming = document.getElementById('data-ignition-timing');
const liveDataSpeed = document.getElementById('data-speed');
const liveDataSpeedUnfiltered = document.getElementById('data-speed-unfiltered');
const liveDataAirCharge = document.getElementById('data-air-charge');
const liveDataBarometricPressure = document.getElementById('data-bp');
const liveDataManifoldAbsolutePressure = document.getElementById('data-map');
const liveDataCalibrationVoltage = document.getElementById('data-calibration-voltage');
const liveDataTransmissionOilTemperature = document.getElementById('data-transmission-oil-temperature');
const liveDataScap = document.getElementById('data-scap');
const liveDataAdaptiveFuelCorrection = document.getElementById('data-adaptive-fuel-correction');
const liveDataIdleSpeed = document.getElementById('data-idle-speed');
const liveDataDesiredRpm = document.getElementById('data-desired-rpm');
const liveDataRatch = document.getElementById('data-ratch');
const liveDataTimeSinceStartup = document.getElementById('data-time-since-startup');
const liveDataOcc = document.getElementById('data-occ');
const liveDataNeutralDriveInput = document.getElementById('data-neutral-drive-input');
const liveDataConverterClutch = document.getElementById('data-converter-clutch');
const liveDataCommandGear = document.getElementById('data-command-gear');
const liveDataEtvMonitorVoltage = document.getElementById('data-etv-monitor-voltage');
const liveDataEpcPressure = document.getElementById('data-epc-pressure');
const liveDataPrndlPosition = document.getElementById('data-prndl-position');
const liveDataAirFlowMeter = document.getElementById('data-air-flow-meter');
const liveDataBitmap0 = document.getElementById('data-bitmap-0');
const liveDataBitmap1 = document.getElementById('data-bitmap-1');
const liveDataNotUsed0A = document.getElementById('data-not-used-0A');
const liveDataNotUsed14 = document.getElementById('data-not-used-14');
const liveDataNotUsed16 = document.getElementById('data-not-used-16');
const liveDataNotUsed19 = document.getElementById('data-not-used-19');
const liveDataNotUsed1C = document.getElementById('data-not-used-1C');
const liveDataNotUsed1D = document.getElementById('data-not-used-1D');
const liveDataNotUsed26 = document.getElementById('data-not-used-26');
const liveDataNotUsed29 = document.getElementById('data-not-used-29');
const liveDataNotUsed2C = document.getElementById('data-not-used-2C');
const liveDataNotUsed31 = document.getElementById('data-not-used-31');
const liveDataNotUsed33 = document.getElementById('data-not-used-33');
const liveDataNotUsed34 = document.getElementById('data-not-used-34');

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
  liveDataDump = [];

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

  function updateGuiValue(value, updateHandler) {
    if (value !== undefined && value !== null) {
      updateHandler(value);
    }    
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

    let liveData = eecIvDecoder.getAllLiveData(data);
    console.log(liveData);

    let liveDataDumpLine = {
      time: Date.now(),
      data: liveData,
    }
    liveDataDump.push(liveDataDumpLine);

    updateGuiValue(liveData.rpm, (rpm) => liveDataRpm.innerHTML = rpm);
    updateGuiValue(liveData.supplyVoltage, (supplyVoltage) => liveDataSupplyVoltage.innerHTML = supplyVoltage.toFixed(2) + " V");
    updateGuiValue(liveData.throttlePosition, (throttlePosition) => liveDataThrottle.innerHTML = throttlePosition + " A/D C.");
    updateGuiValue(liveData.throttleMode, (throttleMode) => liveDataThrottleMode.innerHTML = throttleMode);
    updateGuiValue(liveData.actCelsius, (actCelsius) => liveDataAirTemp.innerHTML = actCelsius.toFixed(2) + " °C");
    updateGuiValue(liveData.act, (act) => liveDataAirTempSensor.innerHTML = act + " A/D C.");
    updateGuiValue(liveData.ectCelsius, (ectCelsius) => liveDataCoolantTemp.innerHTML = ectCelsius.toFixed(2) + " °C");
    updateGuiValue(liveData.ect, (ect) => liveDataCoolantTempSensor.innerHTML = ect + " A/D C.");
    updateGuiValue(liveData.egr, (egr) => liveDataEgr.innerHTML = egr + " A/D C.");
    updateGuiValue(liveData.egrDutyCycle, (egr) => liveDataEgrDutyCycle.innerHTML = egr + " A/D C.");
    updateGuiValue(liveData.fuelPulsewidth, (fuelPulsewidth) => liveDataFuelPulsewidth.innerHTML = fuelPulsewidth + " Ticks");
    updateGuiValue(liveData.totalSparkAdvance, (totalSparkAdvance) => liveDataIgnitionTiming.innerHTML = totalSparkAdvance + "°");
    updateGuiValue(liveData.speed, (speed) => liveDataSpeed.innerHTML = speed.toFixed(1) + " km/h");
    updateGuiValue(liveData.speedUnfiltered, (speed) => liveDataSpeedUnfiltered.innerHTML = speed.toFixed(1) + " km/h");
    updateGuiValue(liveData.airCharge, (airCharge) => liveDataAirCharge.innerHTML = airCharge.toFixed(2) + " %");
    updateGuiValue(liveData.lambda1, (lambda) => liveDataLambda1.innerHTML = lambda.toFixed(4));
    updateGuiValue(liveData.lambda2, (lambda) => liveDataLambda2.innerHTML = lambda.toFixed(4));
    updateGuiValue(liveData.ego1, (ego) => liveDataEgo.innerHTML = ego + " A/D C.");
    updateGuiValue(liveData.barometricPressure, (bp) => liveDataBarometricPressure.innerHTML = bp + " inHg");
    updateGuiValue(liveData.manifoldAbsolutePressure, (map) => liveDataManifoldAbsolutePressure.innerHTML = map + " inHg");
    updateGuiValue(liveData.calibrationInputVoltage, (voltage) => liveDataCalibrationVoltage.innerHTML = voltage + " A/D C.");
    updateGuiValue(liveData.transmissionOilTemperature, (temp) => liveDataTransmissionOilTemperature.innerHTML = temp + " A/D C.");
    updateGuiValue(liveData.scap, (scap) => liveDataScap.innerHTML = scap + " A/D C.");
    updateGuiValue(liveData.idleSpeedDutyCycle, (dutyCycle) => liveDataIdleSpeed.innerHTML = dutyCycle + " A/D C.");
    updateGuiValue(liveData.adaptiveFuelCorrection, (correction) => liveDataAdaptiveFuelCorrection.innerHTML = correction.toFixed(4) + " A/F");
    updateGuiValue(liveData.desiredRpm, (rpm) => liveDataDesiredRpm.innerHTML = rpm);
    updateGuiValue(liveData.ratch, (ratch) => liveDataRatch.innerHTML = ratch);
    updateGuiValue(liveData.timeSinceStartup, (time) => liveDataTimeSinceStartup.innerHTML = time + " s");
    updateGuiValue(liveData.occ, (occ) => liveDataOcc.innerHTML = occ + " A/D C.");
    updateGuiValue(liveData.neutralDriveInput, (input) => liveDataNeutralDriveInput.innerHTML = input + " A/D C.");
    updateGuiValue(liveData.converterClutch, (clutch) => liveDataConverterClutch.innerHTML = clutch + " %");
    updateGuiValue(liveData.commandGear, (gear) => liveDataCommandGear.innerHTML = gear);
    updateGuiValue(liveData.etvMonitorVoltage, (voltage) => liveDataEtvMonitorVoltage.innerHTML = voltage + " V");
    updateGuiValue(liveData.epcPressure, (pressure) => liveDataEpcPressure.innerHTML = pressure + " p.s.i");
    updateGuiValue(liveData.prndlPosition, (position) => liveDataPrndlPosition.innerHTML = position);
    updateGuiValue(liveData.airFlowMeter, (flow) => liveDataAirFlowMeter.innerHTML = flow + " A/D C.");
    updateGuiValue(liveData.bitmap0, (bitmap) => liveDataBitmap0.innerHTML = bitmap);
    updateGuiValue(liveData.bitmap1, (bitmap) => liveDataBitmap1.innerHTML = bitmap);
    updateGuiValue(liveData.notUsed0A, (notUsed) => liveDataNotUsed0A.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed14, (notUsed) => liveDataNotUsed14.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed16, (notUsed) => liveDataNotUsed16.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed19, (notUsed) => liveDataNotUsed19.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed1C, (notUsed) => liveDataNotUsed1C.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed1D, (notUsed) => liveDataNotUsed1D.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed26, (notUsed) => liveDataNotUsed26.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed29, (notUsed) => liveDataNotUsed29.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed31, (notUsed) => liveDataNotUsed31.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed33, (notUsed) => liveDataNotUsed33.innerHTML = notUsed);
    updateGuiValue(liveData.notUsed34, (notUsed) => liveDataNotUsed34.innerHTML = notUsed);

    return;

  }
}

