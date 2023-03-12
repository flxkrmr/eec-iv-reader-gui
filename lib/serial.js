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
  writer;
  closedPromise;
  onConnectionError;
  onConnectionSuccess;

  async connect(port, onError, onSuccess) {
    this.onConnectionError = onError;
    this.onConnectionSuccess = onSuccess;
    this.closedPromise = this.readUntilClosed(port);
  }

  async disconnect() {
    keepReading = false;
    reader.cancel();
    await closedPromise;
  }

  isDataLine(line) {
    let dataTag = line.slice(0, 5);
    
    return dataTag[0] == 0x01 &&
      dataTag[1] == 0x23 &&
      dataTag[2] == 0x45 &&
      dataTag[3] == 0x67 &&
      dataTag[4] == 0x89;
  }

  handleReaderConnected() {
    connectButton.disabled = true;
  }
  
  handleDataLine(line) {
    let messageType = line.slice(5, 6);
    if (messageType == 0x00) {
      console.log("Reader connected");
      this.handleReaderConnected();
    } else if (messageType == 0x01) { 
      console.log("Timeout error");
    }else if (messageType == 0x02) { 
      console.log("Started reading");
    } else if (messageType == 0x03) {
      console.log("Live Data");
    }
  }

  async getPorts() {
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 }
    ];
    return navigator.serial.getPorts({filters});
  }

  async readUntilClosed(port) {

    await port.open({ baudRate: 19200 });

    this.onConnectionSuccess();
  
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
          if (this.isDataLine(value)) {
            this.handleDataLine(value);
          }
        }
      } catch (error) {
        this.onConnectionError(error)
      } finally {
        reader.releaseLock();
      }
    }
  
    await port.close();
  }

}

