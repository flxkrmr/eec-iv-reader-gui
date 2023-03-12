const connectButton = document.getElementById('serialconnect');
const alertBox = document.getElementById('alert');
const initDataContainer = document.getElementById('init-data-container');
const liveDataContainer = document.getElementById('live-data-container');

connectButton.addEventListener('click',serialConnect);

// XXX
initDataContainer.style.display = 'none';
liveDataContainer.style.display = 'flex';

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
  }, () => {
    console.log("Connected");
  });

  serial.onReaderOnline = () => {
    alertBox.innerHTML="EEC-IV-Reader connected!"; 
  };

  serial.onTimeoutError = () => {
    alertBox.innerHTML="Reader could not connect to ECU. Is the ignition on?";
  }

  serial.onReadingStarted = type => {
    console.log(type);
    if (type == 0x01) {
      alertBox.innerHTML="Fault Code Memory Reading started...";
    } else if (type == 0x02) {
      alertBox.innerHTML="KOEO/KOER Test started...";
    } else if (type == 0x03) {
      alertBox.innerHTML="Live Data Reading started...";
    } else {
      alertBox.innerHTML="Reading started";
    }
  }

  serial.onLiveData = (data) => {
    alertBox.innerHTML="Receiving live data";
    initDataContainer.style.display = 'none';
    liveDataContainer.style.display = 'flex';
  }
}

