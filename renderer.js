const connectButton = document.getElementById('serialconnect');
const alertBox = document.getElementById('alert');
const initDataContainer = document.getElementById('init-data-container');
const liveDataContainer = document.getElementById('live-data-container');
const faultCodeDataContainer = document.getElementById('fault-code-data-container');

const initDataContainerMessage = document.getElementById('init-data-container-message');

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

connectButton.addEventListener('click',serialConnect);

const serial = new Serial();

async function serialConnect() {
  connectButton.disabled = true;
  alertBox.innerHTML="Connecting to EEC-IV-Reader..."; 
  console.log("Connecting");

  const ports = await serial.getPorts();
  // TODO check for ports, make select menu
  const port = ports[0];

  serial.connect(port, exception => {
    console.log("Connection error");
    console.log(exception);
    alertBox.innerHTML="An error occured while connecting"; 
    connectButton.disabled = false;

    initDataContainerMessage.innerHTML = 'Please connect EEC-IV-Reader';
    
    initDataContainer.style.display = 'flex';
    faultCodeDataContainer.style.display = 'none';
    liveDataContainer.style.display = 'none';
  }, () => {
    console.log("Connected");
  });

  serial.onReaderOnline = () => {
    alertBox.innerHTML="EEC-IV-Reader connected!"; 
    initDataContainerMessage.innerHTML = 'Please select mode on EEC-IV-Reader';
  };

  serial.onTimeoutError = () => {
    alertBox.innerHTML="Reader could not connect to ECU. Is the ignition on?";
  }

  serial.onReadingStarted = type => {
    if (type == 0x01) {
      alertBox.innerHTML="Fault Code Memory Reading started...";

      faultCodeFields.forEach((field) => field.innerHTML = "");
      faultCodeDescFields.forEach((field) => field.innerHTML = "");
      faultCodeDataContainer.style.opacity = 0.7;

      initDataContainer.style.display = 'none';
      faultCodeDataContainer.style.display = 'flex';
      liveDataContainer.style.display = 'none';
    } else if (type == 0x02) {
      alertBox.innerHTML="KOEO/KOER Test started...";

      faultCodeFields.forEach((field) => field.innerHTML = "");
      faultCodeDescFields.forEach((field) => field.innerHTML = "");
      faultCodeDataContainer.style.opacity = 0.7;

      initDataContainer.style.display = 'none';
      faultCodeDataContainer.style.display = 'flex';
      liveDataContainer.style.display = 'none';
    } else if (type == 0x03) {
      alertBox.innerHTML="Live Data Reading started...";
      liveDataContainer.style.opacity = 0.7;

      initDataContainer.style.display = 'none';
      faultCodeDataContainer.style.display = 'none';
      liveDataContainer.style.display = 'flex';
    } else {
      alertBox.innerHTML="Unknown Reading started";
      initDataContainer.style.display = 'flex';
      faultCodeDataContainer.style.display = 'none';
      liveDataContainer.style.display = 'none';
    }
  }

  serial.onFaultCodes = (data) => {
    const eecIvDecoder = new EecIvDecoder();
    faultCodeDataContainer.style.opacity = 1;
    alertBox.innerHTML = "Received Fault Codes";

    eecIvDecoder.getAllFaultCodes(data).forEach((code, i) => {
      faultCodeFields[i].innerHTML = code;
      faultCodeDescFields[i].innerHTML = eecIvDecoder.faultCodeDescription[code];
    });
  }

  serial.onLiveData = (data) => {
    alertBox.innerHTML="Receiving live data";
    liveDataContainer.style.opacity = 1;

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

