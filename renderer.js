let keepReading = true;
let reader;
let writer;
let closedPromise;

const connectButton = document.getElementById('serialconnect');
connectButton.addEventListener('click',serialConnect);

const serial = new Serial();

async function serialConnect() {
  console.log("Connecting");
  const ports = await serial.getPorts();
  // TODO check for ports, make select menu
  const port = ports[0];

  serial.connect(port, exception => {
    console.log("Connection error");
    console.log(exception);
  }, () => {
    console.log("Connected");
  });
}

async function serialDisconnect() {
  console.log("Disconnect");
}

