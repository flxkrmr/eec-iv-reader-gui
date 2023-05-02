class EecIvDecoder {
  toFaultCode(val) {
    return (val[1]&0xF).toString(16) + val[0].toString(16)
  }

  faultCodeDescription = {
    "111": "All systems work properly",
    "112": "Intake air temperature (IAT) sensor - voltage low",
    "113": "Intake air temperature (IAT) sensor - voltage high ",
    "114": "Intake air temperature (IAT) sensor - range",
    "116": "Engine coolant temperature (ECT) sensor - range",
    "117": "Engine coolant temperature (ECT) sensor - voltage low",
    "118": "Engine coolant temperature (ECT) sensor - voltage high",
    "119": "There is no connection with the engine control unit (switch on the ignition)",
    "121": "Throttle position (TP) switch/sensor - range",
    "122": "Throttle position (TP) switch/sensor - voltage low",
    "123": "Throttle position (TP) switch/sensor - voltage high",
    "124": "Throttle position (TP) switch/sensor - voltage high",
    "125": "Throttle position (TP) switch/sensor - voltage low",
    "129": "Mass air flow (MAF)sensor / manifold absolute pressure (MAP)sensor - no signal change during throttle 'blip'",
    "136": "Heated oxygen sensor (HO2S) 2, bank 2 - weak mixture",
    "137": "Heated oxygen sensor (HO2S) 2, bank 2 - rich mixture",
    "139": "Heated oxygen sensor (HO2S) 2, bank 2 - weak/rich mixture",
    "144": "Heated oxygen sensor (HO2S) 1, bank 1 - weak/rich mixture",
    "157": "Mass air flow (MAF) sensor - voltage low",
    "158": "Mass air flow (MAF) sensor - voltage high",
    "159": "Mass air flow (MAF) sensor - range",
    "167": "Throttle position (TP) switch/sensor - no signal change during throttle 'blip'",
    "171": "Heated oxygen sensor (HO2S) 1, bank 1 - adaptive limit reached",
    "172": "Heated oxygen sensor (HO2S) 1, bank 1 - weak mixture",
    "173": "Heated oxygen sensor (HO2S) 1, bank 1 - rich mixture",
    "174": "Heated oxygen sensor (HO2S)",
    "175": "Heated oxygen sensor (HO2S) 2, bank 2 - adaptive limit reached",
    "176": "Heated oxygen sensor (HO2S) 2, bank 2 - weak mixture",
    "177": "Heated oxygen sensor (HO2S) 2, bank 2 - rich mixture",
    "178": "Heated oxygen sensor (HO2S)",
    "179": "Fuel trim (part throttle) - weak mixture",
    "181": "Fuel trim (part throttle) - rich mixture",
    "182": "Fuel trim (idle) - weak mixture",
    "183": "Fuel trim (idle) - rich mixture",
    "184": "Mass air flow (MAF) sensor - air flow high",
    "185": "Mass air flow (MAF) sensor - air flow low",
    "186": "Injector pulse width - too long",
    "187": "Injector pulse width - too short",
    "188": "Heated oxygen sensor (HO2S), bank 2 - weak mixture",
    "189": "Heated oxygen sensor (HO2S), bank 2 - rich mixture",
    "191": "Heated oxygen sensor (HO2S), bank 2 - idle mixture weak",
    "192": "Heated oxygen sensor (HO2S), bank 1 - idle mixture rich",
    "194": "Heated oxygen sensor (HO2S)",
    "195": "Heated oxygen sensor (HO2S)",
    "211": "Profile ignition pick-up (PIP) signal",
    "212": "Tachometer circuit",
    "213": "Spark output (SPOUT) signal ",
    "214": "Camshaft position (CMP) sensor - circuit malfunction",
    "215": "Ignition coil 1, EDIS",
    "216": "Ignition coil 2, EDIS",
    "217": "Ignition coil 3, EDIS",
    "218": "Tachometer circuit",
    "222": "Tachometer circuit",
    "226": "Ignition control (EDIS) module - pulse missing",
    "227": "Crankshaft position (CKP) sensor/engine speed (RPM) sensor",
    "228": "Ignition control (EDIS) module/ignition coil 1",
    "229": "Ignition control (EDIS) module/ignition coil 2",
    "231": "Ignition control (EDIS) module/ignition coil 3",
    "232": "Ignition coil primary circuit",
    "233": "Ignition control (EDIS) module",
    "234": "Ignition coil",
    "235": "Ignition coil",
    "236": "Ignition coil",
    "237": "Ignition coil",
    "238": "Ignition control (EDIS) module/ignition coil",
    "239": "Profile ignition pick-up (PIP) signal - PIP signal occurs when engine cranking",
    "241": "Engine control module (ECM)/ignition control (EDIS) module - false data",
    "243": "Ignition coil",
    "311": "Pulsed secondary air injection (PAIR) system",
    "312": "Pulsed secondary air injection (PAIR) system",
    "313": "Pulsed secondary air injection (PAIR) system",
    "314": "Pulsed secondary air injection (PAIR) system",
    "315": "Pulsed secondary air injection (PAIR) system",
    "316": "Pulsed secondary air injection (PAIR) system",
    "326": "Exhaust pressure (EP) sensor",
    "327": "Exhaust pressure (EP) sensor/exhaust gas recirculation (EGR) solenoid",
    "328": "Exhaust gas recirculation (EGR) solenoid",
    "332": "Exhaust gas recirculation (EGR) solenoid",
    "334": "Exhaust gas recirculation (EGR) solenoid",
    "335": "Exhaust pressure (EP) sensor",
    "336": "Exhaust pressure (EP) - high",
    "337": "Exhaust pressure (EP) sensor/exhaust gas recirculation (EGR) solenoid",
    "338": "Engine coolant temperature (ECT) sensor - temperature low",
    "339": "Engine coolant temperature (ECT) sensor - temperature high",
    "341": "Octane plug - connected to earth",
    "411": "Engine rpm too low during self-test",
    "412": "Engine rpm too high during self-test",
    "413": "Idle air control (IAC) valve",
    "414": "Idle air control (IAC) valve",
    "415": "Idle air control (IAC) valve ",
    "416": "Idle air control (IAC) valve ",
    "452": "Vehicle speed sensor (VSS)",
    "511": "Engine control module (ECM) - ROM error",
    "512": "Engine control module (ECM) - KAM error",
    "513": "Engine control module (ECM) - internal reference voltage",
    "519": "Power steering pressure (PSP) switch - not activated during self-test",
    "521": "Power steering pressure (PSP) switch - not activated",
    "522": "Park/neutral position (PNP) switch - circuit malfunction",
    "523": "Park/neutral position (PNP) switch - circuit malfunction",
    "528": "Clutch pedal position (CPP) switch - circuit malfunction",
    "536": "Brake pedal position (BPP) switch - not activated during self-test",
    "538": "Operator error during self-test",
    "539": "AC switched ON during self-test",
    "542": "Fuel pump - circuit malfunction",
    "543": "Fuel pump - circuit malfunction",
    "551": "Idle air control (IAC) valve - circuit malfunction",
    "552": "Pulsed secondary air injection (PAIR) system - circuit malfunction",
    "556": "Fuel pump - circuit malfunction",
    "558": "Exhaust gas recirculation (EGR) solenoid - circuit malfunction",
    "563": "Engine coolant blower motor relay - circuit malfunction",
    "564": "Engine coolant blower motor relay - circuit malfunction",
    "565": "Evaporative emission (EVAP) canister purge valve - circuit malfunction",
    "566": "3rd/4th gear shift solenoid",
    "573": "Engine coolant blower motor relay - circuit malfunction",
    "574": "Engine coolant blower motor relay - circuit malfunction",
    "575": "Fuel pump/inertia fuel shut-off (IFS) switch - circuit",
    "576": "Kick-down switch",
    "577": "Kick-down switch - not activated during self-test",
    "612": "Transmission range(TR)switch, 4th/3th gear switch contacts - open circuit",
    "613": "Transmission range(TR)switch, 4th/3th gear switch contacts - open circuit",
    "614": "Transmission range(TR)switch, 3th/2th gear switch contacts - short circuit",
    "615": "Transmission range(TR)switch, 3th/2th gear switch contacts - open circuit",
    "621": "Shift solenoid (SS) 1 - circuit malfunction",
    "622": "Shift solenoid (SS) 2 - circuit malfunction",
    "624": "AT electronic pressure control solenoid",
    "625": "AT electronic pressure control solenoid - circut malfunction",
    "628": "Modulated torque converter clutch (TCC) solenoid",
    "629": "Torque converter clutch (TCC) solenoid",
    "634": "Park/neutral position (PNP) switch",
    "635": "Transmission fluid temperature(TFT) switch - circut malfunction",
    "636": "Transmission fluid temperature(TFT) switch - circut malfunction",
    "637": "Transmission fluid temperature(TFT) switch - circut malfunction",
    "638": "Transmission fluid temperature(TFT) switch - circut malfunction",
    "639": "Turbine shaft speed (TSS) sensor - signal low",
    "645": "1st gear failure - incorrect ratio",
    "646": "2nd gear failure - incorrect ratio",
    "647": "3rd gear failure - incorrect ratio",
    "648": "4th gear failure - incorrect ratio",
    "649": "Electronic throttle valve - failure",
    "651": "Electronic throttle valve - intermittent failure",
    "652": "Modulated torque converter clutch (TCC) solenoid - circuit malfunction",
    "653": "Transmission control switch - not activated during self-test",
    "658": "Performance/economy switch - not activated during self-test",
    "998": "ECT sensor/IAT sensor/MAF sensor/TP sensor - circuit malfunction"
  }

  validWord(word) {
    if (!!word && word.length == 2) {
      if (!isNaN(word[0]) && !isNaN(word[1])) {
        return true;
      }
    }

    return false;
  }

  validChecksum(word) {
    return ((word[0]&0xF)^(word[0]>>4)^(word[1]&0xF) ^ 0xA) == (word[1] >> 4)
  }

  toHexString(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return "0x" + word[0].toString(16) + " 0x" + word[1].toString(16);
  }

  toDec(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return ((word[1] & 0xF) << 8) | word[0]
  }

  toByte(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0];
  }

  toRpm(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word)*4
  }

  toDesiredRpm(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word)*16
  }

  toLambda(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word)/1000;
  }
  
  toSupplyVoltage(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    //return ((word[0] >> 4)&0xFF) + (word[0]&0xF)/16.0;
    return word[0] / 16;
  }

  toTemperatureRef(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    //return (word[0] - 16) / 10 + word[0] - 15;
    return word[0] * 1.1 - 16.6;
  }

  toTemperatureF(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] * 2;
  }

  toTemperatureC(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    // word[0] * 10/9 - 160/9 // comparing with ref this is pretty close
    return (this.toTemperatureF(word) - 32) * 5/9;
  }

  toShortFuelCorrectionRef(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return 128 - ((word[1]&0xF) * 16 + (word[0]&0xF))
  }

  toAirFlowMeterRef(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    //return (word[0]*10 / 256 + (word[1]&0xf)) * 100;
    return (((word[1]&0xf)<<8) | word[0]*10) *100/256;
  }

  toAirFlowMeter(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word) * 100/256;
  }

  toInjectionPulseRef(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    //return ((256 * (word[1]&0xF) + word[0]) - (256 * (word[1]&0xF) + word[0]) / 24) * 80;
    return ((((word[1]&0xF)<<8) + word[0]))*(80-80/24);
  }

  toInjectionPulseClk(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word) * 32;
  }

  toThrottlePositionRef(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    //return ((256 * (word[1]&0xF) + word[0]) - (256 * (word[1]&0xF) + word[0]) * 5 / 200) * 5;
    return this.toDec(word) * 4.875;
  }

  toThrottlePositionAD(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word);
  }

  toThrottleMode(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    if (word[0] == 0xFF) {
      return "Closed";
    } else if (word[0] == 0x00) {
      return "Partly open";
    } else if (word[0] == 0x01) {
      return "Open";
    } else {
      return "Unknown";
    }
  }

  toIgnitionTiming(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] / 4;
  }

  toSpeedUnfilteredMph(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word) * 0.03125;
  }

  toSpeedUnfilteredKmh(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toSpeedUnfilteredMph(word) * 1.60934;
  }

  toSpeedMph(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] / 2;
  }

  toSpeedKmh(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toSpeedMph(word) * 1.60934;
  }

  toVaporValveMode(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word) == 3200 ? "Open" : "Closed";
  }

  toNotParkOrNeutral(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] & 0x40;
  }

  toFuelPumpOn(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] & 0x80;
  }

  toPressure(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] / 8;
  }

  
  toPressureMBar(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toPressure(word) * 33.8639;
  }

  toSpeedUnfiltered(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] / 32;
  }

  toRatch(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return this.toDec(word) / 4;
  }

  toBitmap0(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }

    let values = [];

    if (word[1] & 0x04) {
      values.push("Canister Purge has non zero duty cycle");
    }
    if (word[1] & 0x08) {
      values.push("A/C clutch is disengaged");
    }
    if (word[0] & 0x04) {
      values.push("Not in neutral or park");
    }
    if (word[0] & 0x08) {
      values.push("Fuel pump on");
    }

    return values.join("; ") + " (" + this.toHexString(word) + ")";
  }

  toBitmap1(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }

    let values = [];

    if (word[1] & 0x01) {
      values.push("Alternate shift mode/overdrive cancel is selected");
    }
    if (word[0] & 0x01) {
      values.push("In closed loop fuel control");
    }
    if (word[0] & 0x02) {
      values.push("Power Steering pressure switch is closed");
    }
    if (word[0] & 0x08) {
      values.push("Driver has selected A/C");
    }
    if (word[0] & 0x10) {
      values.push("Ignition Diagnostic Monitor EEC module input is high");
    }
    if (word[0] & 0x20) {
      values.push("Output AM1 (Air Management 1 solenoid) is on");
    }
    if (word[0] & 0x80) {
      values.push("Output AM2 is on");
    }

    return values.join("; ") + " (" + this.toHexString(word) + ")";
  }

  getAllFaultCodes(data) {
    let faultCodes = [];
    console.log(data);
    for (let i = 0; i < 12; i++) {
      let faultCode = this.toFaultCode(data.slice(i*2, i*2+2));
      if (faultCode != "00") {
        faultCodes.push(faultCode);
      }
    }
    return faultCodes;
  }

  getAllLiveData(data) {
    let liveData = new Object();

    for (let i = 0; i < 4; i += 1) {
      const dataValue = data.slice(i*3, i*3 + 3);
      const type = dataValue[0];
      const word = dataValue.slice(1, 3);

      switch(type) {
        case 0x01:
          liveData.rpm = this.toRpm(word);
          break
        case 0x02:
          liveData.manifoldAbsolutePressure = this.toPressure(word);
          break
        case 0x03:
          liveData.barometricPressure = this.toPressure(word);
          break
        case 0x04:
          liveData.totalSparkAdvance = this.toIgnitionTiming(word);
          break

        case 0x05:
          liveData.act = this.toDec(word);
          break
        case 0x06:
          liveData.ect = this.toDec(word);
          break
        case 0x07:
          liveData.egr = this.toDec(word);
          break
        case 0x08:
          liveData.ego1 = this.toDec(word);
          break

        case 0x09:
          liveData.throttlePosition = this.toThrottlePositionAD(word);
          break
        case 0x0A:
          liveData.notUsed0A = this.toHexString(word);
          break
        case 0x0B:
          liveData.calibrationInputVoltage = this.toDec(word);
          break
        case 0x0C:
          liveData.fuelPulsewidth = this.toInjectionPulseClk(word);
          break

        case 0x0D:
          liveData.lambda1 = this.toDec(word) / 2048;
          break
        case 0x0E:
          liveData.throttleMode = this.toThrottleMode(word);
          break
        case 0x0F:
          liveData.actCelsius = this.toTemperatureC(word);
          break
        case 0x10:
          liveData.ectCelsius = this.toTemperatureC(word);
          break

        case 0x11:
          liveData.supplyVoltage = this.toSupplyVoltage(word);
          break
        case 0x12:
          liveData.scap = this.toDec(word) * 0.0625;
          break
        case 0x13:
          liveData.egrDutyCycle = this.toDec(word);
          break
        case 0x14:
          liveData.notUsed14 = this.toHexString(word);
          break

        case 0x15:
          liveData.idleSpeedDutyCycle = this.toDec(word);
          break
        case 0x16:
          liveData.notUsed16 = this.toHexString(word);
          break
        case 0x17:
          liveData.speed = this.toSpeedKmh(word);
          break
        case 0x18:
          liveData.speedUnfiltered = this.toSpeedUnfilteredKmh(word);
          break

        case 0x19:
          liveData.notUsed19 = this.toHexString(word);
          break
        case 0x1A:
          liveData.bitmap0 = this.toBitmap0(word);
          break
        case 0x1B:
          liveData.bitmap1 = this.toBitmap1(word);
          break
        case 0x1C:
          liveData.notUsed1C = this.toHexString(word);
          break

        case 0x1D:
          liveData.notUsed1D = this.toDec(word);
          liveData.notUsed1DHex = this.toHexString(word);
          break
        case 0x26:
          liveData.airFlowMeter = this.toDec(word);
          break
        case 0x27:
          liveData.airCharge = this.toDec(word) * 0.0488;
          break
        case 0x28:
          liveData.adaptiveFuelCorrection = this.toDec(word) * 0.0625;
          break

        case 0x29:
          liveData.notUsed29 = this.toByte(word);
          liveData.notUsed29Hex = this.toHexString(word);
          break
        case 0x2A:
          liveData.desiredRpm = this.toDesiredRpm(word);
          break
        case 0x2B:
          liveData.ratch = this.toRatch(word);
          break
        case 0x2C:
          liveData.lambda2 = this.toDec(word) / 2048;
          liveData.lambda2Hex = this.toHexString(word);
          break  
          
        case 0x2D:
          liveData.timeSinceStartup = this.toDec(word);
          break
        case 0x2E:
          liveData.occ = this.toDec(word);
          break
        case 0x2F:
          liveData.neutralDriveInput = this.toDec(word);
          break
        case 0x30:
          liveData.converterClutch = this.toDec(word) * 0.0488;
          break

        case 0x31:
          liveData.notUsed31 = this.toHexString(word);
          break
        case 0x32:
          liveData.commandGear = this.toByte(word);
          break
        case 0x33:
          liveData.notUsed33 = this.toHexString(word);
          break
        case 0x34:
          liveData.notUsed34 = this.toDec(word);
          liveData.notUsed34Hex = this.toHexString(word);
          break

        case 0x35:
          liveData.etvMonitorVoltage = this.toDec(word) / 4;
          break
        case 0x36:
          liveData.epcPressure = this.toByte(word) / 2;
          break
        case 0x37:
          liveData.transmissionOilTemperature = this.toDec(word);
          break
        case 0x38:
          liveData.prndlPosition = this.toByte(word);
          break
      }
    }

    return liveData;
  }
}
