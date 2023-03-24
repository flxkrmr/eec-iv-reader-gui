
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

  toRpm(word) {
    return this.toDec(word)*4
  }

  toLambda(word) {
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
    return this.toDec(word) * 32;
  }

  toThrottlePositionRef(word) {
    //return ((256 * (word[1]&0xF) + word[0]) - (256 * (word[1]&0xF) + word[0]) * 5 / 200) * 5;
    return this.toDec(word) * 4.875;
  }

  toThrottlePositionAD(word) {
    // TODO as percentage
    return this.toDec(word);
  }

  toThrottleModeRef(word) {
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

  toIgnitionTimingRef(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] / 4;
  }

  toSpeedDec(word) {
    return this.toDec(word);
  }

  toSpeedMph(word) {
    if (!this.validWord(word) || !this.validChecksum(word)) {
      return null;
    }
    return word[0] / 2;
  }

  toSpeedKmh(word) {
    return this.toSpeedMph(word) * 1.60934;
  }

  toVaporValveMode(word) {
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
    liveData.rpm = this.toRpm(data.slice(0, 2));
    liveData.lambda = this.toLambda(data.slice(2, 4));
    liveData.supplyVoltage = this.toSupplyVoltage(data.slice(4, 6));
    liveData.throttlePosition = this.toThrottlePositionRef(data.slice(6, 8));
    liveData.throttlePositionAD = this.toThrottlePositionAD(data.slice(6, 8));
    liveData.shortFuelCorrection = this.toShortFuelCorrectionRef(data.slice(8, 10));
    liveData.shortFuelCorrectionHex = this.toHexString(data.slice(8, 10));
    liveData.throttleMode = this.toThrottleModeRef(data.slice(10, 12));
    liveData.throttleModeHex = this.toHexString(data.slice(10, 12));
    liveData.coolantTempRef = this.toTemperatureRef(data.slice(12, 14));
    liveData.coolantTemp = this.toTemperatureC(data.slice(12, 14));
    liveData.airTempRef = this.toTemperatureRef(data.slice(14, 16));
    liveData.airTemp = this.toTemperatureC(data.slice(14, 16));
    liveData.idleValve = this.toDec(data.slice(16, 18));
    liveData.idleValveHex = this.toHexString(data.slice(16, 18));
    liveData.airFlowMeter = this.toAirFlowMeter(data.slice(18, 20));
    liveData.airFlowMeterRef = this.toAirFlowMeterRef(data.slice(18, 20));
    liveData.egr = this.toDec(data.slice(20, 22));
    liveData.egrHex = this.toHexString(data.slice(20, 22));
    liveData.injectionPulseRef = this.toInjectionPulseRef(data.slice(22, 24));
    liveData.injectionPulseClk = this.toInjectionPulseClk(data.slice(22, 24));
    liveData.ignitionTiming = this.toIgnitionTimingRef(data.slice(24, 26));
    liveData.speedDec = this.toSpeedDec(data.slice(26, 28));
    liveData.speedMph = this.toSpeedMph(data.slice(26, 28));
    liveData.speedKmh = this.toSpeedKmh(data.slice(26, 28));
    liveData.fuelVaporModeDec = this.toDec(data.slice(28, 30));
    liveData.fuelVaporModeHex = this.toHexString(data.slice(28, 30));
    liveData.fuelPumpModeDec = this.toDec(data.slice(30, 32));
    liveData.fuelPumpModeHex = this.toHexString(data.slice(30, 32));

    return liveData;
  }
}