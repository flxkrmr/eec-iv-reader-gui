let keepReading = true;
let reader;
let writer;
let closedPromise;

class LineBreakTransformer {
  constructor() {
    this.chunks = [];
  }

  transform(chunk, controller) {
    this.chunks.push(...chunk);

    while (true) {
      const i = indexOfCRLF(this.chunks);
      if (i == -1) 
        break;

      controller.enqueue(this.chunks.slice(0, i));

      if (this.chunks.length > i+2)
        this.chunks = this.chunks.slice(i+2)
      else
        this.chunks = []      
    }
  }

  flush(controller) {
    controller.enqueue(this.chunks);
  }
}

function isDataLine(line) {
  let dataTag = line.slice(0, 5);
  
  return dataTag[0] == 0x01 &&
    dataTag[1] == 0x23 &&
    dataTag[2] == 0x45 &&
    dataTag[3] == 0x67 &&
    dataTag[4] == 0x89;
}

function handleDataLine(line) {
  let messageType = line.slice(5, 6);
  if (messageType == 0x00) {
    console.log("Reader connected");
  } else if (messageType == 0x01) { 
    console.log("Timeout error");
  }else if (messageType == 0x02) { 
    console.log("Started reading");
  } else if (messageType == 0x03) {
    console.log("Live Data");
  }
}

function indexOfCRLF(value) {
  const indexCR = value.indexOf(13);
  if (indexCR == -1) {
    return -1;
  }

  if (value[indexCR + 1] != 10) {
    return - 1;
  }

  return indexCR;
}

async function readUntilClosed() {
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 }
  ];

  const port = await navigator.serial.requestPort({filters});
  await port.open({ baudRate: 19200 });

  while (port.readable && keepReading) {
    reader = port.readable
      .pipeThrough(new TransformStream(new LineBreakTransformer()))
      .getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (isDataLine(value)) {
          handleDataLine(value);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      reader.releaseLock();
    }
  }

  await port.close();
}

async function serialConnect() {
  console.log("Connect");

  closedPromise = readUntilClosed();
}

async function serialDisconnect() {
  console.log("Disconnect");

  keepReading = false;
  reader.cancel();
  await closedPromise;
}

document
  .getElementById('serialconnect')
  .addEventListener('click',serialConnect);

document
  .getElementById('serialdisconnect')
  .addEventListener('click',serialDisconnect);