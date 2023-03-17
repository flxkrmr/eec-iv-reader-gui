class LineBreakTransformer {
  constructor() {
    this.chunks = [];
  }
  
  indexOfCRLF(value) {
    const indexCR = value.indexOf(13);
    if (indexCR == -1) {
      return -1;
    }
  
    if (value[indexCR + 1] != 10) {
      return - 1;
    }
  
    return indexCR;
  }

  transform(chunk, controller) {
    this.chunks.push(...chunk);

    while (true) {
      const i = this.indexOfCRLF(this.chunks);
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

class Serial {
  keepReading = true;
  reader;
  closedPromise;

  onConnectionError;
  onConnectionSuccess;

  onReaderOnline;
  onTimeoutError;
  onReadingStarted;
  onFaultCodes;
  onLiveData;

  async connect(port, onError, onSuccess) {
    this.keepReading = true;
    this.onConnectionError = onError;
    this.onConnectionSuccess = onSuccess;
    this.closedPromise = this.readUntilClosed(port);
  }

  isDataLine(line) {
    let dataTag = line.slice(0, 2);
    
    return dataTag[0] == 0x01 &&
      dataTag[1] == 0x23;
  }
  
  handleDataLine(line) {
    let messageType = line.slice(2, 3);
    if (messageType == 0x00) {
      console.log("Reader connected");
      this.onReaderOnline();
    } else if (messageType == 0x01) { 
      console.log("Timeout error");
      this.onTimeoutError();
    } else if (messageType == 0x02) { 
      console.log("Started reading");
      this.onReadingStarted(line.slice(3, 4));
    } else if (messageType == 0x03) {
      console.log("Live Data");
      this.onLiveData(line.slice(3, 35));
    } else if (messageType == 0x04) {
      console.log("Fault Codes");
      this.onFaultCodes(line.slice(3, 37));
    } else {
      console.log("Unknown Data message");
      console.log(messageType);
    }
  }

  async getPorts() {
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 }
    ];
    return navigator.serial.getPorts({filters});
  }

  async disconnect() {
    this.keepReading = false;
    this.reader.cancel();
    await this.closedPromise;
  }

  async readUntilClosed(port) {

    await port.open({ baudRate: 19200 });

    this.onConnectionSuccess();
    let transformStream;
  
    while (port.readable && this.keepReading) {
      transformStream = new TransformStream(new LineBreakTransformer());
      this.reader = port.readable
        .pipeThrough(transformStream)
        .getReader();
  
      try {
        while (true) {
          const { value, done } = await this.reader.read();
          if (done) {
            break;
          }
          if (this.isDataLine(value)) {
            this.handleDataLine(value);
          }
        }
      } catch (error) {
        this.onConnectionError(error)
      } finally {
        this.reader.releaseLock();
      }
    }

    // Closing magic.. See: https://stackoverflow.com/questions/71262432/how-can-i-close-a-web-serial-port-that-ive-piped-through-a-transformstream
    const textEncoder = new TextEncoderStream();
    const writer = textEncoder.writable.getWriter();
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    writer.close();
    await writableStreamClosed;

    await port.close();
  }

}

